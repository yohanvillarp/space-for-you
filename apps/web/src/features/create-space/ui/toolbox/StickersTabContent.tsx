import type { DragEvent } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import type {
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'

export interface StickerItem {
  id: string
  name: string
}

export interface StickersTabContentProps {
  stickers: StickerItem[]
  isLoading: boolean
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    defaultData?: Partial<SpatialItemData>,
  ) => void
  onDragStart: (e: DragEvent<HTMLDivElement>, sticker: StickerItem) => void
  getIconSvgUrl: (iconKey: string) => string
}

export function StickersTabContent({
  stickers,
  isLoading,
  onAddItem,
  onDragStart,
  getIconSvgUrl,
}: StickersTabContentProps) {
  if (isLoading) {
    return (
      <div className="flex h-44 flex-col items-center justify-center space-y-2 text-center font-sans text-xs text-[#A99B90]">
        <Loader2 className="h-4 w-4 animate-spin text-[#CF7056]" />
        <span className="text-[11px]">Searching SVG vectors...</span>
      </div>
    )
  }

  if (stickers.length === 0) {
    return (
      <div className="flex h-44 flex-col items-center justify-center p-4 text-center font-sans text-xs text-[#A99B90]">
        <p className="text-xs font-medium text-[#F3EAE1]">No vectors found</p>
        <p className="mt-0.5 text-[10px]">
          Try searching &ldquo;party&rdquo;, &ldquo;heart&rdquo;, or
          &ldquo;star&rdquo;
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(68px,1fr))] gap-1.5">
      {stickers.map((sticker) => {
        const svgUrl = getIconSvgUrl(sticker.id)

        return (
          <div
            key={sticker.id}
            draggable
            onDragStart={(e) => onDragStart(e, sticker)}
            onClick={() =>
              onAddItem('vector-sticker', undefined, undefined, {
                svgUrl,
                stickerName: sticker.name,
                title: sticker.name,
              })
            }
            title={`${sticker.name} • Click to add or drag to place`}
            className="group relative flex aspect-square cursor-grab flex-col items-center justify-center rounded-xl border border-[#3B302A] bg-[#211B18] p-1.5 transition-all duration-200 hover:scale-103 hover:border-[#CF7056]/60 hover:bg-[#2A221E] active:cursor-grabbing"
          >
            {/* Scalable SVG Preview */}
            <img
              src={svgUrl}
              alt={sticker.name}
              loading="lazy"
              className="pointer-events-none h-8 w-8 drop-shadow-xs transition-transform duration-200 group-hover:scale-110"
            />

            {/* Name below preview */}
            <span className="mt-1 line-clamp-1 text-center font-sans text-[9px] text-[#A99B90] group-hover:text-[#F3EAE1]">
              {sticker.name}
            </span>

            {/* Minimal hover indicator */}
            <div className="pointer-events-none absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded bg-[#14110F]/80 text-[#CF7056] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              <Plus className="h-2.5 w-2.5" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
