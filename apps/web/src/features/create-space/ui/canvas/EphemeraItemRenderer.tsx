import type { SpatialItem } from '../../model/spatial-stage.types'
import { WashiTape } from '@/features/space-themes/shared'
import { playSpatialSfx } from '@/shared/lib'

export interface EphemeraItemRendererProps {
  item: SpatialItem
}

export function EphemeraItemRenderer({ item }: EphemeraItemRendererProps) {
  switch (item.type) {
    case 'rose-petals':
      return (
        <div
          onClick={(e) => {
            e.stopPropagation()
            playSpatialSfx('petal-rustle')
          }}
          className="flex cursor-pointer items-center gap-2 p-2 transition-transform select-none hover:scale-110 active:scale-95"
          title="Click to flutter rose petals"
        >
          <span className="rotate-12 text-xl text-rose-500/70 drop-shadow-xs">
            ❧
          </span>
          <span className="-rotate-45 text-sm text-rose-600/60 drop-shadow-xs">
            ❧
          </span>
          <span className="rotate-30 text-base text-rose-400/70 drop-shadow-xs">
            ❧
          </span>
        </div>
      )

    case 'washi-tape':
      return (
        <div
          onClick={(e) => {
            e.stopPropagation()
            playSpatialSfx('paper-rustle')
          }}
          className="cursor-pointer p-1 transition-transform hover:scale-105 active:scale-95"
          title="Click washi tape"
        >
          <WashiTape color={item.data.tapeColor || 'gold'} tilt="straight" />
        </div>
      )

    case 'confetti-stars':
      return (
        <div
          onClick={(e) => {
            e.stopPropagation()
            playSpatialSfx('sparkle-chime')
          }}
          className="flex cursor-pointer items-center gap-3 p-2 transition-transform select-none hover:scale-110 active:scale-95"
          title="Click to chime starlight"
        >
          <span className="animate-pulse text-sm text-amber-300 drop-shadow-xs">
            ✦
          </span>
          <span className="text-lg text-amber-400 drop-shadow-xs">✧</span>
          <span className="animate-pulse text-xs text-amber-200 drop-shadow-xs">
            ✦
          </span>
        </div>
      )

    case 'vector-sticker':
      return item.data.svgUrl ? (
        <div
          onClick={(e) => {
            e.stopPropagation()
            playSpatialSfx('pop-snap')
          }}
          className="group/sticker relative cursor-pointer p-2 transition-transform select-none hover:scale-110 active:scale-90"
          title="Click to pop sticker"
        >
          <img
            src={item.data.svgUrl}
            alt={item.data.stickerName || 'Vector Sticker'}
            className="pointer-events-none h-20 w-20 drop-shadow-lg transition-transform select-none hover:scale-105"
            loading="lazy"
            crossOrigin="anonymous"
          />
        </div>
      ) : null

    default:
      return null
  }
}
