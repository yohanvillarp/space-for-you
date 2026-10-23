import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import type { AudioTrack } from '@/entities/audio'
import type { SpatialItem, SpatialItemType } from '../model/spatial-stage.types'
import {
  getDefaultItemsForTemplate,
  TOOLBOX_ITEMS,
} from '../lib/spatial-stage-defaults'
import { THEME_REGISTRY } from '@/features/space-themes'
import { SpatialStageCanvas } from './SpatialStageCanvas'
import { SpatialToolboxSidebar } from './SpatialToolboxSidebar'
import { EditorTopHeader } from './editor/EditorTopHeader'
import { useSidebarResize } from './editor/useSidebarResize'
import { cn } from '@/shared/lib'

export interface FullscreenSpatialEditorProps {
  templateId: SpaceTemplateId
  className?: string
}

export function FullscreenSpatialEditor({
  templateId,
  className,
}: FullscreenSpatialEditorProps) {
  const [items, setItems] = useState<SpatialItem[]>(() =>
    getDefaultItemsForTemplate(templateId),
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const {
    showSidebar,
    sidebarWidth,
    isResizingSidebar,
    handleResizeStart,
    handleToggleSidebar,
    handleOpenSidebar,
  } = useSidebarResize()

  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday

  const handleUpdatePosition = (id: string, x: number, y: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, x, y } : item)),
    )
  }

  const handleRotateItem = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const newRotation = Math.max(-25, Math.min(25, item.rotation + delta))
        return { ...item, rotation: newRotation }
      }),
    )
  }

  const handleBringToFront = (id: string) => {
    setItems((prev) => {
      const maxZ = prev.reduce((max, it) => Math.max(max, it.zIndex), 10)
      return prev.map((item) =>
        item.id === id ? { ...item, zIndex: maxZ + 1 } : item,
      )
    })
  }

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const handleUpdateItemData = (
    id: string,
    updates: Partial<SpatialItem['data']>,
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
    customData?: Partial<SpatialItem['data']>,
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

  const handleResetToDefaults = () => {
    setItems(getDefaultItemsForTemplate(templateId))
    setSelectedId(null)
  }

  const selectedItem = items.find((it) => it.id === selectedId)
  const isMusicSelected =
    selectedItem?.type === 'music-box' ||
    selectedItem?.type === 'vinyl-player' ||
    selectedItem?.type === 'cassette-tape'
  const selectedMusicItem = isMusicSelected ? selectedItem : null

  const handleAssignTrack = (track: AudioTrack) => {
    const target =
      selectedMusicItem ||
      items.find(
        (it) =>
          it.type === 'music-box' ||
          it.type === 'vinyl-player' ||
          it.type === 'cassette-tape',
      )

    if (target) {
      handleUpdateItemData(target.id, {
        title: track.title,
        artist: track.artist,
        audioUrl: track.url,
        photoUrl: track.albumArt || track.coverUrl,
      })
      setSelectedId(target.id)
    }
  }

  return (
    <div
      className={cn(
        'selection:bg-primary relative flex h-dvh max-h-dvh w-full flex-col overflow-hidden selection:text-white',
        className,
      )}
    >
      <EditorTopHeader
        activeTheme={activeTheme}
        showSidebar={showSidebar}
        onToggleSidebar={handleToggleSidebar}
        itemCount={items.length}
        selectedId={selectedId}
        onDeleteSelected={handleDeleteItem}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Main Fullscreen Workspace Area */}
      <div className="relative flex min-h-0 w-full flex-1 overflow-hidden">
        {!showSidebar && (
          <button
            type="button"
            onClick={handleOpenSidebar}
            className="animate-fade-in group absolute top-4 left-4 z-40 flex cursor-pointer items-center gap-2 rounded-xl border border-[#3B302A] bg-[#14110F]/95 px-3 py-2 font-sans text-xs font-medium text-[#F3EAE1] shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:border-[#CF7056] hover:text-[#CF7056]"
            title="Open Studio Library"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#CF7056] transition-transform group-hover:rotate-90" />
            <span>Studio Library</span>
          </button>
        )}

        {/* Left Side: Resizable Toolbox Sidebar */}
        <div
          style={{ width: `${sidebarWidth}px` }}
          className={cn(
            'relative z-30 flex h-full min-h-0 shrink-0 flex-col border-r border-[#3B302A] bg-[#14110F] shadow-2xl transition-[width] duration-75',
            !showSidebar && 'hidden',
            isResizingSidebar && 'transition-none select-none',
          )}
        >
          <SpatialToolboxSidebar
            templateId={templateId}
            onAddItem={handleAddItem}
            onAssignTrack={handleAssignTrack}
            selectedMusicItem={selectedMusicItem}
            isCompact={sidebarWidth < 280}
            className="h-full w-full"
          />

          {/* Draggable Resizer Handle */}
          <div
            onPointerDown={handleResizeStart}
            role="separator"
            aria-orientation="vertical"
            title="Drag to resize · Drag left to collapse"
            className={cn(
              'group absolute top-0 -right-2 bottom-0 z-50 flex w-4 cursor-col-resize items-center justify-center transition-colors',
              isResizingSidebar && 'bg-[#CF7056]/20',
            )}
          >
            <div
              className={cn(
                'h-8 w-1 rounded-full bg-[#3B302A] transition-all group-hover:h-14 group-hover:w-1.5 group-hover:bg-[#CF7056]',
                isResizingSidebar && 'h-20 w-1.5 bg-[#CF7056]',
              )}
            />
          </div>
        </div>

        {/* Center / Full Canvas: Wide Spatial Stage Canvas */}
        <main className="relative min-h-0 flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <SpatialStageCanvas
            templateId={templateId}
            items={items}
            selectedId={selectedId}
            onSelectItem={setSelectedId}
            onUpdateItemPosition={handleUpdatePosition}
            onRotateItem={handleRotateItem}
            onBringToFront={handleBringToFront}
            onDeleteItem={handleDeleteItem}
            onUpdateItemData={handleUpdateItemData}
            onAddItem={handleAddItem}
            className="min-h-full w-full rounded-2xl"
          />
        </main>
      </div>
    </div>
  )
}
