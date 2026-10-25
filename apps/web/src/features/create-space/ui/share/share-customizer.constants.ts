import type {
  QrStyleOption,
  FontOption,
  ColorSwatch,
  HarmonyPalette,
} from '@/features/create-space/ui/share/share-customizer.types'

export const QR_STYLE_PRESETS: QrStyleOption[] = [
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Contemporary rounded dots with floating shadow',
    icon: 'Sparkles',
    tags: ['minimal', 'clean', 'modern', 'simple'],
  },
  {
    id: 'vintage',
    name: 'Vintage Stamp',
    description: 'Postal engraved border with antique corner marks',
    icon: 'Mail',
    tags: ['vintage', 'stamp', 'postal', 'retro', 'engraved'],
  },
  {
    id: 'celestial',
    name: 'Celestial Glow',
    description: 'Star-studded corners with subtle cosmic aura',
    icon: 'Star',
    tags: ['celestial', 'stars', 'night', 'cosmic', 'glow'],
  },
  {
    id: 'stamp',
    name: 'Wax Seal Postal',
    description: 'Dotted scalloped edge with commemorative seal',
    icon: 'Award',
    tags: ['stamp', 'seal', 'wax', 'commemorative'],
  },
  {
    id: 'pill',
    name: 'Editorial Squircle',
    description: 'Soft organic pill container with refined padding',
    icon: 'Square',
    tags: ['pill', 'squircle', 'editorial', 'soft'],
  },
]

export const SHARE_FONT_OPTIONS: FontOption[] = [
  {
    id: 'editorial',
    name: 'Lora Editorial',
    familyClass: 'font-serif',
    description: 'Warm literary serif with poetic rhythm',
    sample: 'A quiet, private sanctuary',
    tags: ['editorial', 'lora', 'serif', 'classic', 'book'],
  },
  {
    id: 'modern',
    name: 'DM Sans Minimal',
    familyClass: 'font-sans',
    description: 'Clean, balanced contemporary typography',
    sample: 'Designed with mindful clarity',
    tags: ['modern', 'sans', 'clean', 'contemporary', 'dm'],
  },
  {
    id: 'script',
    name: 'Romantic Italic',
    familyClass: 'font-serif italic',
    description: 'Intimate handwritten calligraphic cadence',
    sample: 'Meant solely for you',
    tags: ['script', 'romantic', 'cursive', 'handwritten', 'italic'],
  },
  {
    id: 'mono',
    name: 'Typewriter Keepsake',
    familyClass: 'font-mono',
    description: 'Vintage typewriter with mechanical nostalgia',
    sample: 'Folded with quiet love',
    tags: ['mono', 'typewriter', 'vintage', 'letterpress'],
  },
]

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Terracotta',
    hex: '#CF7056',
    tags: ['terracotta', 'red', 'warm', 'earth'],
  },
  {
    name: 'Deep Espresso',
    hex: '#221915',
    tags: ['espresso', 'dark', 'black', 'coffee'],
  },
  {
    name: 'Warm Ivory',
    hex: '#FAF7F2',
    tags: ['ivory', 'white', 'light', 'cream'],
  },
  {
    name: 'Forest Emerald',
    hex: '#266B57',
    tags: ['emerald', 'green', 'forest', 'nature'],
  },
  {
    name: 'Sunset Amber',
    hex: '#D9943B',
    tags: ['amber', 'gold', 'yellow', 'warm'],
  },
  {
    name: 'Rose Clay',
    hex: '#C26775',
    tags: ['rose', 'pink', 'clay', 'romantic'],
  },
  {
    name: 'Royal Indigo',
    hex: '#2B4C7E',
    tags: ['indigo', 'blue', 'royal', 'night'],
  },
  {
    name: 'Antique Parchment',
    hex: '#EFE7DC',
    tags: ['parchment', 'paper', 'tan', 'beige'],
  },
  {
    name: 'Plum Violet',
    hex: '#5D3855',
    tags: ['plum', 'violet', 'purple', 'wine'],
  },
  {
    name: 'Sage Mist',
    hex: '#7C9D86',
    tags: ['sage', 'green', 'mist', 'soft'],
  },
]

export const HARMONY_PALETTES: HarmonyPalette[] = [
  {
    name: 'Warm Terracotta',
    description:
      'A classic warm ivory surface with terracotta red and rich espresso',
    qrColor: '#CF7056',
    cardBg: '#FAF7F2',
    textColor: '#221915',
    tapeColor: 'rose',
    tags: ['warm', 'terracotta', 'classic', 'ivory', 'earth'],
  },
  {
    name: 'Antique Library',
    description: 'Aged parchment with forest emerald and deep botanical pine',
    qrColor: '#266B57',
    cardBg: '#F5EFEB',
    textColor: '#1A2822',
    tapeColor: 'sage',
    tags: ['antique', 'emerald', 'library', 'green', 'vintage'],
  },
  {
    name: 'Midnight Gold',
    description:
      'Velvet obsidian noir with shimmering gold starlight and cream text',
    qrColor: '#E6AF46',
    cardBg: '#14100E',
    textColor: '#FAF6F0',
    tapeColor: 'gold',
    tags: ['dark', 'gold', 'midnight', 'luxury', 'black'],
  },
  {
    name: 'Rose Dust',
    description: 'Tender blush card surface with muted rose gold and plum wine',
    qrColor: '#C26775',
    cardBg: '#FAF1EF',
    textColor: '#3C1F26',
    tapeColor: 'rose',
    tags: ['rose', 'pink', 'romance', 'blush', 'tender'],
  },
  {
    name: 'Sage Sanctuary',
    description:
      'Serene botanical mist with deep olive greenery and earth charcoal',
    qrColor: '#4A6B56',
    cardBg: '#F0F4F1',
    textColor: '#1E2D24',
    tapeColor: 'sage',
    tags: ['sage', 'green', 'sanctuary', 'peace', 'nature'],
  },
  {
    name: 'Royal Indigo',
    description: 'Moonlit pearl paper with royal deep indigo and midnight navy',
    qrColor: '#2B4C7E',
    cardBg: '#F2F5F9',
    textColor: '#162238',
    tapeColor: 'sage',
    tags: ['indigo', 'blue', 'royal', 'night', 'moonlight'],
  },
  {
    name: 'Sunset Ochre',
    description: 'Golden hour cream with warm amber ochre and roasted chestnut',
    qrColor: '#D98A2B',
    cardBg: '#FFFBF2',
    textColor: '#382012',
    tapeColor: 'gold',
    tags: ['sunset', 'ochre', 'amber', 'gold', 'warm'],
  },
  {
    name: 'Lavender Mist',
    description: 'Delicate pale lilac with rich royal amethyst and dark violet',
    qrColor: '#734B80',
    cardBg: '#F6F1F8',
    textColor: '#2D1933',
    tapeColor: 'rose',
    tags: ['lavender', 'violet', 'purple', 'lilac', 'poetic'],
  },
  {
    name: 'Espresso Minimal',
    description:
      'Modern gallery white with dark espresso roast and charcoal clarity',
    qrColor: '#281F1B',
    cardBg: '#FFFFFF',
    textColor: '#181210',
    tapeColor: 'gold',
    tags: ['espresso', 'minimal', 'white', 'clean', 'modern'],
  },
  {
    name: 'Celestial Velvet',
    description: 'Deep cosmic abyss with pale champagne stars and ivory glow',
    qrColor: '#DFC38A',
    cardBg: '#0F1420',
    textColor: '#F5F7FB',
    tapeColor: 'gold',
    tags: ['celestial', 'velvet', 'cosmic', 'stars', 'night'],
  },
]
