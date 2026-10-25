import type { UnboxingStage } from './unboxing.types'
import { cn } from '@/shared/lib'

export interface UnboxingTransitionOverlayProps {
  stage: UnboxingStage
  accentColor?: string
}

export function UnboxingTransitionOverlay({
  stage,
  accentColor = '#D97706',
}: UnboxingTransitionOverlayProps) {
  if (stage === 'sealed') return null

  const isBlooming = stage === 'blooming'
  const isUnwrapping = stage === 'unwrapping'

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000',
        isUnwrapping && 'opacity-30',
        isBlooming && 'opacity-100',
        stage === 'completed' && 'opacity-0',
      )}
      aria-hidden="true"
    >
      {/* Radiant light burst centered */}
      <div
        className={cn(
          'h-[200vmax] w-[200vmax] rounded-full transition-transform duration-1000 ease-out',
          isBlooming ? 'scale-100' : 'scale-0',
        )}
        style={{
          background: `radial-gradient(circle, #FFFFFF 0%, ${accentColor}44 40%, transparent 70%)`,
        }}
      />
    </div>
  )
}
