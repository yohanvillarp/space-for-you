import { useState, useEffect, useRef, useCallback } from 'react'
import type { ContextMenuState, ContextMenuTarget } from './types'

const MENU_WIDTH = 220
const MENU_HEIGHT = 280
const VIEWPORT_PADDING = 12

export function useContextMenu() {
  const [menuState, setMenuState] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    target: null,
  })

  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => {
    setMenuState((prev) =>
      prev.isOpen ? { ...prev, isOpen: false, target: null } : prev,
    )
  }, [])

  const openMenu = useCallback(
    (target: ContextMenuTarget, clientX: number, clientY: number) => {
      // Clamp coordinates to keep menu fully inside viewport
      const maxX = window.innerWidth - MENU_WIDTH - VIEWPORT_PADDING
      const maxY = window.innerHeight - MENU_HEIGHT - VIEWPORT_PADDING

      const clampedX = Math.max(VIEWPORT_PADDING, Math.min(clientX, maxX))
      const clampedY = Math.max(VIEWPORT_PADDING, Math.min(clientY, maxY))

      setMenuState({
        isOpen: true,
        x: clampedX,
        y: clampedY,
        target,
      })
    },
    [],
  )

  // Close on outside pointer click, Escape key, or window resize
  useEffect(() => {
    if (!menuState.isOpen) return

    const handlePointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }

    const handleScrollOrResize = () => {
      closeMenu()
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleScrollOrResize)
    window.addEventListener('scroll', handleScrollOrResize, true)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleScrollOrResize)
      window.removeEventListener('scroll', handleScrollOrResize, true)
    }
  }, [menuState.isOpen, closeMenu])

  return {
    menuState,
    menuRef,
    openMenu,
    closeMenu,
  }
}
