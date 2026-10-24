import { useState, useEffect, useCallback } from 'react'
import type {
  SpaceHubContextMenuState,
  SpaceHubContextMenuTarget,
} from '@/features/create-space/ui/hub/space-hub-context-menu.types'
import { playSpatialSfx } from '@/shared/lib'

export function useSpaceHubContextMenu() {
  const [state, setState] = useState<SpaceHubContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    target: null,
  })

  const openMenu = useCallback(
    (e: React.MouseEvent, target: SpaceHubContextMenuTarget) => {
      e.preventDefault()
      e.stopPropagation()

      const menuWidth = 210
      const menuHeight = 250
      const padding = 16

      const clientX = e.clientX
      const clientY = e.clientY

      // Clamp horizontally
      const x = Math.min(
        Math.max(padding, clientX),
        window.innerWidth - menuWidth - padding,
      )

      // Position below cursor, or flip upward if overflowing bottom
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
      if (target?.closest('[data-space-hub-context-menu]')) return
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
