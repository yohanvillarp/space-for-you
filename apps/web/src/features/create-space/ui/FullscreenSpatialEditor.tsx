import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import type { AudioTrack } from '@/entities/audio'
import { THEME_REGISTRY } from '@/features/space-themes'
import {
  LockGateScene,
  LockGateSidebar,
  DEFAULT_PROTECTION_CONFIG,
} from '@/features/space-lock'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import { SpatialStageCanvas } from './SpatialStageCanvas'
import { SpatialToolboxSidebar } from './SpatialToolboxSidebar'
import { StageBottomDock, type StudioScene } from './dock/StageBottomDock'
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
  const [activeScene, setActiveScene] = useState<StudioScene>('stage')
  const [protectionConfig, setProtectionConfig] =
    useState<SpaceProtectionConfig>(DEFAULT_PROTECTION_CONFIG)

  const stage = useSpatialStageItems(templateId)
  const { items, selectedId, setSelectedId, copiedItem } = stage

  const {
    showSidebar,
    sidebarWidth,
    isResizingSidebar,
    handleResizeStart,
    handleToggleSidebar,
    handleOpenSidebar,
  } = useSidebarResize()

  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday
  const selectedItem = items.find((it) => it.id === selectedId)
  const isMusic = ['music-box', 'vinyl-player', 'cassette-tape'].includes(
    selectedItem?.type || '',
  )
  const selectedMusicItem = isMusic ? selectedItem : null
  const selectedPhotoItem =
    selectedItem?.type === 'polaroid' ? selectedItem : null

  useStageKeyboardShortcuts({
    selectedItem: selectedItem ?? null,
    copiedItem,
    onCopyItem: stage.handleCopyItem,
    onPasteItem: stage.handlePasteItem,
    onDuplicateItem: stage.handleDuplicateItem,
    onDeleteItem: stage.handleDeleteItem,
    onBringToFront: stage.handleBringToFront,
    onSendToBack: stage.handleSendToBack,
    onResetRotation: stage.handleResetRotation,
  })

  const handleAssignTrack = (track: AudioTrack) => {
    const target =
      selectedMusicItem ||
      items.find((it) =>
        ['music-box', 'vinyl-player', 'cassette-tape'].includes(it.type),
      )
    if (target) {
      stage.handleUpdateItemData(target.id, {
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
    if (target) stage.handleAssignItemPhoto(target.id, photoUrl, file)
  }

  return (
    <div
      className={cn(
        'relative flex h-screen w-screen flex-col overflow-hidden bg-[#0F0B09]',
        className,
      )}
    >
      <EditorTopHeader
        activeTheme={activeTheme}
        showSidebar={showSidebar}
        onToggleSidebar={handleToggleSidebar}
        itemCount={items.length}
        selectedId={selectedId}
        onDeleteSelected={stage.handleDeleteItem}
        onResetToDefaults={stage.handleResetToDefaults}
      />

      <div className="relative flex flex-1 overflow-hidden">
        {/* Left Toggle Floating Cue */}
        {!showSidebar && (
          <button
            type="button"
            onClick={handleToggleSidebar}
            title="Open Workshop Sidebar"
            className="group absolute top-6 left-0 z-40 flex cursor-pointer items-center gap-1.5 rounded-r-xl border-t border-r border-b border-[#3B302A] bg-[#16120F]/90 px-2.5 py-2 text-xs font-medium text-[#F3EAE1] shadow-xl backdrop-blur-md transition-all hover:bg-[#1C1613] hover:pl-3.5"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#CF7056] transition-transform group-hover:rotate-90" />
            <span className="hidden font-sans text-[11px] sm:inline">
              {activeScene === 'gate' ? 'Lock Gate' : 'Library'}
            </span>
          </button>
        )}

        {/* Resizable Sidebar */}
        <div
          style={{ width: showSidebar ? `${sidebarWidth}px` : '0px' }}
          className={cn(
            'relative h-full shrink-0 overflow-hidden transition-[width] duration-150 ease-out',
            !showSidebar && 'pointer-events-none invisible border-none',
          )}
        >
          {activeScene === 'gate' ? (
            <LockGateSidebar
              config={protectionConfig}
              onChangeConfig={(updates) =>
                setProtectionConfig((prev) => ({ ...prev, ...updates }))
              }
              isCompact={sidebarWidth < 280}
              className="h-full w-full"
            />
          ) : (
            <SpatialToolboxSidebar
              templateId={templateId}
              onAddItem={stage.handleAddItem}
              onAssignTrack={handleAssignTrack}
              selectedMusicItem={selectedMusicItem}
              selectedPhotoItem={selectedPhotoItem}
              onAssignPhoto={handleAssignPhoto}
              photoCount={countStagePhotos(items)}
              isCompact={sidebarWidth < 280}
              className="h-full w-full"
            />
          )}

          {/* Resizer Handle */}
          <div
            onPointerDown={handleResizeStart}
            role="separator"
            aria-orientation="vertical"
            title="Drag to resize"
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

        {/* Center / Full Canvas: Scene Switcher Dock at Bottom */}
        <main
          className={cn(
            'relative min-h-0 flex-1',
            activeScene === 'stage'
              ? 'overflow-auto p-4 sm:p-6 lg:p-8'
              : 'overflow-hidden p-0',
          )}
        >
          {activeScene === 'gate' ? (
            <div className="relative flex h-full w-full items-center justify-center">
              <LockGateScene
                config={protectionConfig}
                spaceTitle="A Secret Keepsake"
                isStudioPreview={true}
                onChangeConfig={(updates) =>
                  setProtectionConfig((prev) => ({ ...prev, ...updates }))
                }
                onProceedToStage={() => setActiveScene('stage')}
              />
            </div>
          ) : (
            <SpatialStageCanvas
              templateId={templateId}
              items={items}
              selectedId={selectedId}
              copiedItem={copiedItem}
              onSelectItem={setSelectedId}
              onUpdateItemPosition={stage.handleUpdatePosition}
              onRotateItem={stage.handleRotateItem}
              onSetRotation={stage.handleSetItemRotation}
              onResetRotation={stage.handleResetRotation}
              onBringToFront={stage.handleBringToFront}
              onSendToBack={stage.handleSendToBack}
              onDeleteItem={stage.handleDeleteItem}
              onDuplicateItem={stage.handleDuplicateItem}
              onToggleLock={stage.handleToggleLock}
              onCopyItem={stage.handleCopyItem}
              onPasteItem={stage.handlePasteItem}
              onResetToDefaults={stage.handleResetToDefaults}
              onClearCanvas={stage.handleClearCanvas}
              onUpdateItemData={stage.handleUpdateItemData}
              onAddItem={stage.handleAddItem}
              onOpenPhotoPicker={(item) => {
                setSelectedId(item.id)
                handleOpenSidebar()
              }}
              className="min-h-full w-full rounded-2xl"
            />
          )}

          {/* Bottom Dock: Scene Switcher placed at canvas bottom */}
          <StageBottomDock
            activeScene={activeScene}
            onSelectScene={setActiveScene}
            isProtectionEnabled={protectionConfig.enabled}
          />
        </main>
      </div>
    </div>
  )
}
