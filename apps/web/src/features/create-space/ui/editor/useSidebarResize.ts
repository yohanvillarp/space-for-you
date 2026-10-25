import { useState, useRef, useEffect } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

const MIN_SIDEBAR_WIDTH = 220
const MAX_SIDEBAR_WIDTH = 520
const COLLAPSE_THRESHOLD = 160
const SIDEBAR_STORAGE_KEY = 'sfy_spatial_sidebar_width'

export function useSidebarResize() {
  const [showSidebar, setShowSidebar] = useState(false)

  // Initialize sidebar width from local storage
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY)
        if (saved) {
          const parsed = Number(saved)
          if (
            !Number.isNaN(parsed) &&
            parsed >= MIN_SIDEBAR_WIDTH &&
            parsed <= MAX_SIDEBAR_WIDTH
          ) {
            return parsed
          }
        }
      } catch {
        // Ignore local storage error
      }
    }
    return 320
  })

  const [isResizingSidebar, setIsResizingSidebar] = useState(false)
  const lastSidebarWidthRef = useRef(sidebarWidth)

  useEffect(() => {
    lastSidebarWidthRef.current = sidebarWidth
  }, [sidebarWidth])

  const handleResizeStart = (e: ReactPointerEvent) => {
    e.preventDefault()
    setIsResizingSidebar(true)
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'

    const startX = e.clientX
    const startWidth = sidebarWidth
    const preDragWidth = sidebarWidth

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX
      const currentWidth = startWidth + deltaX

      if (currentWidth < COLLAPSE_THRESHOLD) {
        setShowSidebar(false)
        lastSidebarWidthRef.current = preDragWidth
      } else {
        setShowSidebar(true)
        const clamped = Math.max(
          MIN_SIDEBAR_WIDTH,
          Math.min(MAX_SIDEBAR_WIDTH, currentWidth),
        )
        setSidebarWidth(clamped)
        lastSidebarWidthRef.current = clamped
      }
    }

    const handlePointerUp = () => {
      setIsResizingSidebar(false)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      try {
        localStorage.setItem(
          SIDEBAR_STORAGE_KEY,
          String(lastSidebarWidthRef.current),
        )
      } catch {
        // Ignore local storage error
      }
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => {
      const next = !prev
      if (next) {
        setSidebarWidth(lastSidebarWidthRef.current || 320)
      }
      return next
    })
  }

  const handleOpenSidebar = () => {
    setSidebarWidth(lastSidebarWidthRef.current || 320)
    setShowSidebar(true)
  }

  return {
    showSidebar,
    sidebarWidth,
    isResizingSidebar,
    handleResizeStart,
    handleToggleSidebar,
    handleOpenSidebar,
  }
}
