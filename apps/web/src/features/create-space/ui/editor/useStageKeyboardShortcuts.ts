import { useEffect } from 'react'
import type { SpatialItem } from '../../model/spatial-stage.types'
import { playSpatialSfx } from '@/shared/lib'

export interface StageKeyboardShortcutsProps {
  selectedItem: SpatialItem | null
  copiedItem: SpatialItem | null
  onCopyItem: (item: SpatialItem) => void
  onPasteItem: (x?: number, y?: number) => void
  onDuplicateItem: (id: string) => void
  onDeleteItem: (id: string) => void
  onBringToFront: (id: string) => void
  onSendToBack: (id: string) => void
  onResetRotation: (id: string) => void
}

export function useStageKeyboardShortcuts({
  selectedItem,
  copiedItem,
  onCopyItem,
  onPasteItem,
  onDuplicateItem,
  onDeleteItem,
  onBringToFront,
  onSendToBack,
  onResetRotation,
}: StageKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input, textarea or contentEditable
      const target = e.target as HTMLElement | null
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return
      }

      const isCtrlOrCmd = e.ctrlKey || e.metaKey

      // Copy: Ctrl+C / Cmd+C
      if (isCtrlOrCmd && (e.key === 'c' || e.key === 'C')) {
        if (selectedItem) {
          e.preventDefault()
          onCopyItem(selectedItem)
          playSpatialSfx('tactile-tap')
        }
        return
      }

      // Paste: Ctrl+V / Cmd+V
      if (isCtrlOrCmd && (e.key === 'v' || e.key === 'V')) {
        if (copiedItem) {
          e.preventDefault()
          onPasteItem()
          playSpatialSfx('tactile-tap')
        }
        return
      }

      // Duplicate: Ctrl+D / Cmd+D
      if (isCtrlOrCmd && (e.key === 'd' || e.key === 'D')) {
        if (selectedItem) {
          e.preventDefault()
          onDuplicateItem(selectedItem.id)
          playSpatialSfx('tactile-tap')
        }
        return
      }

      // Delete: Delete or Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedItem) {
          e.preventDefault()
          onDeleteItem(selectedItem.id)
          playSpatialSfx('pop-snap')
        }
        return
      }

      // Bring to front: ]
      if (e.key === ']' && selectedItem) {
        e.preventDefault()
        onBringToFront(selectedItem.id)
        playSpatialSfx('tactile-tap')
        return
      }

      // Send to back: [
      if (e.key === '[' && selectedItem) {
        e.preventDefault()
        onSendToBack(selectedItem.id)
        playSpatialSfx('tactile-tap')
        return
      }

      // Reset rotation: r or R
      if ((e.key === 'r' || e.key === 'R') && selectedItem && !isCtrlOrCmd) {
        e.preventDefault()
        onResetRotation(selectedItem.id)
        playSpatialSfx('tactile-tap')
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    selectedItem,
    copiedItem,
    onCopyItem,
    onPasteItem,
    onDuplicateItem,
    onDeleteItem,
    onBringToFront,
    onSendToBack,
    onResetRotation,
  ])
}
