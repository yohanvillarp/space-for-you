import type { SpatialItemType } from '@/features/create-space/model/spatial-stage.types'

/**
 * Dedicated visual thumbnail renderer that accurately represents each physical keepsake
 */
export function TangibleSpecimenPreview({ type }: { type: SpatialItemType }) {
  switch (type) {
    case 'candle':
      return (
        <div className="relative flex scale-90 flex-col items-center justify-center select-none">
          <div className="h-3.5 w-2 animate-pulse rounded-full bg-gradient-to-t from-amber-400 to-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
          <div className="h-5 w-2.5 rounded-t-xs bg-gradient-to-b from-amber-100 to-amber-300 shadow-xs" />
          <div className="mt-0.5 h-1.5 w-8 rounded-full border border-stone-500/40 bg-stone-600 shadow-xs" />
        </div>
      )

    case 'greeting-card':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="absolute -top-1.5 left-1/2 z-10 h-1.5 w-5 -translate-x-1/2 rotate-1 rounded-xs border-t border-b border-amber-300/40 bg-amber-400/50" />
          <div className="flex h-10 w-13 flex-col justify-between rounded-md border border-amber-500/30 bg-[#FAF7F0] p-1 shadow-xs">
            <div className="h-1 w-6 rounded bg-amber-700/40" />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full rounded bg-stone-300" />
              <div className="h-0.5 w-4/5 rounded bg-stone-300" />
            </div>
          </div>
        </div>
      )

    case 'confetti-stars':
      return (
        <div className="flex items-center justify-center gap-1.5 text-amber-300 select-none">
          <span className="animate-pulse text-xs">✦</span>
          <span className="text-base text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]">
            ✧
          </span>
          <span className="text-xs text-amber-200">✦</span>
        </div>
      )

    case 'wax-envelope':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="absolute -top-1.5 right-1 z-10 h-1.5 w-4 -rotate-3 rounded-xs border-t border-b border-rose-300/40 bg-rose-400/40" />
          <div className="relative flex h-10 w-14 items-center justify-center overflow-hidden rounded-md border border-[#3B302A] bg-[#221B17] p-1 shadow-xs">
            <div className="absolute inset-0 border-b border-[#3B302A] bg-[#2A221E] [clip-path:polygon(0_0,50%_50%,100%_0)]" />
            <div className="relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-rose-400/40 bg-[#A34835] shadow-xs">
              <span className="text-[6px] text-rose-200">♥</span>
            </div>
          </div>
        </div>
      )

    case 'vinyl-player':
      return (
        <div className="relative flex items-center justify-center select-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 bg-stone-900 shadow-md [background:radial-gradient(circle,#1c1917_30%,#292524_55%,#1c1917_70%,#0c0a09_100%)]">
            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-amber-400/30 bg-[#A34835]">
              <div className="h-1 w-1 rounded-full bg-stone-900" />
            </div>
          </div>
        </div>
      )

    case 'rose-petals':
      return (
        <div className="flex items-center justify-center gap-1 text-rose-500/80 select-none">
          <span className="rotate-12 text-sm drop-shadow-xs">❧</span>
          <span className="-rotate-45 text-base text-rose-600/90 drop-shadow-xs">
            ❧
          </span>
          <span className="rotate-30 text-xs text-rose-400/80 drop-shadow-xs">
            ❧
          </span>
        </div>
      )

    case 'airmail-postcard':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="relative flex h-10 w-14 flex-col justify-between overflow-hidden rounded-xs border border-stone-400 bg-[#FAF6EE] p-1 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-0.5">
              <div className="h-1 w-5 rounded-xs bg-teal-700/40" />
              <div className="flex h-2 w-2 items-center justify-center rounded-xs border border-red-500/40 bg-red-100 text-[5px] text-red-600">
                ✉
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="h-0.5 w-full rounded-full bg-stone-300" />
              <div className="h-0.5 w-3/4 rounded-full bg-stone-300" />
            </div>
          </div>
        </div>
      )

    case 'cassette-tape':
      return (
        <div className="relative flex items-center justify-center select-none">
          <div className="flex h-9 w-14 flex-col justify-between rounded-md border border-stone-600 bg-stone-800 p-1 shadow-xs">
            <div className="flex h-1.5 w-full gap-0.5">
              <span className="h-full flex-1 rounded-xs bg-rose-500/80" />
              <span className="h-full flex-1 rounded-xs bg-amber-500/80" />
              <span className="h-full flex-1 rounded-xs bg-teal-600/80" />
            </div>
            <div className="flex h-4 items-center justify-around rounded-xs border border-stone-700 bg-stone-900 px-1">
              <div className="h-2 w-2 rounded-full border border-stone-500 bg-stone-200" />
              <div className="h-1 w-3 rounded bg-amber-950" />
              <div className="h-2 w-2 rounded-full border border-stone-500 bg-stone-200" />
            </div>
          </div>
        </div>
      )

    case 'music-box':
      return (
        <div className="relative flex items-center justify-center select-none">
          <div className="relative flex h-10 w-13 items-center justify-between rounded-md border border-amber-500/40 bg-gradient-to-b from-[#2A1D15] via-[#1E140E] to-[#150E0A] p-1 shadow-md">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-amber-400/40 bg-[#120B07] shadow-inner">
              <span className="text-[10px]">🎂</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="h-3 w-3 rounded-full border border-amber-300 bg-amber-400 shadow-xs" />
              <div className="h-1 w-0.5 bg-amber-600" />
            </div>
          </div>
        </div>
      )

    case 'polaroid':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="absolute -top-1 left-1/2 z-10 h-1.5 w-4 -translate-x-1/2 -rotate-2 rounded-xs border-t border-b border-amber-300/40 bg-amber-400/50" />
          <div className="flex h-12 w-10 flex-col rounded-sm border border-stone-300 bg-stone-100 p-0.5 shadow-md">
            <div className="flex h-8 w-full items-center justify-center rounded-xs bg-stone-800 text-[8px] text-stone-400">
              📷
            </div>
            <div className="mt-auto h-1 w-3/4 self-center rounded-full bg-stone-300" />
          </div>
        </div>
      )

    case 'sticky-note':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="relative flex h-11 w-11 flex-col justify-between rounded-xs border border-amber-300/50 bg-[#FEF9C3] p-1 shadow-xs">
            <div className="h-1 w-1 self-center rounded-full bg-amber-600" />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full rounded-full bg-amber-300/80" />
              <div className="h-0.5 w-4/5 rounded-full bg-amber-300/80" />
            </div>
          </div>
        </div>
      )

    case 'washi-tape':
      return (
        <div className="relative flex items-center justify-center select-none">
          <div className="h-3 w-12 -rotate-6 rounded-xs border-t border-b border-amber-300/50 bg-gradient-to-r from-amber-400/60 via-amber-300/50 to-amber-400/60 shadow-xs" />
        </div>
      )

    default:
      return (
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-700 bg-stone-800 text-stone-400">
          ✨
        </div>
      )
  }
}
