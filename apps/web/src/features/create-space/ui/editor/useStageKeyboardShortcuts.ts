import { useEffect } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx } from '@/shared/lib'

export interface StageKeyboardShortcutsProps {
  selectedItem: SpatialItem | null
  copiedItem: SpatialItem | null
  canUndo?: boolean
  canRedo?: boolean
  onUndo?: () => void
  onRedo?: () => void
  onCopyItem: (item: SpatialItem) => void
  onPasteItem: (x?: number, y?: number) => void
  onDuplicateItem: (id: string) => void
  onDeleteItem: (id: string) => void
  onBringToFront: (id: string) => void
  onSendToBack: (id: string) => void
  onResetRotation: (id: string) => void
  showSidebar?: boolean
  onOpenSidebar?: () => void
}

export function useStageKeyboardShortcuts({
  selectedItem,
  copiedItem,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onCopyItem,
  onPasteItem,
  onDuplicateItem,
  onDeleteItem,
  onBringToFront,
  onSendToBack,
  onResetRotation,
  showSidebar,
  onOpenSidebar,
}: StageKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey

      // Focus Search: Ctrl+K / Cmd+K (Universal shortcut across Windows, Linux & Mac)
      if (isCtrlOrCmd && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        if (showSidebar === false) {
          onOpenSidebar?.()
        }
        requestAnimationFrame(() => {
          const inputs = Array.from(
            document.querySelectorAll<HTMLInputElement>('[data-search-input]'),
          )
          const visibleInput =
            inputs.find((el) => el.offsetParent !== null) ?? inputs[0]
          if (visibleInput) {
            visibleInput.focus()
            visibleInput.select()
            playSpatialSfx('tactile-tap')
          }
        })
        return
      }

      // Don't intercept other shortcuts if user is typing in an input, textarea or contentEditable
      const target = e.target as HTMLElement | null
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return
      }

      // Undo: Ctrl+Z / Cmd+Z (without Shift)
      if (isCtrlOrCmd && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault()
        if (canUndo && onUndo) {
          onUndo()
          playSpatialSfx('tactile-tap')
        }
        return
      }

      // Redo: Ctrl+Y / Cmd+Y or Ctrl+Shift+Z / Cmd+Shift+Z
      if (
        (isCtrlOrCmd && (e.key === 'y' || e.key === 'Y')) ||
        (isCtrlOrCmd && e.shiftKey && (e.key === 'z' || e.key === 'Z'))
      ) {
        e.preventDefault()
        if (canRedo && onRedo) {
          onRedo()
          playSpatialSfx('tactile-tap')
        }
        return
      }

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
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    onCopyItem,
    onPasteItem,
    onDuplicateItem,
    onDeleteItem,
    onBringToFront,
    onSendToBack,
    onResetRotation,
    showSidebar,
    onOpenSidebar,
  ])
}
