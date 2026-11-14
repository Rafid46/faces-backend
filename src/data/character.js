import { hairOptions } from './variations/hair.js';
import { faceOptions, eyeOptions, mouthOptions } from './variations/expressions.js';
import { outfitOptions, accessoryOptions } from './variations/wardrobe.js';
import { backgroundOptions, backgroundDesigns } from './variations/backgrounds.js';

export const features = [
  { id: 'face', label: 'Face', title: 'FACES', description: '' },
  { id: 'hair', label: 'Hair', title: 'HAIR', description: '' },
  { id: 'eyes', label: 'Eyes', title: 'EYES', description: '' },
  { id: 'mouth', label: 'Mouth', title: 'MOUTH', description: '' },
  { id: 'outfit', label: 'Outfit', title: 'OUTFIT', description: '' },
  { id: 'accessory', label: 'Extras', title: 'EXTRAS', description: '' },
  { id: 'background', label: 'Backdrop', title: 'BACKDROP', description: '' },
];

export const options = {
  face: faceOptions,
  hair: hairOptions,
  eyes: eyeOptions,
  mouth: mouthOptions,
  outfit: outfitOptions,
  accessory: accessoryOptions,
  background: backgroundOptions,
};

export const palettes = {
  skinColor: ['#F5A573', '#EEB5A6', '#D98A55', '#BA734E', '#88533F', '#F4C9AA', '#EF9CBD', '#BFA5DE'],
  hairColor: ['#25201F', '#694232', '#AD633F', '#DDA24C', '#EBC573', '#B5B0CE', '#DA8DAD', '#5A8372'],
  outfitColor: ['#F5EDDA', '#9874C6', '#2B775A', '#E9AC47', '#323331', '#D9756D', '#89ADCA', '#EFA7BC'],
};

export const backgrounds = Object.fromEntries(backgroundDesigns.map((d) => [d.id, d.color]));

export const defaultCharacter = {
  face: 'oval',
  hair: 'curls',
  eyes: 'chill',
  mouth: 'smirk',
  outfit: 'daisy',
  accessory: 'hoops',
  background: 'peach',
  skinColor: '#F5A573',
  hairColor: '#25201F',
  outfitColor: '#F5EDDA',
  flipped: false,
};

export function encodeCharacter(character) {
  return encodeURIComponent(JSON.stringify(character));
}

