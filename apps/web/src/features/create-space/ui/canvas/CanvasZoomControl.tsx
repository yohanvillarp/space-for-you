import { Maximize2, Minimize2 } from 'lucide-react'
import type { CanvasZoomMode } from './useVirtualCanvasScale'
import { cn } from '@/shared/lib'

export interface CanvasZoomControlProps {
  zoomMode: CanvasZoomMode
  scale: number
  onToggle: () => void
  className?: string
}

export function CanvasZoomControl({
  zoomMode,
  scale,
  onToggle,
  className,
}: CanvasZoomControlProps) {
  const isFit = zoomMode === 'fit'

  return (
    <button
      type="button"
      onClick={onToggle}
      title={
        isFit
          ? 'Switch to 100% full scale scrollable view'
          : 'Switch to fit-to-screen view'
      }
      aria-label={
        isFit
          ? 'Switch to 100% full scale scrollable view'
          : 'Switch to fit-to-screen view'
      }
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-2.5 py-1 text-[11px] font-medium text-stone-200 shadow-xl backdrop-blur-md transition-all hover:bg-black/90 active:scale-95',
        className,
      )}
    >
      {isFit ? (
        <>
          <Maximize2 className="h-3 w-3 text-[#CF7056]" />
          <span>Fit ({Math.round(scale * 100)}%)</span>
        </>
      ) : (
        <>
          <Minimize2 className="h-3 w-3 text-amber-400" />
          <span>1:1 Scroll</span>
        </>
      )}
    </button>
  )
}
