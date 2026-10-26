import { useState, useEffect } from 'react'
import { RotateCcw, Smartphone, X } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface CanvasOrientationPromptProps {
  isMobile: boolean
  isPortrait: boolean
  isVirtualLandscape: boolean
  onToggleVirtualLandscape: () => void
  className?: string
}

export function CanvasOrientationPrompt({
  isMobile,
  isPortrait,
  isVirtualLandscape,
  onToggleVirtualLandscape,
  className,
}: CanvasOrientationPromptProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  // Auto-dismiss the initial hint after 7 seconds if not interacted
  useEffect(() => {
    if (!isPortrait) return
    const timer = setTimeout(() => {
      setIsDismissed(true)
    }, 7000)
    return () => clearTimeout(timer)
  }, [isPortrait])

  // Reset dismissed state if user toggles virtual landscape
  const handleToggle = () => {
    playSpatialSfx('pop-snap')
    onToggleVirtualLandscape()
    setIsDismissed(false)
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    playSpatialSfx('tactile-tap')
    setIsDismissed(true)
  }

  // Only relevant on mobile screens
  if (!isMobile) return null

  // If in native physical landscape, don't show the prompt
  if (!isPortrait && !isVirtualLandscape) return null

  // If dismissed and not in virtual landscape, stay hidden
  if (isDismissed && !isVirtualLandscape) return null

  return (
    <div
      className={cn(
        'pointer-events-auto absolute top-3 left-1/2 z-40 -translate-x-1/2 transition-all duration-300',
        className,
      )}
    >
      <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-black/75 px-3 py-1.5 shadow-xl backdrop-blur-md">
        <button
          type="button"
          onClick={handleToggle}
          className="flex cursor-pointer items-center gap-1.5 font-sans text-xs font-medium text-amber-200 transition-colors hover:text-amber-100"
        >
          {isVirtualLandscape ? (
            <>
              <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
              <span>Return to portrait</span>
            </>
          ) : (
            <>
              <Smartphone className="h-3.5 w-3.5 animate-pulse text-amber-400" />
              <span>Rotate phone or tap here to expand</span>
            </>
          )}
        </button>

        {!isVirtualLandscape && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss orientation tip"
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  )
}
