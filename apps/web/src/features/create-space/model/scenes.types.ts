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
 * Configuration for scheduled scene release date (Time Capsule / Advent reveal).
 */
export interface SceneScheduleConfig {
  /** Whether the time lock is actively enforced. */
  enabled: boolean
  /** ISO 8601 unlock date-time string (e.g. '2026-10-31T00:00:00'). */
  unlockAt: string
  /** Optional personal teasing / anticipation message from the sender. */
  teaserMessage?: string
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
  /** Optional schedule restricting scene access until a specific date. */
  schedule?: SceneScheduleConfig
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
    id: 'letter-welcome',
    title: 'A Guide to Your Heartfelt Letters',
    date: 'Everything you can create',
    envelopeColor: 'rose',
    waxSeal: 'heart',
    paperColor: 'ivory',
    blocksOrder: ['title', 'text', 'photo'],
    fontStyle: 'serif',
    textAlign: 'left',
    fontSize: 'base',
    content:
      'Welcome to your private desk of letters. This intimate space is designed to hold your memories, unspoken feelings, and gentle wishes for someone truly special.\n\nHere is everything you can personalize:\n\n• Envelopes & Wax Seals: Select curated envelope tones and signature wax seals from the studio sidebar to set the mood for each message.\n\n• Fine Stationery: Tailor paper colors, editorial fonts, and text alignments to match your personal writing voice.\n\n• Keepsake Photographs: Tuck a memorable photograph inside any letter to accompany your words with visual warmth.\n\n• Layout Order: Arrange the unfolding order of your title, date, photo, and message to create your ideal reveal.\n\n• Multiple Notes: Fold as many letters as you wish using the "Add New Letter" button below to craft a complete journey of letters waiting to be discovered.',
  },
]

export const DEFAULT_SPACE_META: SpaceMeta = {
  recipientName: '',
  senderName: '',
  title: '',
  dedicationMessage:
    'An intimate collection of moments, letters, and memories curated just for you.',
}
