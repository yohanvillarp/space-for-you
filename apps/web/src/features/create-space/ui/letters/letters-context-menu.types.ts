import type { LetterItem } from '@/features/create-space/model/scenes.types'

export type LettersContextMenuTarget =
  { type: 'envelope'; letter: LetterItem } | { type: 'desk' }

export interface LettersContextMenuState {
  isOpen: boolean
  x: number
  y: number
  target: LettersContextMenuTarget | null
}
