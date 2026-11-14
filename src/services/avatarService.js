import {
  backgrounds,
  defaultCharacter,
  encodeCharacter,
  features,
  options,
  palettes,
  presets,
} from "../data/character.js";
import { ADJECTIVES, NOUNS, SUBTITLES, buildTags } from "../data/gallery.js";
import { genderPools, resolveGender } from "../config/genderPools.js";
import { validateCharacterPayload } from "../schemas/avatarSchema.js";
import { renderImage } from "../render/renderAvatar.js";

function createSeededRandom(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let state = h >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickRandom(items, randomFn) {
  return items[
    Math.min(items.length - 1, Math.floor(randomFn() * items.length))
  ];
}

export function getCatalog() {
  return {
    features,
    options,
    palettes,
    backgrounds,
    presets,
    defaultCharacter,
  };
}

export function createRandomAvatar({ gender, locked = [], seed, base } = {}) {
  const resolvedGender = resolveGender(gender);
  const pool = genderPools[resolvedGender];
  const randomFn = seed ? createSeededRandom(seed) : Math.random;
  const baseValidation = base ? validateCharacterPayload(base) : null;
  const next = baseValidation?.success
    ? { ...baseValidation.data }
    : { ...defaultCharacter };

  for (const key of Object.keys(pool)) {
    if (!locked.includes(key)) {
      next[key] = pickRandom(pool[key], randomFn).id;
    }
  }

  for (const [key, values] of Object.entries(palettes)) {
    if (!locked.includes(key)) {
      next[key] = pickRandom(values, randomFn);
    }
  }

  if (!locked.includes("flipped")) {
    next.flipped = randomFn() < 0.25;
  }

  return {
    resolvedGender,
    character: next,
    encoded: encodeCharacter(next),
  };
}

export function validateCharacter(payload) {
  return validateCharacterPayload(payload);
}

export function decodeCharacter(encodedValue) {
  try {
    const parsed = JSON.parse(decodeURIComponent(encodedValue));
    return validateCharacterPayload(parsed);
  } catch {
    return {
      success: false,
      errors: [
        { field: "encoded", message: "Invalid encoded character string" },
      ],
    };
  }
}

export function getGallery({
  page = 1,
  limit = 20,
  gender,
  tag,
  seed = "sugary-gallery",
} = {}) {
  const startIndex = (page - 1) * limit;
  const items = [];

  for (let i = 0; i < limit; i += 1) {
    const index = startIndex + i;
    const itemSeed = `${seed}:${index}`;
    const randomFn = createSeededRandom(itemSeed);
    const { resolvedGender, character, encoded } = createRandomAvatar({
      gender,
      seed: itemSeed,
    });

    const adj = pickRandom(ADJECTIVES, randomFn);
    const noun = pickRandom(NOUNS, randomFn);
    const subtitle = pickRandom(SUBTITLES, randomFn);
    const tags = buildTags(character);

    if (tag && !tags.some((t) => t.toLowerCase().includes(tag))) {
      continue;
    }

    items.push({
      id: `avatar-${index + 1}`,
      index: index + 1,
      gender: resolvedGender,
      name: `${adj} ${noun} #${String(index + 1).padStart(3, "0")}`,
      subtitle,
      tags,
      character,
      encoded,
    });
  }

  return {
    page,
    limit,
    count: items.length,
    items,
  };
}

export async function renderFace({
  format,
  size,
  transparent,
  data,
  seed,
  gender,
  character,
  overrides = {},
} = {}) {
  let target;

  if (data) {
    const decoded = decodeCharacter(data);
    if (!decoded.success) {
      return {
        success: false,
        error: {
          code: "INVALID_ENCODED_CHARACTER",
          message: "Could not decode character payload",
          details: decoded.errors,
        },
      };
    }
    target = decoded.data;
  } else if (character !== undefined) {
    const validated = validateCharacterPayload(character);
    if (!validated.success) {
      return {
        success: false,
        error: {
          code: "INVALID_CHARACTER",
          message: "Character validation failed",
          details: validated.errors,
        },
      };
    }
    target = validated.data;
  } else {
    const hasOverrides = Object.keys(overrides).length > 0;
    const base =
      seed || gender || !hasOverrides
        ? createRandomAvatar({ gender, seed }).character
        : { ...defaultCharacter };

    if (hasOverrides) {
      const merged = validateCharacterPayload({ ...base, ...overrides });
      if (!merged.success) {
        return {
          success: false,
          error: {
            code: "INVALID_CHARACTER",
            message: "Character validation failed",
            details: merged.errors,
          },
        };
      }
      target = merged.data;
    } else {
      target = base;
    }
  }

  const image = await renderImage(target, { format, size, transparent });
  return { success: true, data: image };
}
