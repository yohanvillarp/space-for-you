import type { SpaceTemplateId } from '@/entities/space'

export type SpatialItemType =
  | 'candle'
  | 'wax-envelope'
  | 'vinyl-player'
  | 'cassette-tape'
  | 'polaroid'
  | 'greeting-card'
  | 'airmail-postcard'
  | 'sticky-note'
  | 'rose-petals'
  | 'washi-tape'
  | 'confetti-stars'
  | 'vector-sticker'

export interface SpatialItemData {
  title?: string
  caption?: string
  text?: string
  isLit?: boolean
  isSealed?: boolean
  isPlaying?: boolean
  color?: string
  tapeColor?: 'gold' | 'rose' | 'sage' | 'translucent'
  photoUrl?: string
  date?: string
  svgUrl?: string
  stickerName?: string
  scale?: number
}

export interface SpatialItem {
  id: string
  type: SpatialItemType
  label: string
  x: number // percentage 0 - 100 relative to stage canvas
  y: number // percentage 0 - 100 relative to stage canvas
  rotation: number // degrees (-25 to +25)
  zIndex: number
  data: SpatialItemData
}

export interface ToolboxItemDef {
  type: SpatialItemType
  label: string
  category: 'stage' | 'universal'
  description: string
  iconName: string
  supportedTemplates: SpaceTemplateId[] | 'all'
  defaultData: SpatialItemData
}
