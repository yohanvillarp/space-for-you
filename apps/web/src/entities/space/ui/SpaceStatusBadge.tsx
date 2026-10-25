import { Globe, CalendarClock, Archive } from 'lucide-react'
import type { SpaceDisplayStatus } from '@/entities/space/model/space-sync-engine'
import { cn } from '@/shared/lib'

export interface SpaceStatusBadgeProps {
  status: SpaceDisplayStatus
  className?: string
}

export function SpaceStatusBadge({ status, className }: SpaceStatusBadgeProps) {
  if (status === 'published') {
    return (
      <span
        title="Publicly accessible to recipient"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 font-sans text-[11px] font-medium text-emerald-300 shadow-xs backdrop-blur-xs',
          className,
        )}
      >
        <Globe className="h-3 w-3 text-emerald-400" />
        <span>Live</span>
      </span>
    )
  }

  if (status === 'scheduled') {
    return (
      <span
        title="Published with scenes unlocking on a future date"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-2.5 py-0.5 font-sans text-[11px] font-medium text-purple-300 shadow-xs backdrop-blur-xs',
          className,
        )}
      >
        <CalendarClock className="h-3 w-3 text-purple-400" />
        <span>Scheduled</span>
      </span>
    )
  }

  if (status === 'archived') {
    return (
      <span
        title="Archived sanctuary kept safe in your records"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border border-stone-700/50 bg-stone-900/60 px-2.5 py-0.5 font-sans text-[11px] font-medium text-stone-400 shadow-xs backdrop-blur-xs',
          className,
        )}
      >
        <Archive className="h-3 w-3 text-stone-400" />
        <span>Archived</span>
      </span>
    )
  }

  // Default: Draft
  return (
    <span
      title="Private editing in progress. Not visible to recipient."
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-sans text-[11px] font-medium text-stone-400 shadow-xs backdrop-blur-xs',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400/80" />
      <span>Draft</span>
    </span>
  )
}
