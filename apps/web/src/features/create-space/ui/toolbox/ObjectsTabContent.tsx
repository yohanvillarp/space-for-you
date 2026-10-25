import type { DragEvent } from 'react'
import { Plus } from 'lucide-react'
import type {
  ToolboxItemDef,
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'
import { TangibleSpecimenPreview } from './TangibleSpecimenPreview'

export interface ObjectsTabContentProps {
  items: ToolboxItemDef[]
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    defaultData?: Partial<SpatialItemData>,
  ) => void
  onDragStart: (e: DragEvent<HTMLDivElement>, item: ToolboxItemDef) => void
}

export function ObjectsTabContent({
  items,
  onAddItem,
  onDragStart,
}: ObjectsTabContentProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center p-4 text-center">
        <span className="text-xl">🔍</span>
        <p className="font-heading mt-1 text-xs text-[#F3EAE1]">
          No elements found
        </p>
        <p className="mt-0.5 font-sans text-[10px] text-[#A99B90]">
          Try clearing your search query.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(115px,1fr))] gap-2">
      {items.map((item) => (
        <div
          key={`${item.type}-${item.category}`}
          draggable
          onDragStart={(e) => onDragStart(e, item)}
          onClick={() =>
            onAddItem(item.type, undefined, undefined, item.defaultData)
          }
          title={`${item.label} • ${item.description}`}
          className="group relative flex cursor-grab flex-col overflow-hidden rounded-xl border border-[#3B302A] bg-[#211B18] transition-all duration-200 hover:border-[#CF7056]/60 hover:bg-[#251F1C] hover:shadow-lg active:cursor-grabbing"
        >
          {/* Dedicated Visual Preview Area */}
          <div className="relative flex h-20 w-full items-center justify-center overflow-hidden border-b border-[#3B302A]/50 bg-[#2A221E] p-2 transition-transform duration-200 group-hover:bg-[#2E2520]">
            <TangibleSpecimenPreview type={item.type} />

            {/* Add Action Indicator */}
            <div className="pointer-events-none absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-md border border-[#3B302A] bg-[#14110F]/80 text-[#CF7056] opacity-0 transition-opacity duration-180 group-hover:opacity-100">
              <Plus className="h-3 w-3 stroke-[2.5]" />
            </div>
          </div>

          {/* Asset Name Label Below Preview */}
          <div className="p-2">
            <p className="truncate text-center font-sans text-[11px] font-medium text-[#F3EAE1]">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
