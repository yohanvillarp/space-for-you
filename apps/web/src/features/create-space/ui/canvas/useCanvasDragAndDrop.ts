import { useRef, useState, useCallback, useEffect } from 'react'
import type { DragEvent, PointerEvent as ReactPointerEvent } from 'react'
import type {
  SpatialItem,
  SpatialItemType,
  ToolboxItemDef,
} from '@/features/create-space/model/spatial-stage.types'

export interface UseCanvasDragAndDropProps {
  items: SpatialItem[]
  selectedId: string | null
  onSelectItem: (id: string | null) => void
  onUpdateItemPosition: (id: string, x: number, y: number) => void
  onDeleteItem: (id: string) => void
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    customData?: Partial<SpatialItem['data']>,
  ) => void
}

export function useCanvasDragAndDrop({
  items,
  selectedId,
  onSelectItem,
  onUpdateItemPosition,
  onDeleteItem,
  onAddItem,
}: UseCanvasDragAndDropProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const activeDragRef = useRef<{
    id: string
    startX: number
    startY: number
    itemStartX: number
    itemStartY: number
  } | null>(null)

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

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    if (!isDragOver) setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
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

  return {
    containerRef,
    draggingId,
    isDragOver,
    handleStartDrag,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
