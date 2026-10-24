import type { SpaceScene } from '@/features/create-space/model/scenes.types'

export type SpaceHubContextMenuTarget =
  | { type: 'scene'; scene: SpaceScene; index: number }
  | { type: 'add-card' }
  | { type: 'hero' }
  | { type: 'background' }

export interface SpaceHubContextMenuState {
  isOpen: boolean
  x: number
  y: number
  target: SpaceHubContextMenuTarget | null
}
