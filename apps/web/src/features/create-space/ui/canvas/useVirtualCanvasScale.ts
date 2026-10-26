import { useState, useEffect, useRef, useCallback } from 'react'

/** Fixed logical stage size shared by the editor and the public viewer */
export const VIRTUAL_CANVAS_WIDTH = 1280
export const VIRTUAL_CANVAS_HEIGHT = 720

export type CanvasZoomMode = 'fit' | 'full'

export interface UseVirtualCanvasScaleOptions {
  /** Horizontal space reserved inside the container (px, both sides) */
  insetX?: number
  /** Vertical space reserved inside the container (px, both sides) */
  insetY?: number
  /** When false, scale only by available width (height grows with stage) */
  fitToHeight?: boolean
  /** Upper bound for the visual scale */
  maxScale?: number
}

export interface UseVirtualCanvasScaleReturn {
  containerRef: React.RefObject<HTMLDivElement | null>
  scale: number
  zoomMode: CanvasZoomMode
  setZoomMode: (mode: CanvasZoomMode) => void
  toggleZoomMode: () => void
  isMobile: boolean
  isPortrait: boolean
  isVirtualLandscape: boolean
  /** True when the stage is rendered rotated 90deg inside a portrait phone */
  isRotated: boolean
  toggleVirtualLandscape: () => void
  scaledHeight: number
  scaledWidth: number
}

interface ViewportState {
  width: number
  height: number
  isMobile: boolean
  isPortrait: boolean
}

const readViewport = (el: HTMLElement | null): ViewportState => {
  const winW = typeof window !== 'undefined' ? window.innerWidth : 1280
  const winH = typeof window !== 'undefined' ? window.innerHeight : 800
  return {
    width: el?.clientWidth ?? winW,
    height: el?.clientHeight ?? winH,
    isMobile: winW < 768,
    isPortrait: winH >= winW,
  }
}

/**
 * Contain-fit scaling for the fixed 1280x720 stage. Every device renders the
 * exact same composition; only the visual scale (and optional rotation) changes.
 */
export function useVirtualCanvasScale({
  insetX = 16,
  insetY = 16,
  fitToHeight = true,
  maxScale = 1.5,
}: UseVirtualCanvasScaleOptions = {}): UseVirtualCanvasScaleReturn {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [zoomMode, setZoomMode] = useState<CanvasZoomMode>('fit')
  const [isVirtualLandscape, setIsVirtualLandscape] = useState(false)
  const [viewport, setViewport] = useState<ViewportState>(() =>
    readViewport(null),
  )

  const measure = useCallback(() => {
    setViewport(readViewport(containerRef.current))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
    }
  }, [measure])

  const { width, height, isMobile, isPortrait } = viewport
  // Virtual landscape only applies while the phone is physically in portrait
  const isRotated = isVirtualLandscape && isMobile && isPortrait

  const stageW = isRotated ? VIRTUAL_CANVAS_HEIGHT : VIRTUAL_CANVAS_WIDTH
  const stageH = isRotated ? VIRTUAL_CANVAS_WIDTH : VIRTUAL_CANVAS_HEIGHT
  const availW = Math.max(160, width - insetX * 2)
  const availH = Math.max(120, height - insetY * 2)

  const fitScale = Math.min(
    availW / stageW,
    fitToHeight ? availH / stageH : Number.POSITIVE_INFINITY,
    maxScale,
  )
  const rawScale = zoomMode === 'full' ? Math.max(fitScale, 0.75) : fitScale
  const scale = Math.max(0.1, Math.round(rawScale * 1000) / 1000)

  const toggleZoomMode = useCallback(() => {
    setZoomMode((prev) => (prev === 'fit' ? 'full' : 'fit'))
  }, [])

  const toggleVirtualLandscape = useCallback(() => {
    setIsVirtualLandscape((prev) => !prev)
  }, [])

  return {
    containerRef,
    scale,
    zoomMode,
    setZoomMode,
    toggleZoomMode,
    isMobile,
    isPortrait,
    isVirtualLandscape: isRotated,
    isRotated,
    toggleVirtualLandscape,
    scaledHeight: Math.round(stageH * scale),
    scaledWidth: Math.round(stageW * scale),
  }
}
