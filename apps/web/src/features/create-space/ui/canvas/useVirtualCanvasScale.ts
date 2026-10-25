import { useState, useEffect, useRef, useCallback } from 'react'

export const VIRTUAL_CANVAS_WIDTH = 960
export const VIRTUAL_CANVAS_HEIGHT = 600

export type CanvasZoomMode = 'fit' | 'full'

export interface UseVirtualCanvasScaleReturn {
  containerRef: React.RefObject<HTMLDivElement | null>
  scale: number
  zoomMode: CanvasZoomMode
  setZoomMode: (mode: CanvasZoomMode) => void
  toggleZoomMode: () => void
  isMobile: boolean
  scaledHeight: number
}

export function useVirtualCanvasScale(): UseVirtualCanvasScaleReturn {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const [zoomMode, setZoomMode] = useState<CanvasZoomMode>('fit')
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )

  const updateScale = useCallback(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const mobileCheck = window.innerWidth < 768
    setIsMobile(mobileCheck)

    if (!mobileCheck || zoomMode === 'full') {
      setScale(1)
      return
    }

    // On mobile in 'fit' mode, calculate scale to fit available width with comfortable padding
    const horizontalPadding = 16
    const availableWidth = Math.max(300, containerWidth - horizontalPadding)
    const computedScale = Math.min(1, availableWidth / VIRTUAL_CANVAS_WIDTH)
    setScale(Math.round(computedScale * 1000) / 1000)
  }, [zoomMode])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver(() => {
      updateScale()
    })

    observer.observe(el)
    window.addEventListener('resize', updateScale)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [updateScale])

  const toggleZoomMode = useCallback(() => {
    setZoomMode((prev) => (prev === 'fit' ? 'full' : 'fit'))
  }, [])

  const scaledHeight =
    zoomMode === 'fit' && isMobile
      ? Math.round(VIRTUAL_CANVAS_HEIGHT * scale)
      : VIRTUAL_CANVAS_HEIGHT

  return {
    containerRef,
    scale,
    zoomMode,
    setZoomMode,
    toggleZoomMode,
    isMobile,
    scaledHeight,
  }
}
