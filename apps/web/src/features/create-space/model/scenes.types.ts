import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'

export type SceneType = 'free-canvas' | 'letters'

export type EnvelopeColor = 'rose' | 'amber' | 'sky' | 'emerald' | 'lavender'

export type WaxSealType = 'heart' | 'star' | 'sun' | 'sparkle'

export type LetterBlockId = 'title' | 'photo' | 'text'

export type LetterFontStyle = 'serif' | 'handwriting' | 'sans' | 'mono'
export type LetterTextAlign = 'left' | 'center' | 'justify'
export type LetterFontSize = 'sm' | 'base' | 'lg'

export interface LetterItem {
  id: string
  title: string
  content: string
  envelopeColor: EnvelopeColor
  waxSeal: WaxSealType
  date?: string
  imageUrl?: string
  paperColor?: string
  blocksOrder?: LetterBlockId[]
  fontStyle?: LetterFontStyle
  textAlign?: LetterTextAlign
  fontSize?: LetterFontSize
}

export interface BaseScene {
  id: string
  type: SceneType
  title: string
  subtitle: string
  icon: string
  order: number
}

export interface FreeCanvasScene extends BaseScene {
  type: 'free-canvas'
  items: SpatialItem[]
}

export interface LettersScene extends BaseScene {
  type: 'letters'
  letters: LetterItem[]
}

export type SpaceScene = FreeCanvasScene | LettersScene

export interface SpaceMeta {
  recipientName: string
  senderName: string
  title: string
  dedicationMessage?: string
}

export const INITIAL_LETTERS_DATA: LetterItem[] = [
  {
    id: 'letter-1',
    title: 'The day we first laughed together',
    content:
      'I still remember the gentle afternoon sunlight and how effortlessly we talked. That moment made me realize how rare and special your presence is in my life.',
    envelopeColor: 'rose',
    waxSeal: 'heart',
    date: 'A cherished memory',
  },
  {
    id: 'letter-2',
    title: 'A quiet promise for your days ahead',
    content:
      'Whenever life gets noisy or overwhelming, remember this place. You have a resilient and beautiful heart, and I will always be cheering for your joy.',
    envelopeColor: 'sky',
    waxSeal: 'sun',
    date: 'Words to keep close',
  },
  {
    id: 'letter-3',
    title: 'Little things that make you you',
    content:
      'The way your eyes light up when you speak of things you love, your quiet kindness to strangers, and how you make every room warmer just by being in it.',
    envelopeColor: 'lavender',
    waxSeal: 'sparkle',
    date: 'With all my admiration',
  },
  {
    id: 'letter-4',
    title: 'A wish for this milestone',
    content:
      'May the year ahead bring you peace, adventures that take your breath away, and memories as luminous as starlight.',
    envelopeColor: 'amber',
    waxSeal: 'star',
    date: 'To celebrate you',
  },
]

export const DEFAULT_SPACE_META: SpaceMeta = {
  recipientName: 'Sophia',
  senderName: 'Yohan',
  title: 'A Digital Sanctuary',
  dedicationMessage:
    'An intimate collection of moments, letters, and memories curated just for you.',
}
