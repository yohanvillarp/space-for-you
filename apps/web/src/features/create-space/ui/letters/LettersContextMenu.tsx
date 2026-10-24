import type { LettersContextMenuTarget } from '@/features/create-space/ui/letters/letters-context-menu.types'
import {
  LettersContextMenuStrategy,
  type LettersContextMenuHandlers,
} from '@/features/create-space/ui/letters/LettersContextMenuStrategy'
import { FloatingContextMenu } from '@/features/create-space/shared/context-menu'

export interface LettersContextMenuProps {
  isOpen: boolean
  x: number
  y: number
  target: LettersContextMenuTarget | null
  handlers: LettersContextMenuHandlers
  onClose: () => void
}

export function LettersContextMenu({
  isOpen,
  x,
  y,
  target,
  handlers,
  onClose,
}: LettersContextMenuProps) {
  if (!isOpen || !target) return null

  const sections = LettersContextMenuStrategy.buildSections(target, handlers)

  return (
    <FloatingContextMenu
      isOpen={isOpen}
      x={x}
      y={y}
      sections={sections}
      onClose={onClose}
      dataAttribute="data-letters-context-menu"
      minWidth={200}
    />
  )
}
