import type { SpaceTemplate } from './types'

export const SPACE_TEMPLATES: SpaceTemplate[] = [
  {
    id: 'birthday',
    title: 'Birthday Milestone',
    subtitle: 'A warm, candlelit tribute to celebrate their life & milestones',
    category: 'Celebration',
    badge: 'Birthday & Year Milestone',
    description:
      'Created to honor someone special on their birthday. Features festive yet calm aesthetics, celebratory letters, year milestones, and custom audio greetings.',
    accentColor: '#D97706', // Warm amber / golden glow
    cardBgGlow: 'from-amber-500/10 via-amber-500/5 to-transparent',
    sampleRecipient: 'For Leo',
    sampleNote:
      'Another year of light, warmth, and unforgettable stories. This space is dedicated to celebrating you.',
    tags: [
      'Birthday Letter',
      'Milestone Year',
      'Celebratory Audio',
      'Wishes Wall',
    ],
    features: [
      'Interactive birthday candle & wishes reveal',
      'Chronological milestone cards of the year',
      'Personal letter with audio narration attachment',
      'Celebratory ambient soundscapes',
    ],
  },
  {
    id: 'anniversary',
    title: 'Romantic Journey',
    subtitle: 'An intimate space honoring your shared love story',
    category: 'Love & Romance',
    badge: 'Anniversary & Romance',
    description:
      'Crafted for partners and soulmates. Showcases cherished memories, polaroid photo stacks, intimate letters, and the songs that soundtracked your moments.',
    accentColor: '#A34835', // Deep terracotta / rose
    cardBgGlow: 'from-primary/15 via-rose-500/5 to-transparent',
    sampleRecipient: 'For Sophia',
    sampleNote:
      'From our first rainy evening in Paris to every quiet morning since. This corner of the world belongs only to us.',
    tags: [
      'Love Letters',
      'Milestone Journey',
      'Our Song',
      'Polaroid Memories',
    ],
    features: [
      'Interactive timeline of key relationship milestones',
      'Sealed digital envelopes that open on tap',
      'Embedded audio player for your special song',
      'Private photo album with tactile vintage borders',
    ],
  },
  {
    id: 'friendship',
    title: 'Lifelong Friendship',
    subtitle: 'A heartfelt tribute to an unbreakable bond and inside jokes',
    category: 'Gratitude & Bond',
    badge: 'Friendship & Gratitude',
    description:
      'Dedicated to best friends, lifelong confidants, and true companions. Designed with nostalgic postcard layouts, shared memories, laughter, and sincere thank-yous.',
    accentColor: '#0D9488', // Serene teal / sage
    cardBgGlow: 'from-teal-500/10 via-teal-500/5 to-transparent',
    sampleRecipient: 'For Mateo',
    sampleNote:
      'Thank you for standing by me through every twist and turn. Here are the memories and inside jokes that will never fade.',
    tags: [
      'Gratitude Notes',
      'Travel Postcards',
      'Inside Jokes',
      'Roadtrip Playlist',
    ],
    features: [
      'Nostalgic digital postcards from shared travels',
      'Inside jokes and quote collection board',
      'Collaborative playlist curation block',
      'Enduring letter of gratitude and encouragement',
    ],
  },
]

export const DEFAULT_TEMPLATE_ID = 'birthday'
