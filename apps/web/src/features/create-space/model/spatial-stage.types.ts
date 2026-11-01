/**
 * @fileoverview Types and models for interactive 2D diorama items on the stage canvas.
 */

import type { SpaceTemplateId } from '@/entities/space'

/**
 * Supported spatial item archetypes available in the diorama stage toolbox.
 */
export type SpatialItemType =
  | 'candle'
  | 'wax-envelope'
  | 'vinyl-player'
  | 'cassette-tape'
  | 'music-box'
  | 'vintage-radio'
  | 'polaroid'
  | 'greeting-card'
  | 'airmail-postcard'
  | 'sticky-note'
  | 'rose-petals'
  | 'washi-tape'
  | 'confetti-stars'
  | 'vector-sticker'
  // Sensory & interactive tangible keepsakes
  | 'firefly-jar'
  | 'mini-dictaphone'
  | 'pressed-herbarium'
  | 'wood-wick-candle'
  | 'stardust-hourglass'
  | 'vintage-camera'
  | 'keepsake-ticket'
  | 'antique-locket'

/**
 * Payload data customizer for spatial items (audio, visuals, state).
 */
export interface SpatialItemData {
  /** Optional title or label. */
  title?: string
  /** Subtitle or photo caption. */
  caption?: string
  /** Text content for sticky notes or postcards. */
  text?: string
  /** Candle state: whether the flame is lit. */
  isLit?: boolean
  /** Wax envelope state: whether it is sealed. */
  isSealed?: boolean
  /** Vinyl player / cassette state: whether audio is playing. */
  isPlaying?: boolean
  /** Color swatch hex for candle wax or sticky note. */
  color?: string
  /** Tape color variant. */
  tapeColor?: 'gold' | 'rose' | 'sage' | 'translucent'
  /** Photo URL for polaroids or cards. */
  photoUrl?: string
  /** Memorable date string. */
  date?: string
  /** SVG illustration asset URL. */
  svgUrl?: string
  /** Sticker name identifier. */
  stickerName?: string
  /** Scale factor (e.g. 1.0, 1.2). */
  scale?: number
  /** Ambient audio track URL. */
  audioUrl?: string
  /** Music artist name. */
  artist?: string
  /** Additional subtitle info. */
  subtitle?: string
  /** Indicates whether the audio is a personal voice note. */
  isVoiceNote?: boolean
  /** Indicates whether the voice note is an instructional sample that shouldn't appear for recipients. */
  isVoiceNoteSample?: boolean
  /** Duration in seconds. */
  duration?: number
  /** Whether a jar, box, or container is opened. */
  isOpen?: boolean
  /** Whether a keepsake travel ticket has been hole-punched. */
  isPunched?: boolean
  /** Departure location or origin for keepsake ticket. */
  ticketFrom?: string
  /** Destination or sentimental destination for keepsake ticket. */
  ticketDestination?: string
  /** Whether an hourglass has been flipped upside down. */
  sandFlipped?: boolean
  /** Whether an antique keepsake locket is hinged open. */
  locketOpen?: boolean
  /** Preserved botanical specimen type for pressed herbarium. */
  herbariumFlower?: 'lavender' | 'hydrangea' | 'ferns' | 'pressed-rose'
  /** Micro-interaction flash state for vintage camera. */
  cameraFlashed?: boolean
}

/**
 * A discrete interactive item positioned in the 2D spatial canvas diorama.
 */
export interface SpatialItem {
  /** Unique item instance ID. */
  id: string
  /** Spatial artifact archetype. */
  type: SpatialItemType
  /** Display label in the layer list or inspector. */
  label: string
  /** Normalized X position (0 - 100 percentage relative to stage width). */
  x: number
  /** Normalized Y position (0 - 100 percentage relative to stage height). */
  y: number
  /** Visual rotation angle in degrees (-25 to +25). */
  rotation: number
  /** Depth layering stack order. */
  zIndex: number
  /** Whether position and rotation are locked against accidental drag. */
  isLocked?: boolean
  /** Domain item payload data. */
  data: SpatialItemData
}

/**
 * Toolbox catalog definition describing an item that can be dragged onto the canvas.
 */
export interface ToolboxItemDef {
  /** Item type archetype. */
  type: SpatialItemType
  /** Human-readable label. */
  label: string
  /** Category grouping in the sidebar toolbox. */
  category: 'stage' | 'universal'
  /** Tooltip description. */
  description: string
  /** Lucide icon name. */
  iconName: string
  /** Supported theme templates or 'all'. */
  supportedTemplates: SpaceTemplateId[] | 'all'
  /** Initial default data upon placement. */
  defaultData: SpatialItemData
}
