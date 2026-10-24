import { useState, useEffect, useCallback } from 'react'
import type {
  LettersContextMenuState,
  LettersContextMenuTarget,
} from '@/features/create-space/ui/letters/letters-context-menu.types'
import { playSpatialSfx } from '@/shared/lib'

export function useLettersContextMenu() {
  const [state, setState] = useState<LettersContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    target: null,
  })

  const openMenu = useCallback(
    (e: React.MouseEvent, target: LettersContextMenuTarget) => {
      e.preventDefault()
      e.stopPropagation()

      const menuWidth = 210
      const menuHeight = 220
      const padding = 16

      const clientX = e.clientX
      const clientY = e.clientY

      const x = Math.min(
        Math.max(padding, clientX),
        window.innerWidth - menuWidth - padding,
      )

      const y =
        clientY + menuHeight > window.innerHeight - padding
          ? Math.max(padding, clientY - menuHeight)
          : clientY

      playSpatialSfx('tactile-tap')
      setState({
        isOpen: true,
        x,
        y,
        target,
      })
    },
    [],
  )

  const closeMenu = useCallback(() => {
    setState((prev) =>
      prev.isOpen ? { ...prev, isOpen: false, target: null } : prev,
    )
  }, [])

  useEffect(() => {
    if (!state.isOpen) return

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-letters-context-menu]')) return
      closeMenu()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [state.isOpen, closeMenu])

  return {
    state,
    openMenu,
    closeMenu,
  }
}
