import type { HTMLAttributes } from 'react'
import { Logomark } from '@/shared/ui/logo'
import { cn } from '@/shared/lib'

export interface SanctuaryGridLoaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional custom title header */
  label?: string
  /** Optional subtitle hint */
  hint?: string
  /** Count of skeleton cards to render (default: 3) */
  cardCount?: number
  /** Whether to show the branded header banner */
  showHeader?: boolean
}

function SanctuaryCardSkeleton({ index }: { index: number }) {
  // Staggered animation delay for natural organic rhythm
  const delayStyle = { animationDelay: `${index * 150}ms` }

  return (
    <article
      style={delayStyle}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#161210]/80 p-5 shadow-lg backdrop-blur-sm"
    >
      {/* Ambient Pulsing Background Glow */}
      <div
        className={cn(
          'pointer-events-none absolute -top-12 -right-12 h-32 w-32 animate-pulse rounded-full blur-2xl transition-opacity',
          index === 0 && 'bg-amber-500/10',
          index === 1 && 'bg-rose-500/10',
          index === 2 && 'bg-teal-500/10',
        )}
      />

      {/* Shimmer Light Sweep Effect */}
      <div className="animate-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Top Header: Status Pill & Action button */}
      <div className="flex items-center justify-between pb-3">
        <div className="h-5 w-24 animate-pulse rounded-full bg-stone-800/80" />
        <div className="h-7 w-7 rounded-full bg-stone-800/50" />
      </div>

      {/* Title & Recipient Placeholder */}
      <div className="my-2 space-y-2">
        <div className="h-6 w-3/4 animate-pulse rounded-md bg-stone-700/60" />
        <div className="h-4 w-1/2 animate-pulse rounded-md bg-stone-800/70" />
      </div>

      {/* Metric Tags Placeholder */}
      <div className="my-3 flex items-center gap-2">
        <div className="h-5 w-16 animate-pulse rounded-full bg-stone-800/60" />
        <div className="h-5 w-20 animate-pulse rounded-full bg-stone-800/60" />
        <div className="h-5 w-14 animate-pulse rounded-full bg-stone-800/60" />
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-stone-800/60 pt-3">
        <div className="h-8 w-28 animate-pulse rounded-lg bg-stone-800/80" />
        <div className="h-8 w-20 animate-pulse rounded-lg bg-stone-800/50" />
      </div>
    </article>
  )
}

export function SanctuaryGridLoader({
  label = 'Gathering your sanctuaries...',
  hint = 'Fetching memories, handwritten letters, and keepsakes from the cloud.',
  cardCount = 3,
  showHeader = true,
  className,
  ...props
}: SanctuaryGridLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('animate-fade-in w-full space-y-8 select-none', className)}
      {...props}
    >
      {/* Branded Editorial Header Banner */}
      {showHeader && (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="relative mb-4 flex items-center justify-center">
            {/* Breathing Warm Glow Aura */}
            <div className="absolute -inset-3 animate-pulse rounded-full bg-[#CF7056]/20 blur-xl" />
            <div className="absolute -inset-1 rounded-full bg-amber-500/15 blur-md" />

            {/* Emblem Logomark Badge */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#CF7056]/30 bg-gradient-to-br from-[#2A1E18] to-[#18110D] shadow-xl">
              <Logomark className="h-7 w-7 text-amber-200" />
            </div>

            {/* Orbiting Starlight Sparkles */}
            <span className="absolute -top-1 -right-2 animate-bounce text-xs text-amber-300">
              ✦
            </span>
            <span
              className="absolute -bottom-1 -left-2 animate-pulse text-[10px] text-rose-300"
              style={{ animationDuration: '2s' }}
            >
              ✧
            </span>
          </div>

          <div className="max-w-md space-y-1.5">
            <h3 className="font-heading text-text-primary text-lg font-medium tracking-tight sm:text-xl">
              {label}
            </h3>
            <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
              {hint}
            </p>
          </div>
        </div>
      )}

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(cardCount)].map((_, i) => (
          <SanctuaryCardSkeleton key={i} index={i} />
        ))}
      </div>
    </div>
  )
}
