import { z } from 'zod';
import { defaultCharacter, options, palettes } from '../data/character.js';
import { resolveGender } from '../config/genderPools.js';

const enumFromEntries = (entries, mapValues) =>
  Object.fromEntries(Object.entries(entries).map(([key, val]) => [key, z.enum(mapValues(val))]));

export const characterSchema = z.object({
  ...enumFromEntries(options, (list) => list.map((item) => item.id)),
  ...enumFromEntries(palettes, (values) => values),
  flipped: z.boolean(),
});

const lockKeySchema = z.enum([
  ...Object.keys(options),
  ...Object.keys(palettes),
  'flipped',
]);

export const randomQuerySchema = z.object({
  gender: z.unknown().optional().transform(resolveGender),
  locked: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .catch(undefined)
    .transform((val) => {
      const raw = Array.isArray(val) ? val : val ? [val] : [];
      return raw
        .flatMap((v) => v.split(','))
        .map((v) => v.trim())
        .filter((v) => lockKeySchema.safeParse(v).success);
    }),
  seed: z
    .string()
    .trim()
    .transform((v) => v || undefined)
    .optional()
    .catch(undefined),
});

export const galleryQuerySchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  limit: z.coerce.number().int().positive().transform((n) => Math.min(n, 100)).catch(20),
  gender: z.unknown().optional().transform((v) => (v !== undefined ? resolveGender(v) : undefined)),
  tag: z
    .string()
    .trim()
    .toLowerCase()
    .transform((v) => v || undefined)
    .optional()
    .catch(undefined),
  seed: z
    .string()
    .trim()
    .transform((v) => v || 'sugary-gallery')
    .catch('sugary-gallery'),
});

export function validateCharacterPayload(payload) {
  const result = characterSchema.safeParse(payload);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.message,
      })),
    };
  }
  return { success: true, data: result.data };
}

export function parseRandomQuery(query = {}) {
  return randomQuerySchema.parse(query);
}

export function parseGalleryQuery(query = {}) {
  return galleryQuerySchema.parse(query);
}

const boolFlag = z
  .union([z.boolean(), z.enum(['true', 'false', '1', '0'])])
  .transform((v) => v === true || v === 'true' || v === '1')
  .catch(false);

const formatSchema = z.enum(['jpg', 'jpeg', 'png', 'svg']);

const traitOverrideKeys = Object.keys(defaultCharacter);

export const renderQuerySchema = z.object({
  format: formatSchema.default('jpg'),
  size: z.coerce
    .number()
    .int()
    .positive()
    .transform((n) => Math.min(2160, Math.max(64, n)))
    .optional()
    .catch(undefined),
  transparent: boolFlag,
  download: boolFlag,
  data: z.string().trim().min(1).optional().catch(undefined),
  seed: z.string().trim().min(1).optional().catch(undefined),
  gender: z.unknown().optional().transform((v) => (v !== undefined ? resolveGender(v) : undefined)),
});

export function parseRenderRequest(req) {
  const rawFormat = req.params?.ext ?? req.body?.format ?? req.query?.format;
  if (rawFormat !== undefined) {
    const formatCheck = formatSchema.safeParse(String(rawFormat).trim().toLowerCase());
    if (!formatCheck.success) {
      return {
        success: false,
        error: { code: 'INVALID_FORMAT', message: 'Format must be jpg, png, or svg' },
      };
    }
  }

  const parsed = renderQuerySchema.parse({
    format: rawFormat ? String(rawFormat).trim().toLowerCase() : undefined,
    size: req.body?.size ?? req.query?.size,
    transparent: req.body?.transparent ?? req.query?.transparent,
    download: req.body?.download ?? req.query?.download,
    data: req.body?.data ?? req.query?.data,
    seed: req.body?.seed ?? req.query?.seed,
    gender: req.body?.gender ?? req.query?.gender,
  });

  const size = parsed.size ?? 480;

  const overrides = {};
  for (const key of traitOverrideKeys) {
    if (req.query?.[key] !== undefined) {
      overrides[key] = key === 'flipped' ? req.query[key] === 'true' || req.query[key] === '1' : req.query[key];
    }
  }

  return {
    success: true,
    data: {
      ...parsed,
      size,
      character: req.body?.character,
      overrides,
    },
  };
}
