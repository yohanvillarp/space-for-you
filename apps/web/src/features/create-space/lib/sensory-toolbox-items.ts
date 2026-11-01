import type { ToolboxItemDef } from '@/features/create-space/model/spatial-stage.types'

/**
 * Tangible & sensory keepsakes catalog definitions for the diorama toolbox.
 */
export const SENSORY_TOOLBOX_ITEMS: ToolboxItemDef[] = [
  {
    type: 'firefly-jar',
    label: 'Firefly Keepsake Jar',
    category: 'universal',
    description:
      'Glass jar of dancing golden starlight with pop-cork interaction',
    iconName: 'Sparkles',
    supportedTemplates: 'all',
    defaultData: {
      isOpen: false,
      title: 'Firefly Wishes',
    },
  },
  {
    type: 'mini-dictaphone',
    label: 'Analog Dictaphone',
    category: 'universal',
    description:
      'Micro-cassette voice recorder with spinning spools and VU meter',
    iconName: 'Mic',
    supportedTemplates: 'all',
    defaultData: {
      isPlaying: false,
      title: 'Voice Memo',
    },
  },
  {
    type: 'pressed-herbarium',
    label: 'Pressed Wildflower',
    category: 'universal',
    description:
      'Botanical specimen preserved in double glass with copper frame',
    iconName: 'Flower2',
    supportedTemplates: 'all',
    defaultData: {
      herbariumFlower: 'lavender',
      title: 'Lavender Herbarium',
      caption: 'Herbarium No. 24',
    },
  },
  {
    type: 'wood-wick-candle',
    label: 'Wood-Wick Candle',
    category: 'stage',
    description: 'Sculptural terracotta soy candle with crackling wooden wick',
    iconName: 'Flame',
    supportedTemplates: ['birthday', 'anniversary'],
    defaultData: {
      isLit: true,
      title: 'Wood-Wick Glow',
    },
  },
  {
    type: 'stardust-hourglass',
    label: 'Stardust Hourglass',
    category: 'universal',
    description: 'Turned walnut wood hourglass with cascading golden stardust',
    iconName: 'Hourglass',
    supportedTemplates: 'all',
    defaultData: {
      sandFlipped: false,
      title: 'Shared Moments',
    },
  },
  {
    type: 'vintage-camera',
    label: '35mm Rangefinder',
    category: 'stage',
    description:
      'Classic retro camera with flashing optical lens and photo print',
    iconName: 'Camera',
    supportedTemplates: ['anniversary', 'friendship'],
    defaultData: {
      title: '35mm Rangefinder',
    },
  },
  {
    type: 'keepsake-ticket',
    label: 'Journey Ticket',
    category: 'stage',
    description: 'Scalloped vintage keepsake transit ticket with heart punch',
    iconName: 'Ticket',
    supportedTemplates: ['friendship', 'anniversary'],
    defaultData: {
      isPunched: false,
      ticketFrom: 'First Day',
      ticketDestination: 'Forever',
      title: 'Passage Ticket',
    },
  },
  {
    type: 'antique-locket',
    label: 'Heirloom Locket',
    category: 'stage',
    description:
      'Victorian filigree oval locket with 3D hinged portrait reveal',
    iconName: 'Heart',
    supportedTemplates: ['anniversary'],
    defaultData: {
      locketOpen: false,
      title: 'Secret Locket',
    },
  },
]
