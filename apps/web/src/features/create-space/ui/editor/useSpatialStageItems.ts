import { useState } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import type {
  SpatialItem,
  SpatialItemType,
  SpatialItemData,
} from '../../model/spatial-stage.types'
import {
  getDefaultItemsForTemplate,
  TOOLBOX_ITEMS,
} from '../../lib/spatial-stage-defaults'
import { getNextItemLabel } from '../../lib/stage-item-naming'

export function useSpatialStageItems(templateId: SpaceTemplateId) {
  const [items, setItems] = useState<SpatialItem[]>(() =>
    getDefaultItemsForTemplate(templateId),
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [copiedItem, setCopiedItem] = useState<SpatialItem | null>(null)

  const handleUpdatePosition = (id: string, x: number, y: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id || item.isLocked) return item
        return { ...item, x, y }
      }),
    )
  }

  const handleRotateItem = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id || item.isLocked) return item
        const nextRotation = Math.max(-30, Math.min(30, item.rotation + delta))
        return { ...item, rotation: nextRotation }
      }),
    )
  }

  const handleResetRotation = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rotation: 0 } : item)),
    )
  }

  const handleBringToFront = (id: string) => {
    setItems((prev) => {
      const maxZ = prev.reduce((max, it) => Math.max(max, it.zIndex), 0)
      return prev.map((item) =>
        item.id === id ? { ...item, zIndex: maxZ + 1 } : item,
      )
    })
  }

  const handleSendToBack = (id: string) => {
    setItems((prev) => {
      const minZ = prev.reduce((min, it) => Math.min(min, it.zIndex), 10)
      return prev.map((item) =>
        item.id === id ? { ...item, zIndex: Math.max(1, minZ - 1) } : item,
      )
    })
  }

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const handleToggleLock = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLocked: !item.isLocked } : item,
      ),
    )
  }

  const handleUpdateItemData = (
    id: string,
    updates: Partial<SpatialItemData>,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, data: { ...item.data, ...updates } } : item,
      ),
    )
  }

  const handleAddItem = (
    type: SpatialItemType,
    dropX?: number,
    dropY?: number,
    customData?: Partial<SpatialItemData>,
  ) => {
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
      data: {
        ...(itemDef?.defaultData || {}),
        ...(customData || {}),
      },
    }

    setItems((prev) => [...prev, newItem])
    setSelectedId(newId)
  }

  const handleDuplicateItem = (id: string) => {
    const target = items.find((it) => it.id === id)
    if (!target) return

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

    setItems((prev) => [...prev, clone])
    setSelectedId(newId)
  }

  const handleCopyItem = (item: SpatialItem) => {
    setCopiedItem(item)
  }

  const handlePasteItem = (x?: number, y?: number) => {
    if (!copiedItem) return
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

    setItems((prev) => [...prev, newItem])
    setSelectedId(newId)
  }

  const handleResetToDefaults = () => {
    setItems(getDefaultItemsForTemplate(templateId))
    setSelectedId(null)
  }

  const handleClearCanvas = () => {
    setItems([])
    setSelectedId(null)
  }

  return {
    items,
    setItems,
    selectedId,
    setSelectedId,
    copiedItem,
    handleUpdatePosition,
    handleRotateItem,
    handleResetRotation,
    handleBringToFront,
    handleSendToBack,
    handleDeleteItem,
    handleToggleLock,
    handleUpdateItemData,
    handleAddItem,
    handleDuplicateItem,
    handleCopyItem,
    handlePasteItem,
    handleResetToDefaults,
    handleClearCanvas,
  }
}
