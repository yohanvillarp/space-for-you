import { useState, useRef, useEffect, useCallback } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'
import { playSpatialSfx } from '@/shared/lib'

export interface UseItemRotationOptions {
  itemId: string
  currentRotation: number
  itemRef: RefObject<HTMLDivElement | null>
  onSetRotation: (id: string, angle: number) => void
}

export function useItemRotation({
  itemId,
  currentRotation,
  itemRef,
  onSetRotation,
}: UseItemRotationOptions) {
  const [isRotating, setIsRotating] = useState(false)
  const [liveAngle, setLiveAngle] = useState(currentRotation)
  const lastSnappedRef = useRef<number | null>(null)
  const rotationStateRef = useRef<{
    centerX: number
    centerY: number
    startPointerAngle: number
    startItemRotation: number
  } | null>(null)

  const handlePointerDown = useCallback(
    (e: ReactPointerEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (!itemRef.current) return

      const rect = itemRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const startPointerAngle =
        Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)

      rotationStateRef.current = {
        centerX,
        centerY,
        startPointerAngle,
        startItemRotation: currentRotation,
      }

      lastSnappedRef.current = null
      setIsRotating(true)
      setLiveAngle(currentRotation)
      playSpatialSfx('tactile-tap')
    },
    [currentRotation, itemRef],
  )

  useEffect(() => {
    if (!isRotating) return

    const handlePointerMove = (e: PointerEvent) => {
      const state = rotationStateRef.current
      if (!state) return

      const currentPointerAngle =
        Math.atan2(e.clientY - state.centerY, e.clientX - state.centerX) *
        (180 / Math.PI)

      const delta = currentPointerAngle - state.startPointerAngle
      const rawAngle = state.startItemRotation + delta

      // Normalize angle to range [-180, 180]
      let angle = ((rawAngle + 180) % 360) - 180
      if (angle < -180) angle += 360

      // Magnetic Snapping logic:
      // 1. Center alignment snap (0 degrees)
      if (Math.abs(angle) <= 3) {
        if (lastSnappedRef.current !== 0) {
          playSpatialSfx('tactile-tap')
          lastSnappedRef.current = 0
        }
        angle = 0
      } else if (e.shiftKey) {
        // 2. Shift key: 15-degree magnetic detents
        angle = Math.round(angle / 15) * 15
        lastSnappedRef.current = angle
      } else {
        // 3. Primary cardinal snapping: ±45, ±90
        const cardinals = [-90, -45, 45, 90]
        let didSnap = false
        for (const card of cardinals) {
          if (Math.abs(angle - card) <= 2.5) {
            if (lastSnappedRef.current !== card) {
              playSpatialSfx('tactile-tap')
              lastSnappedRef.current = card
            }
            angle = card
            didSnap = true
            break
          }
        }
        if (!didSnap) {
          lastSnappedRef.current = null
        }
      }

      const finalAngle = Math.round(angle)
      setLiveAngle(finalAngle)
      onSetRotation(itemId, finalAngle)
    }

    const handlePointerUp = () => {
      setIsRotating(false)
      rotationStateRef.current = null
      lastSnappedRef.current = null
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [isRotating, itemId, onSetRotation])

  return {
    isRotating,
    liveAngle,
    handlePointerDown,
  }
}
