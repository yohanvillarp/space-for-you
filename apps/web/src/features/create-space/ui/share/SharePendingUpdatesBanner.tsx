import { useState } from 'react'
import { CloudUpload, AlertTriangle } from 'lucide-react'
import { playSpatialSfx, cn } from '@/shared/lib'
import {
  getDailyPublishQuota,
  MAX_DAILY_UPDATES,
} from '@/features/create-space/lib/daily-publish-quota'

export interface SharePendingUpdatesBannerProps {
  spaceId?: string
  onOpenPublish?: () => void
  isPublishing?: boolean
  className?: string
}

export function SharePendingUpdatesBanner({
  spaceId,
  onOpenPublish,
  isPublishing = false,
  className,
}: SharePendingUpdatesBannerProps) {
  const [quota] = useState(() => getDailyPublishQuota(spaceId))

  const handleClick = () => {
    if (quota.isLimitReached || isPublishing) return
    playSpatialSfx('tactile-tap')
    onOpenPublish?.()
  }

  const isButtonDisabled = quota.isLimitReached || isPublishing

  return (
    <aside
      aria-label="Unpublished Changes Alert"
      className={cn(
        'animate-fade-in flex w-full max-w-xl flex-col items-center justify-between gap-3 rounded-2xl border p-3.5 shadow-xl backdrop-blur-md transition-all sm:flex-row sm:px-4 sm:py-3',
        quota.isLimitReached
          ? 'border-stone-500/30 bg-[#16120F]/95'
          : 'border-amber-500/40 bg-[#1D1612]/95',
        className,
      )}
    >
      <div className="flex items-center gap-3 text-left">
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
            quota.isLimitReached
              ? 'bg-stone-500/20 text-stone-300'
              : 'bg-amber-500/20 text-amber-300',
          )}
        >
          {quota.isLimitReached ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <CloudUpload className="h-4 w-4" />
          )}
        </div>
        <div>
          <p
            className={cn(
              'font-heading text-xs font-medium sm:text-sm',
              quota.isLimitReached ? 'text-stone-200' : 'text-amber-100',
            )}
          >
            {quota.isLimitReached
              ? 'Daily Update Limit Reached'
              : 'Unpublished Changes'}
          </p>
          <p
            className={cn(
              'font-sans text-[11px]',
              quota.isLimitReached ? 'text-stone-400' : 'text-amber-200/75',
            )}
          >
            {quota.isLimitReached
              ? `You've reached the daily limit of ${MAX_DAILY_UPDATES} updates. Your new edits are saved safely in your browser.`
              : `Your recipient will see the previous version until you publish these updates (${quota.remaining} left today).`}
          </p>
        </div>
      </div>

      {onOpenPublish && (
        <button
          type="button"
          onClick={handleClick}
          disabled={isButtonDisabled}
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-1.5 font-sans text-xs font-medium transition-all',
            isButtonDisabled
              ? 'cursor-not-allowed border-stone-700/50 bg-stone-800/40 text-stone-500 opacity-60'
              : 'cursor-pointer border-amber-400/40 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 hover:text-amber-100 active:scale-95',
          )}
        >
          <CloudUpload className="h-3.5 w-3.5" />
          <span>
            {quota.isLimitReached
              ? `Limit Reached (${MAX_DAILY_UPDATES}/${MAX_DAILY_UPDATES})`
              : 'Publish Updates'}
          </span>
        </button>
      )}
    </aside>
  )
}
