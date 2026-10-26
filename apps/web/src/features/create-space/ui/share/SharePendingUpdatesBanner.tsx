import { CloudUpload } from 'lucide-react'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface SharePendingUpdatesBannerProps {
  onOpenPublish?: () => void
  className?: string
}

export function SharePendingUpdatesBanner({
  onOpenPublish,
  className,
}: SharePendingUpdatesBannerProps) {
  return (
    <aside
      aria-label="Unpublished Changes Alert"
      className={cn(
        'animate-fade-in flex w-full max-w-xl flex-col items-center justify-between gap-3 rounded-2xl border border-amber-500/40 bg-[#1D1612]/95 p-3.5 shadow-xl backdrop-blur-md transition-all sm:flex-row sm:px-4 sm:py-3',
        className,
      )}
    >
      <div className="flex items-center gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
          <CloudUpload className="h-4 w-4" />
        </div>
        <div>
          <p className="font-heading text-xs font-medium text-amber-100 sm:text-sm">
            Unpublished Changes
          </p>
          <p className="font-sans text-[11px] text-amber-200/75">
            Your recipient will view the previously published version until you
            sync these new updates.
          </p>
        </div>
      </div>

      {onOpenPublish && (
        <button
          type="button"
          onClick={() => {
            playSpatialSfx('tactile-tap')
            onOpenPublish()
          }}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-500/20 px-3.5 py-1.5 font-sans text-xs font-medium text-amber-200 transition-all hover:bg-amber-500/30 hover:text-amber-100 active:scale-95"
        >
          <CloudUpload className="h-3.5 w-3.5" />
          <span>Publish Updates</span>
        </button>
      )}
    </aside>
  )
}
