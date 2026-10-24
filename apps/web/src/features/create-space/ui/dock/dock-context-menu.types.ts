import type { SpaceScene } from '@/features/create-space/model/scenes.types'

export type DockContextMenuTarget =
  | { type: 'scene'; scene: SpaceScene; index: number }
  | { type: 'hub' }
  | { type: 'vault' }
  | { type: 'dock' }

export interface DockContextMenuState {
  isOpen: boolean
  x: number
  y: number
  target: DockContextMenuTarget | null
}