export const presets = [
  { name: 'The daydreamer', subtitle: 'Head in the clouds', character: defaultCharacter },
  { name: 'Sunshine club', subtitle: 'A little golden energy', character: { ...defaultCharacter, hair: 'bun', outfitColor: '#E9AC47', outfit: 'stripes', accessory: 'sunglasses', background: 'sunshine' } },
  { name: 'Off-duty', subtitle: 'Good tunes. Zero plans.', character: { ...defaultCharacter, hair: 'wavy', eyes: 'wink', outfit: 'hoodie', outfitColor: '#9874C6', accessory: 'headphones', background: 'lavender' } },
  { name: 'The cool kid', subtitle: 'Effortlessly unbothered', character: { ...defaultCharacter, hair: 'short', outfit: 'hoodie', outfitColor: '#323331', accessory: 'none', background: 'mint', mouth: 'neutral' } },
  { name: 'Flower child', subtitle: 'Growing at their own pace', character: { ...defaultCharacter, hair: 'braids', skinColor: '#EEB5A6', outfit: 'daisy', accessory: 'hoops', background: 'rose' } },
  { name: 'Happy camper', subtitle: 'Taking the scenic route', character: { ...defaultCharacter, hair: 'curls', outfitColor: '#323331', accessory: 'cap', background: 'sky' } },
  { name: 'Art school', subtitle: 'Paint on every sweater', character: { ...defaultCharacter, face: 'freckles', hair: 'mullet', eyes: 'chill', mouth: 'smirk', outfit: 'jacket', outfitColor: '#D9756D', hairColor: '#EBC573', accessory: 'beret', background: 'paper' } },
  { name: 'Night owl', subtitle: 'Wide awake at 2 AM', character: { ...defaultCharacter, face: 'angular', hair: 'shag', eyes: 'tired', mouth: 'neutral', outfit: 'turtleneck', outfitColor: '#323331', skinColor: '#D98A55', hairColor: '#25201F', accessory: 'beanie', background: 'after-hours' } },
  { name: 'Sweet tooth', subtitle: 'Always room for dessert', character: { ...defaultCharacter, face: 'round', hair: 'bob', eyes: 'heart', mouth: 'tongue', outfit: 'cherries', outfitColor: '#EFA7BC', skinColor: '#F4C9AA', hairColor: '#AD633F', accessory: 'daisy-earrings', background: 'bubblegum' } },
  { name: 'Stargazer', subtitle: 'Lost in the constellations', character: { ...defaultCharacter, face: 'oval', hair: 'afro', eyes: 'star', mouth: 'smile', outfit: 'stars', outfitColor: '#2B775A', skinColor: '#88533F', hairColor: '#25201F', accessory: 'star-glasses', background: 'starry' } },
  { name: 'Bookish', subtitle: 'Just one more chapter', character: { ...defaultCharacter, face: 'soft-square', hair: 'pixie', eyes: 'chill', mouth: 'smile', outfit: 'cardigan', outfitColor: '#89ADCA', skinColor: '#EEB5A6', hairColor: '#694232', accessory: 'round-glasses', background: 'mint' } },
  { name: 'Retro pop', subtitle: 'Roller rink royalty', character: { ...defaultCharacter, face: 'heart', hair: 'high-pony', eyes: 'flutter', mouth: 'kiss', outfit: 'stripes', outfitColor: '#E9AC47', hairColor: '#DDA24C', skinColor: '#F5A573', accessory: 'cat-eye', background: 'citrus-pop' } },
  { name: 'Cloud nine', subtitle: 'Floating through the week', character: { ...defaultCharacter, face: 'oval', hair: 'wavy', eyes: 'dreamy', mouth: 'smile', outfit: 'clouds', outfitColor: '#F5EDDA', skinColor: '#EEB5A6', hairColor: '#B5B0CE', accessory: 'hair-bow', background: 'cloud-nine' } },
  { name: 'Electric soul', subtitle: 'High voltage personality', character: { ...defaultCharacter, face: 'diamond', hair: 'spiky', eyes: 'sparkle', mouth: 'grin', outfit: 'varsity', outfitColor: '#9874C6', skinColor: '#BA734E', hairColor: '#DA8DAD', accessory: 'lightning-earrings', background: 'berry-fizz' } },
  { name: 'Picnic best', subtitle: 'Sunny days & strawberries', character: { ...defaultCharacter, face: 'rosy', hair: 'twin-ponies', eyes: 'happy', mouth: 'laugh', outfit: 'bow-blouse', outfitColor: '#D9756D', skinColor: '#F4C9AA', hairColor: '#EBC573', accessory: 'cherry-earrings', background: 'gingham' } },
  { name: 'Sail away', subtitle: 'Chasing every ocean breeze', character: { ...defaultCharacter, face: 'round', hair: 'short', eyes: 'wide', mouth: 'oh', outfit: 'sailor', outfitColor: '#89ADCA', skinColor: '#F5A573', hairColor: '#25201F', accessory: 'goggles', background: 'ocean-glow' } },
  { name: 'Forest walk', subtitle: 'Quiet paths & green moss', character: { ...defaultCharacter, face: 'pointed', hair: 'locs', eyes: 'peaceful', mouth: 'smile', outfit: 'mushrooms', outfitColor: '#2B775A', skinColor: '#88533F', hairColor: '#25201F', accessory: 'leaf-crown', background: 'midnight-garden' } },
  { name: 'Golden hour', subtitle: 'Catching the last light', character: { ...defaultCharacter, face: 'sun-kissed', hair: 'mermaid', eyes: 'bashful', mouth: 'smirk', outfit: 'sunburst', outfitColor: '#E9AC47', skinColor: '#D98A55', hairColor: '#DDA24C', accessory: 'flower-crown', background: 'sunset' } },
];
