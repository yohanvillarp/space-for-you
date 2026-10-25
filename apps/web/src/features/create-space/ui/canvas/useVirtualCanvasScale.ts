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
  isPortrait: boolean
  isVirtualLandscape: boolean
  toggleVirtualLandscape: () => void
  scaledHeight: number
  scaledWidth: number
}

export function useVirtualCanvasScale(): UseVirtualCanvasScaleReturn {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const [zoomMode, setZoomMode] = useState<CanvasZoomMode>('fit')
  const [isVirtualLandscape, setIsVirtualLandscape] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )
  const [isPortrait, setIsPortrait] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.innerHeight >= window.innerWidth
      : true,
  )

  const updateScale = useCallback(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight

    const mobileCheck = winWidth < 768
    const portraitCheck = winHeight >= winWidth
    setIsMobile(mobileCheck)
    setIsPortrait(portraitCheck)

    // Reset virtual landscape if physically rotated to landscape
    if (!portraitCheck && isVirtualLandscape) {
      setIsVirtualLandscape(false)
    }

    if (zoomMode === 'full') {
      setScale(1)
      return
    }

    // 1. Desktop / Laptop Bidirectional Scale:
    // Ensures the canvas never cuts off vertically on 1366x768, laptops or scaling > 100%
    if (!mobileCheck) {
      const paddingX = 32
      const paddingY = 24
      const availW = Math.max(320, containerWidth - paddingX)
      const availH = Math.max(280, containerHeight - paddingY)
      const scaleW = availW / VIRTUAL_CANVAS_WIDTH
      const scaleH = availH / VIRTUAL_CANVAS_HEIGHT
      const optimalScale = Math.min(scaleW, scaleH, 1.05)
      setScale(Math.round(optimalScale * 1000) / 1000)
      return
    }

    // 2. Mobile in Virtual Landscape (90deg CSS rotation inside portrait phone)
    if (isVirtualLandscape && portraitCheck) {
      // In 90deg rotation: 960px width fits in container height, 600px height fits in container width
      const availH = Math.max(320, containerHeight - 32)
      const availW = Math.max(260, containerWidth - 20)
      const scaleW = availH / VIRTUAL_CANVAS_WIDTH
      const scaleH = availW / VIRTUAL_CANVAS_HEIGHT
      const computedScale = Math.min(scaleW, scaleH, 1)
      setScale(Math.round(computedScale * 1000) / 1000)
      return
    }

    // 3. Mobile in Native Landscape (Physical rotation)
    if (!portraitCheck) {
      const availW = Math.max(320, containerWidth - 24)
      const availH = Math.max(220, containerHeight - 16)
      const scaleW = availW / VIRTUAL_CANVAS_WIDTH
      const scaleH = availH / VIRTUAL_CANVAS_HEIGHT
      const computedScale = Math.min(scaleW, scaleH, 1)
      setScale(Math.round(computedScale * 1000) / 1000)
      return
    }

    // 4. Mobile in Default Portrait 'fit' mode
    const horizontalPadding = 16
    const availableWidth = Math.max(300, containerWidth - horizontalPadding)
    const computedScale = Math.min(1, availableWidth / VIRTUAL_CANVAS_WIDTH)
    setScale(Math.round(computedScale * 1000) / 1000)
  }, [zoomMode, isVirtualLandscape])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver(() => {
      updateScale()
    })

    observer.observe(el)
    window.addEventListener('resize', updateScale)
    window.addEventListener('orientationchange', updateScale)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
      window.removeEventListener('orientationchange', updateScale)
    }
  }, [updateScale])

  const toggleZoomMode = useCallback(() => {
    setZoomMode((prev) => (prev === 'fit' ? 'full' : 'fit'))
  }, [])

  const toggleVirtualLandscape = useCallback(() => {
    setIsVirtualLandscape((prev) => !prev)
  }, [])

  const scaledHeight = Math.round(VIRTUAL_CANVAS_HEIGHT * scale)
  const scaledWidth = Math.round(VIRTUAL_CANVAS_WIDTH * scale)

  return {
    containerRef,
    scale,
    zoomMode,
    setZoomMode,
    toggleZoomMode,
    isMobile,
    isPortrait,
    isVirtualLandscape,
    toggleVirtualLandscape,
    scaledHeight,
    scaledWidth,
  }
}
