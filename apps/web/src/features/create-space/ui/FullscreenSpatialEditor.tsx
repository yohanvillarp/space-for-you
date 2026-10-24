import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { DEFAULT_PROTECTION_CONFIG } from '@/features/space-lock'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import { EditorTopHeader } from '@/features/create-space/ui/editor/EditorTopHeader'
import { EditorSidebarRenderer } from '@/features/create-space/ui/editor/EditorSidebarRenderer'
import { EditorStageViewport } from '@/features/create-space/ui/editor/EditorStageViewport'
import { AddSceneModal } from '@/features/create-space/ui/hub/AddSceneModal'
import { useSidebarResize } from '@/features/create-space/ui/editor/useSidebarResize'
import { useSpatialStageItems } from '@/features/create-space/ui/editor/useSpatialStageItems'
import { useStageKeyboardShortcuts } from '@/features/create-space/ui/editor/useStageKeyboardShortcuts'
import { useMultiSceneState } from '@/features/create-space/ui/editor/useMultiSceneState'
import { useEditorMediaAssignment } from '@/features/create-space/ui/editor/useEditorMediaAssignment'
import { countStagePhotos } from '@/features/create-space/lib/stage-photo-limit'
import { StudioBehaviorProvider } from '@/features/create-space/ui/editor/StudioBehaviorProvider'
import { cn } from '@/shared/lib'

export interface FullscreenSpatialEditorProps {
  templateId: SpaceTemplateId
  className?: string
}

export function FullscreenSpatialEditor({
  templateId,
  className,
}: FullscreenSpatialEditorProps) {
  const [protectionConfig, setProtectionConfig] =
    useState<SpaceProtectionConfig>(DEFAULT_PROTECTION_CONFIG)
  const [isAddSceneModalOpen, setIsAddSceneModalOpen] = useState(false)

  const multiScene = useMultiSceneState()
  const {
    activeSceneId,
    setActiveSceneId,
    spaceMeta,
    setSpaceMeta,
    scenes,
    selectedLetterId,
    setSelectedLetterId,
    openLetterId,
    setOpenLetterId,
    handleAddScene,
    handleDeleteScene,
    handleRenameScene,
    handleUpdateScene,
    handleDuplicateScene,
    handleMoveScene,
    handleUpdateLetter,
    handleAddLetter,
    handleDuplicateLetter,
    handleDeleteLetter,
  } = multiScene

  const stage = useSpatialStageItems(templateId)
  const { items, selectedId, setSelectedId, copiedItem } = stage

  const {
    selectedItem,
    selectedMusicItem,
    selectedPhotoItem,
    handleAssignTrack,
    handleAssignPhoto,
  } = useEditorMediaAssignment({
    items,
    selectedId,
    onUpdateItemData: stage.handleUpdateItemData,
    onAssignItemPhoto: stage.handleAssignItemPhoto,
  })

  const {
    showSidebar,
    sidebarWidth,
    isResizingSidebar,
    handleResizeStart,
    handleToggleSidebar,
    handleOpenSidebar,
  } = useSidebarResize()

  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday
  const activeScene = scenes.find((s) => s.id === activeSceneId)

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
    showSidebar,
    onOpenSidebar: handleOpenSidebar,
  })

  return (
    <StudioBehaviorProvider initialMode="editor">
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
                {activeSceneId === 'gate'
                  ? 'Lock Gate'
                  : activeSceneId === 'hub'
                    ? 'Space'
                    : 'Workshop'}
              </span>
            </button>
          )}

          {/* Left Resizable Sidebar */}
          <div
            style={{ width: showSidebar ? `${sidebarWidth}px` : '0px' }}
            className={cn(
              'relative h-full shrink-0 overflow-hidden border-r border-[#3B302A] transition-[width] duration-150 ease-out',
              !showSidebar && 'pointer-events-none invisible border-none',
            )}
          >
            <EditorSidebarRenderer
              activeSceneId={activeSceneId}
              protectionConfig={protectionConfig}
              onChangeProtectionConfig={(u) =>
                setProtectionConfig((p) => ({ ...p, ...u }))
              }
              spaceMeta={spaceMeta}
              onChangeSpaceMeta={(u) => setSpaceMeta((p) => ({ ...p, ...u }))}
              scenes={scenes}
              activeScene={activeScene}
              onOpenScene={setActiveSceneId}
              onAddScene={handleAddScene}
              onOpenAddScene={() => setIsAddSceneModalOpen(true)}
              onDeleteScene={handleDeleteScene}
              onOpenVault={() => setActiveSceneId('gate')}
              templateId={templateId}
              onAddItem={stage.handleAddItem}
              onAssignTrack={handleAssignTrack}
              selectedMusicItem={selectedMusicItem}
              selectedPhotoItem={selectedPhotoItem}
              onAssignPhoto={handleAssignPhoto}
              photoCount={countStagePhotos(items)}
              selectedLetterId={selectedLetterId}
              openLetterId={openLetterId}
              onSelectLetter={setSelectedLetterId}
              onOpenLetter={setOpenLetterId}
              onAddLetter={handleAddLetter}
              onUpdateLetter={handleUpdateLetter}
              onDeleteLetter={handleDeleteLetter}
              isCompact={sidebarWidth < 280}
            />

            {/* Resizer Handle on Right Edge of Left Sidebar */}
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

          {/* Right Canvas / Space Viewport */}
          <EditorStageViewport
            activeSceneId={activeSceneId}
            activeScene={activeScene}
            scenes={scenes}
            spaceMeta={spaceMeta}
            protectionConfig={protectionConfig}
            templateId={templateId}
            onChangeProtectionConfig={(u) =>
              setProtectionConfig((p) => ({ ...p, ...u }))
            }
            onChangeSpaceMeta={(u) => setSpaceMeta((p) => ({ ...p, ...u }))}
            onOpenScene={setActiveSceneId}
            onOpenAddScene={() => setIsAddSceneModalOpen(true)}
            onOpenVault={() => setActiveSceneId('gate')}
            onAddScene={handleAddScene}
            onRenameScene={handleRenameScene}
            onUpdateScene={handleUpdateScene}
            onDuplicateScene={handleDuplicateScene}
            onMoveScene={handleMoveScene}
            onDeleteScene={handleDeleteScene}
            onToggleProtection={() =>
              setProtectionConfig((p) => ({ ...p, enabled: !p.enabled }))
            }
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
            selectedLetterId={selectedLetterId}
            openLetterId={openLetterId}
            onSelectLetter={setSelectedLetterId}
            onOpenLetter={setOpenLetterId}
            onAddLetter={handleAddLetter}
            onDuplicateLetter={handleDuplicateLetter}
            onDeleteLetter={handleDeleteLetter}
            onUpdateLetter={handleUpdateLetter}
          />
        </div>

        {/* Add Scene Modal Dialog */}
        <AddSceneModal
          isOpen={isAddSceneModalOpen}
          onClose={() => setIsAddSceneModalOpen(false)}
          onAddScene={handleAddScene}
          existingScenesCount={scenes.length}
        />
      </div>
    </StudioBehaviorProvider>
  )
}
