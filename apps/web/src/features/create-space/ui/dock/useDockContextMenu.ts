import { useState, useEffect, useCallback } from 'react'
import type {
  DockContextMenuState,
  DockContextMenuTarget,
} from '@/features/create-space/ui/dock/dock-context-menu.types'
import { playSpatialSfx } from '@/shared/lib'

export function useDockContextMenu() {
  const [state, setState] = useState<DockContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    target: null,
  })

  const openMenu = useCallback(
    (e: React.MouseEvent, target: DockContextMenuTarget) => {
      e.preventDefault()
      e.stopPropagation()

      // Keep menu strictly inside viewport bounds
      const menuWidth = 200
      const menuHeight = 240
      const padding = 12

      const clientX = e.clientX
      const clientY = e.clientY

      const x = Math.min(
        Math.max(padding, clientX - menuWidth / 2),
        window.innerWidth - menuWidth - padding,
      )
      // Dock is at bottom, default position above cursor
      const y =
        clientY - menuHeight < padding
          ? clientY + padding
          : clientY - menuHeight

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
      if (target?.closest('[data-dock-context-menu]')) return
      closeMenu()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [state.isOpen, closeMenu])

  return {
    state,
    openMenu,
    closeMenu,
  }
}
