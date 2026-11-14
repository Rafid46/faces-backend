import { options } from '../data/character.js';

const MALE_EXCLUDED_FACE_GROUPS = new Set(['Glow & glam']);
const MALE_EXCLUDED_FACE_IDS = new Set([
  'heart-cheeks', 'daisy-cheeks', 'butterfly', 'bindi', 'heart-paint',
]);

const MALE_ALLOWED_HAIR_GROUPS = new Set(['Short & sculpted', 'Barbershop']);
const MALE_ALLOWED_HAIR_IDS = new Set([
  'curls', 'afro', 'curly-top', 'twa', 'finger-coils', 'sponge-twists', 'cloud-puff',
  'braids', 'locs', 'cornrows', 'twists', 'cuffed-locs', 'flat-twists', 'loc-top',
  'pompadour', 'quiff', 'slicked-back', 'comb-over', 'mop-top', 'curtains', 'emo-fringe',
  'edgar', 'mullet', 'wolf-cut', 'shag', 'top-knot',
]);

const MALE_EXCLUDED_EYE_GROUPS = new Set(['Makeup']);
const MALE_EXCLUDED_EYE_IDS = new Set(['flutter', 'doll', 'mascara-run']);

const MALE_EXCLUDED_MOUTH_IDS = new Set(['kiss', 'heart-lips', 'berry-gloss']);

const MALE_EXCLUDED_OUTFIT_IDS = new Set([
  'bow-blouse', 'cherries', 'pinafore', 'off-shoulder', 'folk-blouse', 'ruffles', 'mermaid-scales',
]);

const MALE_EXCLUDED_ACCESSORY_GROUPS = new Set(['Hair treasures']);
const MALE_EXCLUDED_ACCESSORY_IDS = new Set([
  'cat-eye', 'heart-glasses', 'tiara', 'hoops', 'daisy-earrings', 'cherry-earrings',
  'star-earrings', 'pearls', 'tassel-earrings', 'moon-earrings', 'choker', 'heart-locket', 'sun-hat',
]);

const FEMALE_EXCLUDED_FACE_GROUPS = new Set(['Beards & whiskers', 'Strong & stubbled']);
const FEMALE_EXCLUDED_HAIR_GROUPS = new Set(['Barbershop']);
const FEMALE_EXCLUDED_HAIR_IDS = new Set(['comb-over', 'horseshoe', 'rat-tail', 'flattop']);
const FEMALE_EXCLUDED_MOUTH_IDS = new Set(['moustache']);
const FEMALE_EXCLUDED_OUTFIT_IDS = new Set(['suit-tie', 'suspenders']);
const FEMALE_EXCLUDED_ACCESSORY_IDS = new Set(['groucho', 'bolo-tie']);

const NEUTRAL_EXCLUDED_FACE_GROUPS = new Set([
  'Beards & whiskers', 'Strong & stubbled', 'Glow & glam', 'Face paint',
]);
const NEUTRAL_HAIR_IDS = new Set([
  'curls', 'wavy', 'short', 'bob', 'spiky', 'afro', 'locs', 'mullet', 'shag',
  'curtains', 'wolf-cut', 'middle-part', 'windswept', 'cloud-puff', 'curly-bangs',
  'side-part', 'twists', 'french-crop', 'textured-crop', 'surfer',
]);
const NEUTRAL_EYE_GROUPS = new Set(['Everyday', 'Expressions']);
const NEUTRAL_EXCLUDED_EYE_IDS = new Set(['flutter', 'mascara-run']);
const NEUTRAL_MOUTH_IDS = new Set([
  'smirk', 'smile', 'grin', 'oh', 'neutral', 'tongue', 'laugh', 'pout',
  'frown', 'worried', 'zigzag', 'teeth', 'crooked', 'beaming', 'surprised', 'scrunch',
]);
const NEUTRAL_OUTFIT_IDS = new Set([
  'hoodie', 'stripes', 'tee', 'jacket', 'collar', 'cardigan', 'overalls', 'varsity',
  'raincoat', 'turtleneck', 'rugby', 'checkerboard', 'stars', 'clouds', 'mushrooms',
  'rainbow', 'flannel', 'denim-jacket', 'puffer', 'bomber', 'rock-tee', 'jersey',
  'smiley-tee', 'peace-tee',
]);
const NEUTRAL_ACCESSORY_IDS = new Set([
  'none', 'glasses', 'sunglasses', 'cap', 'headphones', 'round-glasses', 'beret',
  'beanie', 'bucket-hat', 'bandana', 'scarf', 'wired-earbuds', 'camera', 'lanyard',
]);

