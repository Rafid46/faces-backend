import { options } from './character.js';

export const ADJECTIVES = [
  'Sunny', 'Velvet', 'Electric', 'Cosmic', 'Pastel', 'Golden', 'Midnight', 'Retro',
  'Cloud', 'Daisy', 'Wavy', 'Chill', 'Starry', 'Gentle', 'Salty', 'Berry',
  'Lavender', 'Poppy', 'Neon', 'Matcha', 'Honey', 'Doodle', 'Breezy', 'Ruby',
  'Crayon', 'Sweet', 'Whimsical', 'Sparkle', 'Dreamy', 'Peachy', 'Ocean', 'Clover',
  'Amber', 'Blossom', 'Citrus', 'Mellow', 'Bumble', 'Twinkle', 'Velveteen', 'Zigzag',
];

export const NOUNS = [
  'Daydreamer', 'Artist', 'Drifter', 'Soul', 'Maker', 'Nomad', 'Rebel', 'Poet',
  'Explorer', 'Spark', 'Sailor', 'Friend', 'Spirit', 'Rider', 'Thinker', 'Gazer',
  'Botanist', 'Baker', 'Melody', 'Comet', 'Rambler', 'Dancer', 'Seeker', 'Creator',
  'Wanderer', 'Weaver', 'Collector', 'Dreamer', 'Pioneer', 'Storyteller',
];

export const SUBTITLES = [
  'Always hums a song nobody else can hear.',
  'Spends Sunday sketching houseplants and sipping matcha.',
  'Leaves sticky notes with kind words on train windows.',
  'Wearing warm socks and dreaming of distant constellations.',
  'Takes long bike rides with a pocket full of cherries.',
  'Never says no to an impromptu midnight picnic.',
  'Spends too much time looking up at the afternoon clouds.',
  'Knows every stray cat on the block by name.',
  'Collects pressed wildflowers and vintage vinyl records.',
  'Bakes sour cherry pies with an extra dusting of cinnamon.',
  'Keeps a pocket-sized sketchbook tucked in their jacket.',
  'Laughs until their cheeks hurt at the silliest little jokes.',
  'Has three houseplants named after mythological deities.',
  'Listens to city rain while finishing a hand-drawn postcard.',
  'Still makes a wish on every eyelash and birthday candle.',
  'Stargazes through a secondhand brass telescope on clear nights.',
  'Believes in morning optimism, good tea, and secondhand books.',
  'Dancing to French pop while flipping sourdough pancakes.',
  'Always carries an extra pen and a tangerine to share.',
  'Thinks imperfect brushstrokes have the most character.',
  'Reads the last chapter of a book by candlelight first.',
  'Keeps a tiny tin of watercolor paints in every tote bag.',
  'Whispers encouraging words to slow-blooming orchids.',
  'Drinks black coffee while watching fog roll over the hills.',
  'Folds paper cranes out of train ticket stubs.',
  'Walks the long way home just to smell the night-blooming jasmine.',
  'Has a favorite wooden spoon reserved strictly for hot chocolate.',
  'Saves pretty postage stamps from faraway pen pals.',
  'Dances in the kitchen while waiting for the kettle to boil.',
  'Leaves birdseed on the windowsill every morning at dawn.',
  'Always pauses to pet the neighborhood bookstore cat.',
  'Collects sea glass smoothed by years in the ocean.',
  'Writes heartfelt letters on an old turquoise typewriter.',
  'Keeps dried lavender tucked between favorite sweater folds.',
  'Watches the sun rise from fire escapes wrapped in a wool blanket.',
  'Humming old bossa nova tunes while washing vintage teacups.',
  'Prefers handwriting grocery lists on scrap paper margins.',
  'Wears oversized knit cardigans that smell of roasted cedar.',
  'Finds joy in repairing torn book spines with linen tape.',
  'Always looks for constellations through airplane windows.',
  'Carries a jar of homemade jam as an everyday calling card.',
  'Walks through puddles just to hear the gentle splash.',
  'Has an entire drawer dedicated to fancy ribbon scraps.',
  'Plays quiet cello melodies to wind down after dark.',
  'Writes down odd dreams in a silver gel pen notebook.',
  'Leaves secret compliments inside library books for strangers.',
  'Enjoys peeling Clementines in one unbroken coil.',
  'Watches dust motes dance in shafts of afternoon sunlight.',
  'Sips chamomile with clover honey when the world gets loud.',
  'Fills small glass jars with pebbles from memorable journeys.',
];

export function buildTags(character) {
  const hairName = options.hair.find((h) => h.id === character.hair)?.name;
  const outfitName = options.outfit.find((o) => o.id === character.outfit)?.name;
  const eyesName = options.eyes.find((e) => e.id === character.eyes)?.name;
  return [hairName, outfitName, eyesName].filter(Boolean);
}
