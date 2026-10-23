import type { SpaceTemplateId } from '@/entities/space'
import type { SpatialItem, ToolboxItemDef } from '../model/spatial-stage.types'

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

export function getDefaultItemsForTemplate(
  templateId: SpaceTemplateId,
): SpatialItem[] {
  switch (templateId) {
    case 'birthday':
      return [
        {
          id: 'b-candle-1',
          type: 'candle',
          label: 'Birthday Candle',
          x: 50,
          y: 30,
          rotation: 0,
          zIndex: 10,
          data: {
            isLit: true,
            title: 'Make a Wish',
          },
        },
        {
          id: 'b-card-1',
          type: 'greeting-card',
          label: 'Dedication Card',
          x: 28,
          y: 58,
          rotation: -2,
          zIndex: 5,
          data: {
            title: 'Birthday Dedication',
            text: 'May this year bring gentle discoveries, quiet wonder, and all the happiness you deserve.',
          },
        },
        {
          id: 'b-polaroid-1',
          type: 'polaroid',
          label: 'Polaroid Memory',
          x: 72,
          y: 56,
          rotation: 3,
          zIndex: 6,
          data: {
            caption: 'Celebration Memories',
            date: 'Another beautiful year',
            tapeColor: 'gold',
          },
        },
        {
          id: 'b-confetti-1',
          type: 'confetti-stars',
          label: 'Golden Starlight',
          x: 50,
          y: 84,
          rotation: 0,
          zIndex: 2,
          data: {
            color: '#F59E0B',
          },
        },
      ]

    case 'anniversary':
      return [
        {
          id: 'r-envelope-1',
          type: 'wax-envelope',
          label: 'Wax-Sealed Letter',
          x: 36,
          y: 45,
          rotation: -1,
          zIndex: 8,
          data: {
            isSealed: true,
            title: 'A Private Love Letter',
            text: 'To the one who turned everyday moments into our favorite sanctuary.',
          },
        },
        {
          id: 'r-vinyl-1',
          type: 'vinyl-player',
          label: 'Vinyl Turntable',
          x: 74,
          y: 35,
          rotation: 2,
          zIndex: 5,
          data: {
            isPlaying: true,
            title: 'Our Special Song',
          },
        },
        {
          id: 'r-polaroid-1',
          type: 'polaroid',
          label: 'Polaroid Memory',
          x: 20,
          y: 62,
          rotation: -4,
          zIndex: 6,
          data: {
            caption: 'Our Favorite Evening',
            date: 'Forever begins here',
            tapeColor: 'rose',
          },
        },
        {
          id: 'r-petals-1',
          type: 'rose-petals',
          label: 'Rose Petals',
          x: 60,
          y: 78,
          rotation: 12,
          zIndex: 2,
          data: {
            color: '#A34835',
          },
        },
      ]

    case 'friendship':
      return [
        {
          id: 'f-postcard-1',
          type: 'airmail-postcard',
          label: 'Airmail Postcard',
          x: 35,
          y: 44,
          rotation: -2,
          zIndex: 7,
          data: {
            title: 'Travel Postcard',
            text: 'For the memories made on the road, late-night laughs, and the adventures ahead.',
          },
        },
        {
          id: 'f-cassette-1',
          type: 'cassette-tape',
          label: 'Roadtrip Mixtape',
          x: 74,
          y: 38,
          rotation: 3,
          zIndex: 6,
          data: {
            isPlaying: true,
            title: 'Roadtrip Mixtape • Side A',
          },
        },
        {
          id: 'f-polaroid-1',
          type: 'polaroid',
          label: 'Polaroid Memory',
          x: 18,
          y: 50,
          rotation: -3,
          zIndex: 5,
          data: {
            caption: 'Best Adventure Yet',
            date: 'Roadtrip Diaries',
            tapeColor: 'sage',
          },
        },
        {
          id: 'f-note-1',
          type: 'sticky-note',
          label: 'Handwritten Note',
          x: 55,
          y: 76,
          rotation: 2,
          zIndex: 4,
          data: {
            title: 'Secret Code',
            text: 'Remember rule #1: Never forget the snacks and always stop for photos.',
          },
        },
      ]

    default:
      return []
  }
}

export function getToolboxItemsForTemplate(
  templateId: SpaceTemplateId,
): ToolboxItemDef[] {
  return TOOLBOX_ITEMS.filter(
    (item) =>
      item.supportedTemplates === 'all' ||
      item.supportedTemplates.includes(templateId),
  )
}
