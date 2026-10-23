import type {
  SpatialItem,
  SpatialItemType,
} from '../../model/spatial-stage.types'

export type ContextMenuTarget =
  | { type: 'item'; item: SpatialItem }
  | { type: 'canvas'; coords: { x: number; y: number } }

export interface ContextMenuState {
  isOpen: boolean
  x: number // screen pixel coordinate
  y: number // screen pixel coordinate
  target: ContextMenuTarget | null
}

export interface ContextMenuItemAction {
  label: string
  iconName?: string
  shortcut?: string
  danger?: boolean
  disabled?: boolean
  onClick: () => void
}

export interface QuickAddOption {
  type: SpatialItemType
  label: string
  iconName: string
  description?: string
}
