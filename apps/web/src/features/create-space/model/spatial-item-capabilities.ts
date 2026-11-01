import type { SpatialItemType } from './spatial-stage.types'

export type ItemFormType =
  | 'ticket'
  | 'herbarium'
  | 'sensory-secret'
  | 'sensory-memo'
  | 'card-or-letter'
  | 'sticky-note'
  | 'polaroid'
  | 'audio'
  | 'none'

const ITEM_DISPLAY_NAMES: Record<SpatialItemType, string> = {
  'greeting-card': 'Dedication Card',
  'airmail-postcard': 'Airmail Postcard',
  'sticky-note': 'Handwritten Note',
  'wax-envelope': 'Sealed Love Letter',
  polaroid: 'Polaroid Photo',
  'cassette-tape': 'Voice Note Cassette',
  'vinyl-player': 'Vinyl Record Player',
  'music-box': 'Wind-up Music Box',
  'vintage-radio': 'Keepsake Radio',
  candle: 'Atelier Candle',
  'rose-petals': 'Rose Petals',
  'washi-tape': 'Washi Tape',
  'confetti-stars': 'Confetti Stars',
  'vector-sticker': 'Keepsake Sticker',
  'firefly-jar': 'Firefly Wishing Jar',
  'mini-dictaphone': 'Vintage Dictaphone',
  'pressed-herbarium': 'Pressed Herbarium Frame',
  'wood-wick-candle': 'Wood-Wick Scented Candle',
  'stardust-hourglass': 'Stardust Hourglass',
  'vintage-camera': '35mm Keepsake Camera',
  'keepsake-ticket': 'Keepsake Journey Ticket',
  'antique-locket': 'Antique Hinged Locket',
}

const ITEM_FORM_TYPE_MAP: Record<SpatialItemType, ItemFormType> = {
  'keepsake-ticket': 'ticket',
  'pressed-herbarium': 'herbarium',
  'antique-locket': 'sensory-secret',
  'firefly-jar': 'sensory-secret',
  'stardust-hourglass': 'sensory-secret',
  'wood-wick-candle': 'sensory-memo',
  'mini-dictaphone': 'sensory-memo',
  'vintage-camera': 'sensory-memo',
  'greeting-card': 'card-or-letter',
  'airmail-postcard': 'card-or-letter',
  'wax-envelope': 'card-or-letter',
  'sticky-note': 'sticky-note',
  polaroid: 'polaroid',
  'cassette-tape': 'audio',
  'vinyl-player': 'audio',
  'music-box': 'audio',
  'vintage-radio': 'audio',
  candle: 'none',
  'rose-petals': 'none',
  'washi-tape': 'none',
  'confetti-stars': 'none',
  'vector-sticker': 'none',
}

export function getItemDisplayName(
  type: SpatialItemType,
  fallbackLabel?: string,
): string {
  return ITEM_DISPLAY_NAMES[type] || fallbackLabel || 'Stage Keepsake'
}

export function getItemFormType(type: SpatialItemType): ItemFormType {
  return ITEM_FORM_TYPE_MAP[type] ?? 'none'
}

export function supportsTextEdit(type: SpatialItemType): boolean {
  return getItemFormType(type) !== 'none'
}

export function supportsPhotoEdit(type: SpatialItemType): boolean {
  return type === 'polaroid' || type === 'antique-locket'
}
