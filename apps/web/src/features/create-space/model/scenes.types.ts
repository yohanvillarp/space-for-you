/**
 * @fileoverview Domain models and polymorphic types representing scenes and letters.
 */

import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'

/**
 * Type of interactive room or viewport within a digital sanctuary.
 * - `free-canvas`: 2D diorama canvas with draggable spatial items.
 * - `letters`: Desk with heartfelt letters sealed with wax.
 */
export type SceneType = 'free-canvas' | 'letters'

/**
 * Curated color palette options for letter envelopes.
 */
export type EnvelopeColor = 'rose' | 'amber' | 'sky' | 'emerald' | 'lavender'

/**
 * Curated wax seal stamp emblems for envelopes.
 */
export type WaxSealType = 'heart' | 'star' | 'sun' | 'sparkle'

/**
 * Editable block identifiers inside a heartfelt letter.
 */
export type LetterBlockId = 'title' | 'photo' | 'text'

/**
 * Typography styles available for handwritten letters.
 */
export type LetterFontStyle = 'serif' | 'handwriting' | 'sans' | 'mono'

/**
 * Text alignment options for letter contents.
 */
export type LetterTextAlign = 'left' | 'center' | 'justify'

/**
 * Font size scaling for letter reading mode.
 */
export type LetterFontSize = 'sm' | 'base' | 'lg'

/**
 * A personal, handwritten digital letter contained within an envelope.
 */
export interface LetterItem {
  /** Unique identifier for the letter. */
  id: string
  /** Title or subject of the letter. */
  title: string
  /** Markdown or plaintext letter message. */
  content: string
  /** Envelope color swatch. */
  envelopeColor: EnvelopeColor
  /** Wax seal stamp emblem. */
  waxSeal: WaxSealType
  /** Optional memorable date or sentiment tagline. */
  date?: string
  /** Optional photo attachment URL. */
  imageUrl?: string
  /** Optional custom background paper color hex. */
  paperColor?: string
  /** Arrangement order of blocks inside the letter sheet. */
  blocksOrder?: LetterBlockId[]
  /** Chosen font family style. */
  fontStyle?: LetterFontStyle
  /** Paragraph alignment. */
  textAlign?: LetterTextAlign
  /** Font scale setting. */
  fontSize?: LetterFontSize
}

/**
 * Common base properties shared by all scenes in a space.
 */
export interface BaseScene {
  /** Unique scene identifier. */
  id: string
  /** Polymorphic scene discriminator. */
  type: SceneType
  /** Tab and header title. */
  title: string
  /** Emotional subtitle or description. */
  subtitle: string
  /** Lucide icon name for navigation. */
  icon: string
  /** Sequential zero-indexed display order. */
  order: number
}

/**
 * Scene representing an interactive 2D diorama with spatial items.
 */
export interface FreeCanvasScene extends BaseScene {
  type: 'free-canvas'
  /** Draggable spatial artifacts placed on the canvas. */
  items: SpatialItem[]
}

/**
 * Scene representing a desk of sealed envelopes and heartfelt letters.
 */
export interface LettersScene extends BaseScene {
  type: 'letters'
  /** Collection of letters in this scene. */
  letters: LetterItem[]
}

/**
 * Polymorphic union representing any scene in a digital sanctuary.
 */
export type SpaceScene = FreeCanvasScene | LettersScene

/**
 * Master metadata identifying the dedication recipient and creator.
 */
export interface SpaceMeta {
  /** Name of the recipient. */
  recipientName: string
  /** Name of the creator / sender. */
  senderName: string
  /** Sanctuary title. */
  title: string
  /** Long-form dedication message. */
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
