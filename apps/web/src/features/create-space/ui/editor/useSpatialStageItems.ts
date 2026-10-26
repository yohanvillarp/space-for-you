import { useState } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import type {
  SpatialItem,
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'
import {
  getDefaultItemsForTemplate,
  TOOLBOX_ITEMS,
} from '@/features/create-space/lib/spatial-stage-defaults'
import { getNextItemLabel } from '@/features/create-space/lib/stage-item-naming'
import { canAddStagePhoto } from '@/features/create-space/lib/stage-photo-limit'
import { deleteStorageFileByUrl } from '@/features/create-space/lib/stage-photo-upload'
import { useUndoRedoHistory } from '@/features/create-space/ui/editor/useUndoRedoHistory'

const normalizeAngle = (a: number) =>
  Math.round((((((a + 180) % 360) + 360) % 360) - 180) * 10) / 10

/**
 * Custom hook managing interactive spatial items placed on the 2D diorama canvas.
 * Integrated with a 25-step bounded, non-saturating undo/redo history buffer.
 */
export function useSpatialStageItems(
  templateId: SpaceTemplateId,
  initialItems?: SpatialItem[],
) {
  const defaultItems =
    initialItems && initialItems.length > 0
      ? initialItems
      : getDefaultItemsForTemplate(templateId)

  const history = useUndoRedoHistory<SpatialItem[]>(defaultItems, {
    maxHistory: 25,
  })
  const {
    state: items,
    commit,
    updatePresent,
    undo,
    redo,
    canUndo,
    canRedo,
    startTransaction,
    commitTransaction,
  } = history

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [copiedItem, setCopiedItem] = useState<SpatialItem | null>(null)
  const [pendingPhotos, setPendingPhotos] = useState<Map<string, File>>(
    () => new Map(),
  )

  const handleUpdatePosition = (id: string, x: number, y: number) => {
    updatePresent((prev) =>
      prev.map((it) => (it.id === id && !it.isLocked ? { ...it, x, y } : it)),
    )
  }

  const handleSetItemRotation = (id: string, angle: number) => {
    commit((prev) =>
      prev.map((it) =>
        it.id === id && !it.isLocked
          ? { ...it, rotation: normalizeAngle(angle) }
          : it,
      ),
    )
  }

  const handleRotateItem = (id: string, delta: number) => {
    commit((prev) =>
      prev.map((it) =>
        it.id === id && !it.isLocked
          ? { ...it, rotation: normalizeAngle(it.rotation + delta) }
          : it,
      ),
    )
  }

  const handleResetRotation = (id: string) => {
    commit((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rotation: 0 } : item)),
    )
  }

  const handleBringToFront = (id: string) => {
    commit((prev) => {
      const maxZ = prev.reduce((max, it) => Math.max(max, it.zIndex), 0)
      return prev.map((it) => (it.id === id ? { ...it, zIndex: maxZ + 1 } : it))
    })
  }

  const handleSendToBack = (id: string) => {
    commit((prev) => {
      const minZ = prev.reduce((min, it) => Math.min(min, it.zIndex), 10)
      return prev.map((it) =>
        it.id === id ? { ...it, zIndex: Math.max(1, minZ - 1) } : it,
      )
    })
  }

  const handleDeleteItem = (id: string) => {
    const targetItem = items.find((it) => it.id === id)
    if (targetItem?.data?.photoUrl)
      deleteStorageFileByUrl(targetItem.data.photoUrl)
    if (targetItem?.data?.audioUrl)
      deleteStorageFileByUrl(targetItem.data.audioUrl)
    commit((prev) => prev.filter((it) => it.id !== id))
    if (selectedId === id) setSelectedId(null)
    setPendingPhotos((prev) => {
      if (!prev.has(id)) return prev
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }

  const handleToggleLock = (id: string) => {
    commit((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isLocked: !it.isLocked } : it)),
    )
  }

  const handleUpdateItemData = (
    id: string,
    updates: Partial<SpatialItemData>,
  ) => {
    commit((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, data: { ...it.data, ...updates } } : it,
      ),
    )
  }

  const handleAssignItemPhoto = (id: string, photoUrl: string, file?: File) => {
    handleUpdateItemData(id, { photoUrl })
    if (file) setPendingPhotos((prev) => new Map(prev).set(id, file))
  }

  const setPendingPhoto = (targetId: string, file: File) => {
    setPendingPhotos((prev) => new Map(prev).set(targetId, file))
  }

  const clearPendingPhotos = () => setPendingPhotos(new Map())

  const handleAddItem = (
    type: SpatialItemType,
    dropX?: number,
    dropY?: number,
    customData?: Partial<SpatialItemData>,
  ) => {
    if (type === 'polaroid' && !canAddStagePhoto(items)) return

    const itemDef = TOOLBOX_ITEMS.find((it) => it.type === type)
    const newId = `${type}-${Date.now()}`
    const maxZ = items.reduce((max, it) => Math.max(max, it.zIndex), 10)
    const defaultX = dropX ?? Math.round(35 + Math.random() * 30)
    const defaultY = dropY ?? Math.round(40 + Math.random() * 25)
    const randomTilt = Math.round((Math.random() * 8 - 4) * 10) / 10

    const newItem: SpatialItem = {
      id: newId,
      type,
      label: itemDef?.label || 'Keepsake Item',
      x: defaultX,
      y: defaultY,
      rotation: randomTilt,
      zIndex: maxZ + 1,
      data: { ...(itemDef?.defaultData || {}), ...(customData || {}) },
    }

    commit((prev) => [...prev, newItem])
    setSelectedId(newId)
  }

  const handleDuplicateItem = (id: string) => {
    const target = items.find((it) => it.id === id)
    if (!target) return
    if (target.type === 'polaroid' && !canAddStagePhoto(items)) return

    const newId = `${target.type}-${Date.now()}`
    const maxZ = items.reduce((max, it) => Math.max(max, it.zIndex), 10)
    const nextLabel = getNextItemLabel(target.label, items)
    const clone: SpatialItem = {
      ...target,
      id: newId,
      label: nextLabel,
      x: Math.min(90, target.x + 3),
      y: Math.min(90, target.y + 3),
      zIndex: maxZ + 1,
      data: JSON.parse(JSON.stringify(target.data)),
    }

    commit((prev) => [...prev, clone])
    setSelectedId(newId)
  }

  const handlePasteItem = (x?: number, y?: number) => {
    if (!copiedItem) return
    if (copiedItem.type === 'polaroid' && !canAddStagePhoto(items)) return

    const newId = `${copiedItem.type}-${Date.now()}`
    const maxZ = items.reduce((max, it) => Math.max(max, it.zIndex), 10)
    const pasteX = x ?? Math.min(90, copiedItem.x + 4)
    const pasteY = y ?? Math.min(90, copiedItem.y + 4)
    const nextLabel = getNextItemLabel(copiedItem.label, items)

    const newItem: SpatialItem = {
      ...copiedItem,
      id: newId,
      label: nextLabel,
      x: pasteX,
      y: pasteY,
      zIndex: maxZ + 1,
      data: JSON.parse(JSON.stringify(copiedItem.data)),
    }

    commit((prev) => [...prev, newItem])
    setSelectedId(newId)
  }

  return {
    items,
    setItems: commit,
    selectedId,
    setSelectedId,
    copiedItem,
    pendingPhotos,
    setPendingPhoto,
    clearPendingPhotos,
    canUndo,
    canRedo,
    handleUndo: undo,
    handleRedo: redo,
    handleStartDragItem: startTransaction,
    handleCommitItemPosition: commitTransaction,
    handleUpdatePosition,
    handleRotateItem,
    handleSetItemRotation,
    handleResetRotation,
    handleBringToFront,
    handleSendToBack,
    handleDeleteItem,
    handleToggleLock,
    handleUpdateItemData,
    handleAssignItemPhoto,
    handleAddItem,
    handleDuplicateItem,
    handleCopyItem: (item: SpatialItem) => setCopiedItem(item),
    handlePasteItem,
    handleResetToDefaults: () => {
      commit(getDefaultItemsForTemplate(templateId))
      setSelectedId(null)
    },
    handleClearCanvas: () => {
      commit([])
      setSelectedId(null)
    },
  }
}
