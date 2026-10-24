import { useState, useMemo } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { DEFAULT_PROTECTION_CONFIG } from '@/features/space-lock'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import type { SpaceMeta } from '@/features/create-space/model/scenes.types'
import { EditorTopHeader } from '@/features/create-space/ui/editor/EditorTopHeader'
import { EditorSidebarRenderer } from '@/features/create-space/ui/editor/EditorSidebarRenderer'
import { EditorSidebarDrawer } from '@/features/create-space/ui/editor/EditorSidebarDrawer'
import { EditorStageViewport } from '@/features/create-space/ui/editor/EditorStageViewport'
import { AddSceneModal } from '@/features/create-space/ui/hub/AddSceneModal'
import { useSidebarResize } from '@/features/create-space/ui/editor/useSidebarResize'
import { useSpatialStageItems } from '@/features/create-space/ui/editor/useSpatialStageItems'
import { useStageKeyboardShortcuts } from '@/features/create-space/ui/editor/useStageKeyboardShortcuts'
import { useMultiSceneState } from '@/features/create-space/ui/editor/useMultiSceneState'
import { useEditorMediaAssignment } from '@/features/create-space/ui/editor/useEditorMediaAssignment'
import { countStagePhotos } from '@/features/create-space/lib/stage-photo-limit'
import { StudioBehaviorProvider } from '@/features/create-space/ui/editor/StudioBehaviorProvider'
import { useStudioReset } from '@/features/create-space/ui/editor/useStudioReset'
import { useShareCardCustomizer } from '@/features/create-space/ui/share/useShareCardCustomizer'
import { useStudioSave } from '@/features/create-space/ui/editor/useStudioSave'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'

export interface FullscreenSpatialEditorProps {
  templateId: SpaceTemplateId
  initialSceneId?: string
  spaceId?: string
  className?: string
}

export function FullscreenSpatialEditor({
  templateId,
  initialSceneId,
  spaceId,
  className,
}: FullscreenSpatialEditorProps) {
  const [protectionConfig, setProtectionConfig] =
    useState<SpaceProtectionConfig>(DEFAULT_PROTECTION_CONFIG)
  const [isAddSceneModalOpen, setIsAddSceneModalOpen] = useState(false)

  const multiScene = useMultiSceneState(initialSceneId)
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
    handleReorderScenes,
    handleReorderLetters,
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

  const handleUpdateProtection = (u: Partial<SpaceProtectionConfig>) =>
    setProtectionConfig((p) => ({ ...p, ...u }))
  const handleUpdateSpaceMeta = (u: Partial<SpaceMeta>) =>
    setSpaceMeta((p) => ({ ...p, ...u }))

  const { handleResetToDefaults } = useStudioReset({
    onResetStage: stage.handleResetToDefaults,
    onResetScene: () => setActiveSceneId('hub'),
  })

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${ROUTES.STUDIO}?template=${encodeURIComponent(templateId)}`
      : `${ROUTES.STUDIO}?template=${encodeURIComponent(templateId)}`

  const shareCustomizer = useShareCardCustomizer(activeTheme.accentColor)

  const resolvedScenes = useMemo(
    () => scenes.map((s) => (s.type === 'free-canvas' ? { ...s, items } : s)),
    [scenes, items],
  )

  const { isSaved, isSaving, handleSave } = useStudioSave({
    spaceId,
    templateId,
    spaceMeta,
    scenes: resolvedScenes,
    scenesCount: scenes.length,
    artifactsCount: items.length,
    fallbackTitle: `${activeTheme.title} Space`,
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
          onResetToDefaults={handleResetToDefaults}
          onOpenShare={() => setActiveSceneId('share')}
          onSave={handleSave}
          isSaved={isSaved}
          isSaving={isSaving}
        />

        <div className="relative flex flex-1 overflow-hidden">
          <EditorSidebarDrawer
            showSidebar={showSidebar}
            sidebarWidth={sidebarWidth}
            isResizingSidebar={isResizingSidebar}
            activeSceneId={activeSceneId}
            onToggleSidebar={handleToggleSidebar}
            onResizeStart={handleResizeStart}
          >
            <EditorSidebarRenderer
              activeSceneId={activeSceneId}
              protectionConfig={protectionConfig}
              onChangeProtectionConfig={handleUpdateProtection}
              spaceMeta={spaceMeta}
              onChangeSpaceMeta={handleUpdateSpaceMeta}
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
              shareCustomizer={shareCustomizer}
            />
          </EditorSidebarDrawer>

          <EditorStageViewport
            activeSceneId={activeSceneId}
            activeScene={activeScene}
            scenes={scenes}
            spaceMeta={spaceMeta}
            protectionConfig={protectionConfig}
            templateId={templateId}
            onChangeProtectionConfig={handleUpdateProtection}
            onChangeSpaceMeta={handleUpdateSpaceMeta}
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
            onResetToDefaults={handleResetToDefaults}
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
            onReorderLetters={handleReorderLetters}
            onReorderScenes={handleReorderScenes}
            onUpdateLetter={handleUpdateLetter}
            shareUrl={shareUrl}
            shareCustomizer={shareCustomizer}
          />
        </div>

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
