import { SlidersHorizontal } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import type { AudioTrack } from '@/entities/audio'
import { THEME_REGISTRY } from '@/features/space-themes'
import { SpatialStageCanvas } from './SpatialStageCanvas'
import { SpatialToolboxSidebar } from './SpatialToolboxSidebar'
import { EditorTopHeader } from './editor/EditorTopHeader'
import { useSidebarResize } from './editor/useSidebarResize'
import { useSpatialStageItems } from './editor/useSpatialStageItems'
import { useStageKeyboardShortcuts } from './editor/useStageKeyboardShortcuts'
import { countStagePhotos } from '../lib/stage-photo-limit'
import { cn } from '@/shared/lib'

export interface FullscreenSpatialEditorProps {
  templateId: SpaceTemplateId
  className?: string
}

export function FullscreenSpatialEditor({
  templateId,
  className,
}: FullscreenSpatialEditorProps) {
  const {
    items,
    selectedId,
    setSelectedId,
    copiedItem,
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
    handleCopyItem,
    handlePasteItem,
    handleResetToDefaults,
    handleClearCanvas,
  } = useSpatialStageItems(templateId)

  const {
    showSidebar,
    sidebarWidth,
    isResizingSidebar,
    handleResizeStart,
    handleToggleSidebar,
    handleOpenSidebar,
  } = useSidebarResize()

  const selectedItem = items.find((it) => it.id === selectedId)
  const isMusicSelected =
    selectedItem?.type === 'music-box' ||
    selectedItem?.type === 'vinyl-player' ||
    selectedItem?.type === 'cassette-tape'
  const selectedMusicItem = isMusicSelected ? selectedItem : null

  const isPhotoSelected = selectedItem?.type === 'polaroid'
  const selectedPhotoItem = isPhotoSelected ? selectedItem : null

  // Enable global keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+D, Delete, ], [, R)
  useStageKeyboardShortcuts({
    selectedItem: selectedItem ?? null,
    copiedItem,
    onCopyItem: handleCopyItem,
    onPasteItem: handlePasteItem,
    onDuplicateItem: handleDuplicateItem,
    onDeleteItem: handleDeleteItem,
    onBringToFront: handleBringToFront,
    onSendToBack: handleSendToBack,
    onResetRotation: handleResetRotation,
  })

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
    }
  }

  const handleAssignPhoto = (photoUrl: string, file?: File) => {
    const target =
      selectedPhotoItem || items.find((it) => it.type === 'polaroid')

    if (target) {
      handleAssignItemPhoto(target.id, photoUrl, file)
    }
  }

  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday

  return (
    <div
      className={cn(
        'relative flex h-screen w-screen flex-col overflow-hidden bg-[#14110F] text-[#F3EAE1] select-none',
        className,
      )}
    >
      {/* Top Controls Header */}
      <EditorTopHeader
        activeTheme={activeTheme}
        showSidebar={showSidebar}
        onToggleSidebar={handleToggleSidebar}
        itemCount={items.length}
        selectedId={selectedId}
        onDeleteSelected={handleDeleteItem}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Main Workspace: Resizable Sidebar & Full Stage Canvas */}
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {/* Collapsed State Toggle Pill */}
        {!showSidebar && (
          <button
            type="button"
            onClick={handleOpenSidebar}
            title="Open Studio Library"
            className="group absolute top-4 left-4 z-40 flex cursor-pointer items-center gap-2 rounded-xl border border-[#3B302A] bg-[#1A1411]/95 px-3 py-2 font-sans text-xs text-[#F3EAE1] shadow-2xl backdrop-blur-md transition-all hover:border-[#CF7056] hover:bg-[#251E1A]"
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
            selectedPhotoItem={selectedPhotoItem}
            onAssignPhoto={handleAssignPhoto}
            photoCount={countStagePhotos(items)}
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
            copiedItem={copiedItem}
            onSelectItem={setSelectedId}
            onUpdateItemPosition={handleUpdatePosition}
            onRotateItem={handleRotateItem}
            onSetRotation={handleSetItemRotation}
            onResetRotation={handleResetRotation}
            onBringToFront={handleBringToFront}
            onSendToBack={handleSendToBack}
            onDeleteItem={handleDeleteItem}
            onDuplicateItem={handleDuplicateItem}
            onToggleLock={handleToggleLock}
            onCopyItem={handleCopyItem}
            onPasteItem={handlePasteItem}
            onResetToDefaults={handleResetToDefaults}
            onClearCanvas={handleClearCanvas}
            onUpdateItemData={handleUpdateItemData}
            onAddItem={handleAddItem}
            onOpenPhotoPicker={(item) => {
              setSelectedId(item.id)
              handleOpenSidebar()
            }}
            className="min-h-full w-full rounded-2xl"
          />
        </main>
      </div>
    </div>
  )
}
