import type { ReactNode } from 'react'
import type { SpatialItemType } from '@/features/create-space/model/spatial-stage.types'

/**
 * Visual thumbnail previews for sensory & tangible keepsakes in the toolbox drawer.
 */
export function renderSensorySpecimenPreview(
  type: SpatialItemType,
): ReactNode | null {
  switch (type) {
    case 'firefly-jar':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          {/* Cork Stopper */}
          <div className="h-1.5 w-4 rounded-t-xs border border-amber-900/40 bg-[#8C5D35]" />
          {/* Jar Body */}
          <div className="relative flex h-10 w-9 items-center justify-center overflow-hidden rounded-md border border-white/30 bg-white/10 shadow-xs">
            <span className="animate-pulse text-[10px] text-amber-300">✧</span>
            <span className="absolute top-1 right-1 text-[8px] text-amber-200">
              ✦
            </span>
          </div>
        </div>
      )

    case 'mini-dictaphone':
      return (
        <div className="relative flex items-center justify-center select-none">
          <div className="flex h-11 w-9 flex-col justify-between rounded-md border border-stone-600 bg-stone-200 p-0.5 shadow-xs dark:bg-stone-800">
            <div className="flex justify-between px-0.5">
              <div className="h-1 w-2 rounded-xs bg-stone-400" />
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
            </div>
            <div className="flex h-5 w-full items-center justify-around rounded-xs border border-stone-500 bg-stone-900 px-0.5">
              <div className="h-2.5 w-2.5 rounded-full border border-stone-400 bg-stone-300" />
              <div className="h-2.5 w-2.5 rounded-full border border-stone-400 bg-stone-300" />
            </div>
            <div className="rounded-2xs h-1 w-full bg-stone-400" />
          </div>
        </div>
      )

    case 'pressed-herbarium':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="h-1.5 w-1.5 rounded-full border border-amber-600 bg-transparent" />
          <div className="flex h-11 w-9 flex-col items-center justify-between rounded-xs border-2 border-[#8B5A2B] bg-white/10 p-0.5 shadow-xs">
            <span className="text-xs text-purple-400">🪻</span>
            <div className="h-0.5 w-full bg-amber-50/60" />
          </div>
        </div>
      )

    case 'wood-wick-candle':
      return (
        <div className="relative flex scale-90 flex-col items-center justify-center select-none">
          <div className="h-3 w-2 animate-pulse rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          <div className="h-1 w-2 rounded-xs bg-amber-950" />
          <div className="h-6 w-8 rounded-b-md border border-[#5C3A21] bg-gradient-to-b from-[#8C532B] to-[#4A2B14] shadow-xs" />
        </div>
      )

    case 'stardust-hourglass':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="rounded-2xs h-1 w-6 bg-[#664020]" />
          <div className="flex h-9 w-6 flex-col items-center justify-between overflow-hidden rounded-sm border border-white/30 bg-white/10">
            <div className="h-3 w-4 rounded-b-xs bg-amber-400/80" />
            <div className="h-1 w-0.5 bg-amber-300" />
            <div className="h-3 w-4 rounded-t-xs bg-amber-400/80" />
          </div>
          <div className="rounded-2xs h-1 w-6 bg-[#664020]" />
        </div>
      )

    case 'vintage-camera':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="rounded-t-2xs h-1 w-2 self-start bg-stone-400" />
          <div className="flex h-8 w-11 items-center justify-center rounded-sm border border-stone-600 bg-stone-700 p-0.5 shadow-xs">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-400 bg-stone-900">
              <div className="h-2 w-2 rounded-full bg-sky-500/80" />
            </div>
          </div>
        </div>
      )

    case 'keepsake-ticket':
      return (
        <div className="relative flex items-center justify-center select-none">
          <div className="flex h-7 w-13 items-center justify-between rounded-xs border border-[#8C6D4F] bg-[#FAF4E8] px-1 shadow-xs dark:bg-[#2A231C]">
            <div className="flex flex-col">
              <span className="text-[5px] font-bold text-amber-900 dark:text-amber-200">
                PASS
              </span>
              <span className="text-[4px] text-stone-500">PARIS</span>
            </div>
            <div className="h-full border-r border-dashed border-stone-400" />
            <span className="text-[6px] text-rose-500">♥</span>
          </div>
        </div>
      )

    case 'antique-locket':
      return (
        <div className="relative flex flex-col items-center justify-center select-none">
          <div className="h-1.5 w-1 rounded-t-full bg-rose-900" />
          <div className="flex h-9 w-8 items-center justify-center rounded-[50%] border-2 border-amber-400 bg-gradient-to-br from-amber-300 via-amber-600 to-amber-800 shadow-md">
            <span className="text-[8px] text-amber-100">♥</span>
          </div>
        </div>
      )

    default:
      return null
  }
}