function filterByRule(list, predicate) {
  const filtered = list.filter(predicate);
  return filtered.length > 0 ? filtered : list;
}

const malePool = {
  face: filterByRule(options.face, (o) => !MALE_EXCLUDED_FACE_GROUPS.has(o.group) && !MALE_EXCLUDED_FACE_IDS.has(o.id)),
  hair: filterByRule(options.hair, (o) => MALE_ALLOWED_HAIR_GROUPS.has(o.group) || MALE_ALLOWED_HAIR_IDS.has(o.id)),
  eyes: filterByRule(options.eyes, (o) => !MALE_EXCLUDED_EYE_GROUPS.has(o.group) && !MALE_EXCLUDED_EYE_IDS.has(o.id)),
  mouth: filterByRule(options.mouth, (o) => !MALE_EXCLUDED_MOUTH_IDS.has(o.id)),
  outfit: filterByRule(options.outfit, (o) => !MALE_EXCLUDED_OUTFIT_IDS.has(o.id)),
  accessory: filterByRule(options.accessory, (o) => !MALE_EXCLUDED_ACCESSORY_GROUPS.has(o.group) && !MALE_EXCLUDED_ACCESSORY_IDS.has(o.id)),
  background: options.background,
};

const femalePool = {
  face: filterByRule(options.face, (o) => !FEMALE_EXCLUDED_FACE_GROUPS.has(o.group)),
  hair: filterByRule(options.hair, (o) => !FEMALE_EXCLUDED_HAIR_GROUPS.has(o.group) && !FEMALE_EXCLUDED_HAIR_IDS.has(o.id)),
  eyes: options.eyes,
  mouth: filterByRule(options.mouth, (o) => !FEMALE_EXCLUDED_MOUTH_IDS.has(o.id)),
  outfit: filterByRule(options.outfit, (o) => !FEMALE_EXCLUDED_OUTFIT_IDS.has(o.id)),
  accessory: filterByRule(options.accessory, (o) => !FEMALE_EXCLUDED_ACCESSORY_IDS.has(o.id)),
  background: options.background,
};

const neutralPool = {
  face: filterByRule(options.face, (o) => !NEUTRAL_EXCLUDED_FACE_GROUPS.has(o.group)),
  hair: filterByRule(options.hair, (o) => NEUTRAL_HAIR_IDS.has(o.id)),
  eyes: filterByRule(options.eyes, (o) => NEUTRAL_EYE_GROUPS.has(o.group) && !NEUTRAL_EXCLUDED_EYE_IDS.has(o.id)),
  mouth: filterByRule(options.mouth, (o) => NEUTRAL_MOUTH_IDS.has(o.id)),
  outfit: filterByRule(options.outfit, (o) => NEUTRAL_OUTFIT_IDS.has(o.id)),
  accessory: filterByRule(options.accessory, (o) => NEUTRAL_ACCESSORY_IDS.has(o.id)),
  background: options.background,
};

export const genderPools = {
  male: malePool,
  female: femalePool,
  neutral: neutralPool,
};

export function resolveGender(rawGender) {
  if (typeof rawGender !== 'string') return 'neutral';
  const normalized = rawGender.trim().toLowerCase();
  if (normalized === 'male' || normalized === 'female') return normalized;
  return 'neutral';
}
