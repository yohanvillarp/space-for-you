import { Sparkles, CheckCircle2, CloudUpload } from 'lucide-react'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface ShareStatusBannerProps {
  isPublished: boolean
  onOpenPublish?: () => void
  className?: string
}

export function ShareStatusBanner({
  isPublished,
  onOpenPublish,
  className,
}: ShareStatusBannerProps) {
  if (isPublished) {
    return (
      <aside
        aria-label="Sanctuary Status"
        className={cn(
          'flex w-full max-w-xl items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-3 text-emerald-200 backdrop-blur-md transition-all',
          className,
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="font-heading text-xs font-medium text-emerald-100 sm:text-sm">
            Sanctuary is Published & Live
          </p>
          <p className="font-sans text-[11px] text-emerald-300/80">
            Your link and keepsake QR code are active and ready for your
            recipient.
          </p>
        </div>
      </aside>
    )
  }

  return (
    <aside
      aria-label="Draft Sanctuary Notice"
      className={cn(
        'flex w-full max-w-xl flex-col items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-[#1D1612]/90 p-3.5 shadow-lg backdrop-blur-md transition-all sm:flex-row sm:px-4 sm:py-3',
        className,
      )}
    >
      <div className="flex items-center gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="font-heading text-xs font-medium text-amber-100 sm:text-sm">
            Draft Preview Mode
          </p>
          <p className="font-sans text-[11px] text-amber-200/70">
            Publish this sanctuary before printing or sending so your recipient
            can open it.
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
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-500/20 px-3 py-1.5 font-sans text-xs font-medium text-amber-200 transition-all hover:bg-amber-500/30 hover:text-amber-100 active:scale-95"
        >
          <CloudUpload className="h-3.5 w-3.5" />
          <span>Publish Sanctuary</span>
        </button>
      )}
    </aside>
  )
}
