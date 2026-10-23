import { useRef, useState, useCallback, useEffect } from 'react'
import type { DragEvent, PointerEvent as ReactPointerEvent } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import type {
  SpatialItem,
  SpatialItemType,
  ToolboxItemDef,
} from '../model/spatial-stage.types'
import { SpatialCanvasItem } from './SpatialCanvasItem'
import { cn } from '@/shared/lib'
import '@/features/space-themes/birthday/birthday.css'
import '@/features/space-themes/romantic/romantic.css'
import '@/features/space-themes/friendship/friendship.css'

export interface SpatialStageCanvasProps {
  templateId: SpaceTemplateId
  items: SpatialItem[]
  selectedId: string | null
  onSelectItem: (id: string | null) => void
  onUpdateItemPosition: (id: string, x: number, y: number) => void
  onRotateItem: (id: string, delta: number) => void
  onBringToFront: (id: string) => void
  onDeleteItem: (id: string) => void
  onUpdateItemData: (id: string, updates: Partial<SpatialItem['data']>) => void
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    customData?: Partial<SpatialItem['data']>,
  ) => void
  className?: string
}

export function SpatialStageCanvas({
  templateId,
  items,
  selectedId,
  onSelectItem,
  onUpdateItemPosition,
  onRotateItem,
  onBringToFront,
  onDeleteItem,
  onUpdateItemData,
  onAddItem,
  className,
}: SpatialStageCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  // Dragging state tracking
  const activeDragRef = useRef<{
    id: string
    startX: number
    startY: number
    itemStartX: number
    itemStartY: number
  } | null>(null)

  // Start dragging an existing item on canvas
  const handleStartDrag = useCallback(
    (id: string, e: ReactPointerEvent) => {
      const item = items.find((it) => it.id === id)
      if (!item || !containerRef.current) return

      setDraggingId(id)
      activeDragRef.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        itemStartX: item.x,
        itemStartY: item.y,
      }
    },
    [items],
  )

  // Global pointer move listener during active drag
  useEffect(() => {
    const handlePointerMove = (e: globalThis.PointerEvent) => {
      if (!activeDragRef.current || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const deltaXPixels = e.clientX - activeDragRef.current.startX
      const deltaYPixels = e.clientY - activeDragRef.current.startY

      const deltaXPercent = (deltaXPixels / rect.width) * 100
      const deltaYPercent = (deltaYPixels / rect.height) * 100

      const rawNewX = activeDragRef.current.itemStartX + deltaXPercent
      const rawNewY = activeDragRef.current.itemStartY + deltaYPercent

      // Clamp coordinates to safe boundaries inside the stage
      const clampedX = Math.max(10, Math.min(90, Math.round(rawNewX * 10) / 10))
      const clampedY = Math.max(12, Math.min(88, Math.round(rawNewY * 10) / 10))

      onUpdateItemPosition(activeDragRef.current.id, clampedX, clampedY)
    }

    const handlePointerUp = () => {
      if (activeDragRef.current) {
        activeDragRef.current = null
        setDraggingId(null)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [onUpdateItemPosition])

  // Keyboard shortcuts: Delete / Backspace removes selected element, Escape deselects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = document.activeElement as HTMLElement | null
      const tagName = target?.tagName.toLowerCase()
      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        target?.isContentEditable
      ) {
        return
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        e.preventDefault()
        onDeleteItem(selectedId)
      } else if (e.key === 'Escape' && selectedId) {
        e.preventDefault()
        onSelectItem(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedId, onDeleteItem, onSelectItem])

  // HTML5 Drag and Drop from Sidebar Toolbox onto Canvas
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    if (!isDragOver) setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    // Only clear if leaving the main stage container
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    try {
      const dataStr = e.dataTransfer.getData('application/json')
      if (!dataStr || !containerRef.current) return

      const parsed = JSON.parse(dataStr) as ToolboxItemDef
      const rect = containerRef.current.getBoundingClientRect()

      const dropX = Math.max(
        10,
        Math.min(90, ((e.clientX - rect.left) / rect.width) * 100),
      )
      const dropY = Math.max(
        12,
        Math.min(88, ((e.clientY - rect.top) / rect.height) * 100),
      )

      onAddItem(
        parsed.type,
        Math.round(dropX),
        Math.round(dropY),
        parsed.defaultData,
      )
    } catch {
      // Fallback
    }
  }

  // Theme-specific surface styles
  const getSurfaceClass = () => {
    switch (templateId) {
      case 'birthday':
        return 'celebration-table-surface'
      case 'anniversary':
        return 'romantic-desk-surface'
      case 'friendship':
        return 'corkboard-surface'
      default:
        return 'celebration-table-surface'
    }
  }

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => onSelectItem(null)}
      className={cn(
        'relative min-h-[580px] w-full overflow-hidden rounded-3xl border border-black/15 shadow-2xl transition-all sm:min-h-[640px] dark:border-white/10',
        getSurfaceClass(),
        isDragOver && 'ring-primary/70 ring-4 ring-inset',
        className,
      )}
    >
      {/* Visual Drop Overlay Cue */}
      {isDragOver && (
        <div className="bg-primary/10 animate-fade-in pointer-events-none absolute inset-0 z-40 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-bg-surface/90 text-primary border-primary/30 font-heading rounded-2xl border px-6 py-3 text-sm font-medium shadow-xl">
            Drop element here to place on stage
          </div>
        </div>
      )}

      {/* Atmospheric Theme-Specific Background Accents */}
      {templateId === 'birthday' && (
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute top-8 left-12 animate-pulse text-sm text-amber-400 opacity-60">
            ✦
          </span>
          <span className="absolute top-20 right-20 text-base text-amber-300 opacity-70">
            ✧
          </span>
          <span className="absolute bottom-12 left-1/3 animate-pulse text-xs text-amber-500 opacity-50">
            ✦
          </span>
          <span className="absolute top-1/2 right-12 text-sm text-amber-200 opacity-60">
            ✧
          </span>
        </div>
      )}

      {templateId === 'anniversary' && (
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute top-10 right-16 rotate-45 text-base text-rose-500/35">
            ❧
          </span>
          <span className="absolute top-32 left-12 -rotate-12 text-xs text-rose-400/30">
            ❧
          </span>
          <span className="absolute bottom-16 left-24 rotate-90 text-sm text-rose-600/30">
            ❧
          </span>
          <span className="absolute right-28 bottom-12 rotate-30 text-xs text-rose-500/25">
            ❧
          </span>
        </div>
      )}

      {/* Render All Draggable Items on the Stage */}
      {items.map((item) => (
        <SpatialCanvasItem
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          isDragging={draggingId === item.id}
          onSelect={onSelectItem}
          onStartDrag={handleStartDrag}
          onRotate={onRotateItem}
          onBringToFront={onBringToFront}
          onDelete={onDeleteItem}
          onUpdateData={onUpdateItemData}
        />
      ))}

      {/* Empty State / Quick Help Cue if no items exist */}
      {items.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-bg-surface/85 border-border-base max-w-sm rounded-2xl border p-6 shadow-xl backdrop-blur-md">
            <span className="text-3xl select-none">✨</span>
            <h4 className="font-heading text-text-primary mt-2 text-base font-medium">
              Your Stage is Empty
            </h4>
            <p className="text-text-secondary mt-1 font-sans text-xs">
              Drag elements from the sidebar or click &ldquo;Add to Stage&rdquo;
              to begin crafting your sanctuary.
            </p>
          </div>
        </div>
      )}

      {/* Subtle bottom canvas note */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-center font-sans text-[10px] text-stone-400/80 drop-shadow-xs select-none">
        Click or drag elements to arrange • Drag from toolbox to add
      </div>
    </div>
  )
}
