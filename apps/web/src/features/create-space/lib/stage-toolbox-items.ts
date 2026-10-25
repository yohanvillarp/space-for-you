import type { ToolboxItemDef } from '@/features/create-space/model/spatial-stage.types'

export const TOOLBOX_ITEMS: ToolboxItemDef[] = [
  // --- Stage Specific Items ---
  {
    type: 'candle',
    label: 'Birthday Candle',
    category: 'stage',
    description: 'Flickering candlelight with interactive make-a-wish flame',
    iconName: 'Flame',
    supportedTemplates: ['birthday'],
    defaultData: {
      isLit: true,
      title: 'Make a Wish',
    },
  },
  {
    type: 'greeting-card',
    label: 'Dedication Card',
    category: 'stage',
    description: 'Deckled heavy cotton card with gold foil accent',
    iconName: 'Mail',
    supportedTemplates: ['birthday'],
    defaultData: {
      title: 'Birthday Dedication',
      text: 'May this year bring gentle discoveries, quiet wonder, and all the happiness you deserve.',
    },
  },
  {
    type: 'confetti-stars',
    label: 'Golden Starlight',
    category: 'stage',
    description: 'Scattered starlight glimmers and celebration dust',
    iconName: 'Sparkles',
    supportedTemplates: ['birthday'],
    defaultData: {
      color: '#F59E0B',
    },
  },
  {
    type: 'music-box',
    label: 'Birthday Music Box',
    category: 'stage',
    description: 'Antique musical keepsake box playing the celebration melody',
    iconName: 'Music',
    supportedTemplates: ['birthday'],
    defaultData: {
      isPlaying: true,
      title: 'Happy Birthday (Music Box)',
      artist: 'Oleg Kirilkov',
      audioUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/9c/ff/8f/9cff8fc6-308a-a3c0-0116-3d3a44df5344/mzaf_7859720660966454213.plus.aac.p.m4a',
    },
  },
  {
    type: 'wax-envelope',
    label: 'Wax-Sealed Letter',
    category: 'stage',
    description: 'Handmade cotton envelope with terracotta wax seal',
    iconName: 'HeartHandshake',
    supportedTemplates: ['anniversary'],
    defaultData: {
      isSealed: true,
      title: 'A Private Love Letter',
      text: 'To the one who turned everyday moments into our favorite sanctuary.',
    },
  },
  {
    type: 'vinyl-player',
    label: 'Vinyl Turntable',
    category: 'stage',
    description: 'Vintage turntable playing your special ambient song',
    iconName: 'Disc',
    supportedTemplates: ['anniversary'],
    defaultData: {
      isPlaying: true,
      title: 'Our Special Song',
    },
  },
  {
    type: 'rose-petals',
    label: 'Scattered Petals',
    category: 'stage',
    description: 'Soft dried rose petals scattered across the desk',
    iconName: 'Flower2',
    supportedTemplates: ['anniversary'],
    defaultData: {
      color: '#A34835',
    },
  },
  {
    type: 'airmail-postcard',
    label: 'Airmail Postcard',
    category: 'stage',
    description: 'Vintage travel postcard with blue and red postmark edge',
    iconName: 'Send',
    supportedTemplates: ['friendship'],
    defaultData: {
      title: 'Travel Postcard',
      text: 'For the memories made on the road, late-night laughs, and the adventures ahead.',
    },
  },
  {
    type: 'cassette-tape',
    label: 'Roadtrip Mixtape',
    category: 'stage',
    description: 'Vintage audio cassette with dual spinning reels',
    iconName: 'CassetteTape',
    supportedTemplates: ['friendship'],
    defaultData: {
      isPlaying: true,
      title: 'Roadtrip Mixtape • Side A',
    },
  },

  // --- Universal Keepsake Items (Available across all stages) ---
  {
    type: 'polaroid',
    label: 'Polaroid Memory',
    category: 'universal',
    description: 'Classic instant photo print with handwritten caption',
    iconName: 'Camera',
    supportedTemplates: 'all',
    defaultData: {
      caption: 'Unforgettable Moment',
      date: 'A moment in time',
      tapeColor: 'gold',
    },
  },
  {
    type: 'sticky-note',
    label: 'Handwritten Note',
    category: 'universal',
    description: 'Soft parchment note with private note or quote',
    iconName: 'StickyNote',
    supportedTemplates: 'all',
    defaultData: {
      title: 'Quick Thought',
      text: 'Just a reminder of how much you mean to me.',
    },
  },
  {
    type: 'washi-tape',
    label: 'Washi Tape Strip',
    category: 'universal',
    description: 'Textured washi tape to accent corners and photos',
    iconName: 'Bookmark',
    supportedTemplates: 'all',
    defaultData: {
      tapeColor: 'gold',
    },
  },
]
