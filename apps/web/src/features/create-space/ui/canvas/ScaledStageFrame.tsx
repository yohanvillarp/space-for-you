import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react'
import {
  VIRTUAL_CANVAS_WIDTH,
  VIRTUAL_CANVAS_HEIGHT,
} from '@/features/create-space/ui/canvas/useVirtualCanvasScale'
import { cn } from '@/shared/lib'

export interface ScaledStageFrameProps extends HTMLAttributes<HTMLDivElement> {
  scale: number
  rotated?: boolean
  stageRef?: Ref<HTMLDivElement>
  frameClassName?: string
  children: ReactNode
}

/**
 * Renders the fixed 1280x720 stage at a visual scale while reserving its real
 * scaled footprint in the layout, so it is never clipped by flex/overflow.
 * Exposes `--stage-inv-scale` for controls that must stay readable/tappable.
 */
export function ScaledStageFrame({
  scale,
  rotated = false,
  stageRef,
  frameClassName,
  className,
  style,
  children,
  ...stageProps
}: ScaledStageFrameProps) {
  const frameWidth = Math.round(
    (rotated ? VIRTUAL_CANVAS_HEIGHT : VIRTUAL_CANVAS_WIDTH) * scale,
  )
  const frameHeight = Math.round(
    (rotated ? VIRTUAL_CANVAS_WIDTH : VIRTUAL_CANVAS_HEIGHT) * scale,
  )

  // Point mapping: scale first, rotate around top-left, then shift back in view
  const transform = rotated
    ? `translateX(${VIRTUAL_CANVAS_HEIGHT * scale}px) rotate(90deg) scale(${scale})`
    : `scale(${scale})`

  const inverseScale = scale < 1 ? Math.min(1 / scale, 1.8) : 1

  const stageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: VIRTUAL_CANVAS_WIDTH,
    height: VIRTUAL_CANVAS_HEIGHT,
    transform,
    transformOrigin: 'top left',
    '--stage-inv-scale': inverseScale,
    ...style,
  } as CSSProperties

  return (
    <div
      className={cn('relative shrink-0', frameClassName)}
      style={{ width: frameWidth, height: frameHeight }}
    >
      <div
        ref={stageRef}
        {...stageProps}
        style={stageStyle}
        className={cn('overflow-hidden', className)}
      >
        {children}
      </div>
    </div>
  )
}
