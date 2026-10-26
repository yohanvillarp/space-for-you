import { useState } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { EditorTopHeader } from '@/features/create-space/ui/editor/EditorTopHeader'
import { EditorSidebarRenderer } from '@/features/create-space/ui/editor/EditorSidebarRenderer'
import { EditorSidebarDrawer } from '@/features/create-space/ui/editor/EditorSidebarDrawer'
import { EditorStageViewport } from '@/features/create-space/ui/editor/EditorStageViewport'
import { EditorModals } from '@/features/create-space/ui/editor/EditorModals'
import { useSidebarResize } from '@/features/create-space/ui/editor/useSidebarResize'
import { useSpatialStageItems } from '@/features/create-space/ui/editor/useSpatialStageItems'
import { useMultiSceneState } from '@/features/create-space/ui/editor/useMultiSceneState'
import { useEditorMediaAssignment } from '@/features/create-space/ui/editor/useEditorMediaAssignment'
import {
  countStagePhotos,
  countUploadedPhotos,
} from '@/features/create-space/lib/stage-photo-limit'
import { StudioBehaviorProvider } from '@/features/create-space/ui/editor/StudioBehaviorProvider'
import { useStudioReset } from '@/features/create-space/ui/editor/useStudioReset'
import { useSpaceProtectionState } from '@/features/create-space/ui/editor/useSpaceProtectionState'
import { useFullscreenEditorHandlers } from '@/features/create-space/ui/editor/useFullscreenEditorHandlers'
import { useEditorStageWorkflow } from '@/features/create-space/ui/editor/useEditorStageWorkflow'
import { useFullscreenStudioSync } from '@/features/create-space/ui/editor/useFullscreenStudioSync'
import { useConfirmDialog } from '@/shared/ui'
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
  const { confirm } = useConfirmDialog()
  const { protectionConfig, setProtectionConfig, handleUpdateProtection } =
    useSpaceProtectionState(spaceId, templateId)
  const [isAddSceneModalOpen, setIsAddSceneModalOpen] = useState(false)
  const multiScene = useMultiSceneState(initialSceneId, spaceId, templateId)
  const { activeSceneId, spaceMeta, scenes } = multiScene

  const initialCanvasItems = scenes.find((s) => s.type === 'free-canvas')?.items
  const stage = useSpatialStageItems(
    templateId,
    initialCanvasItems?.length ? initialCanvasItems : undefined,
  )
  const { items, selectedId, setSelectedId, copiedItem } = stage

  const {
    showSidebar,
    sidebarWidth,
    isResizingSidebar,
    handleResizeStart,
    handleToggleSidebar,
    handleOpenSidebar,
  } = useSidebarResize()

  const mediaAssignment = useEditorMediaAssignment({
    items,
    selectedId,
    onUpdateItemData: stage.handleUpdateItemData,
    onAssignItemPhoto: stage.handleAssignItemPhoto,
    onOpenSidebar: handleOpenSidebar,
  })

  const workflow = useEditorStageWorkflow({
    multiScene,
    stage,
    confirm,
    setIsAddSceneModalOpen,
    selectedItem: mediaAssignment.selectedItem,
    showSidebar,
    onOpenSidebar: handleOpenSidebar,
  })
  const { activeScene, resolvedScenes, handleOpenScene, handleOpenAddScene } =
    workflow
  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday

  const {
    letterHandlers,
    sceneCrudHandlers,
    stageItemHandlers,
    handleUpdateSpaceMeta,
    handlePhotosUploaded,
  } = useFullscreenEditorHandlers({
    multiScene,
    stage,
    confirm,
    onAddItem: workflow.handleGuardedAddItem,
    onDuplicateItem: workflow.handleGuardedDuplicateItem,
    onPasteItem: workflow.handleGuardedPasteItem,
    onAddScene: workflow.handleGuardedAddScene,
    onDuplicateScene: workflow.handleGuardedDuplicateScene,
  })

  const { handleResetToDefaults } = useStudioReset({
    spaceId,
    onResetStage: stage.handleResetToDefaults,
    onResetScene: () => handleOpenScene('hub'),
  })

  const sync = useFullscreenStudioSync({
    spaceId,
    templateId,
    spaceMeta,
    protectionConfig,
    resolvedScenes,
    scenesCount: scenes.length,
    items,
    activeSceneId,
    pendingPhotos: stage.pendingPhotos,
    accentColor: activeTheme.accentColor,
    themeTitle: activeTheme.title,
    onUpdateSpaceMeta: handleUpdateSpaceMeta,
    onPhotosUploaded: handlePhotosUploaded,
  })

  const commonSceneProps = {
    activeSceneId,
    activeScene,
    scenes,
    spaceMeta,
    protectionConfig,
    templateId,
    onChangeProtectionConfig: handleUpdateProtection,
    onChangeSpaceMeta: handleUpdateSpaceMeta,
    onOpenScene: handleOpenScene,
    onOpenAddScene: handleOpenAddScene,
    onOpenVault: () => handleOpenScene('gate'),
  }

  const isFreeCanvas = activeScene?.type === 'free-canvas'

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
          showUndoRedo={isFreeCanvas}
          canUndo={isFreeCanvas && stage.canUndo}
          canRedo={isFreeCanvas && stage.canRedo}
          onUndo={stage.handleUndo}
          onRedo={stage.handleRedo}
          onDeleteSelected={stage.handleDeleteItem}
          onResetToDefaults={handleResetToDefaults}
          onOpenPublish={sync.publishState.openPublishModal}
          onOpenShare={() => handleOpenScene('share')}
          onSave={sync.studioSave.handleSave}
          onBackToDashboard={sync.handleBackToDashboard}
          isPublished={sync.isPublished}
          isSaved={sync.studioSave.isSaved}
          isSaving={sync.studioSave.isSaving}
          isDirty={sync.studioSave.isDirty}
        />

        <div className="relative flex flex-1 overflow-hidden">
          <EditorSidebarDrawer
            showSidebar={showSidebar}
            sidebarWidth={sidebarWidth}
            isResizingSidebar={isResizingSidebar}
            activeSceneId={activeSceneId}
            onToggleSidebar={handleToggleSidebar}
            onResizeStart={handleResizeStart}
            hideSidebarDrawer={activeSceneId === 'share' && !sync.isPublished}
            isPulsing={mediaAssignment.isSidebarPulsing}
          >
            <EditorSidebarRenderer
              {...commonSceneProps}
              {...letterHandlers}
              onAddScene={workflow.handleGuardedAddScene}
              onDeleteScene={multiScene.handleDeleteScene}
              onAddItem={workflow.handleGuardedAddItem}
              onAssignTrack={mediaAssignment.handleAssignTrack}
              selectedMusicItem={mediaAssignment.selectedMusicItem}
              selectedPhotoItem={mediaAssignment.selectedPhotoItem}
              onAssignPhoto={mediaAssignment.handleAssignPhoto}
              photoCount={countStagePhotos(items)}
              uploadedPhotoCount={countUploadedPhotos(items)}
              isCompact={sidebarWidth < 280}
              shareCustomizer={sync.shareCustomizer}
            />
          </EditorSidebarDrawer>

          <EditorStageViewport
            {...commonSceneProps}
            {...sceneCrudHandlers}
            {...stageItemHandlers}
            {...letterHandlers}
            onToggleProtection={() =>
              setProtectionConfig((p) => ({ ...p, enabled: !p.enabled }))
            }
            items={items}
            selectedId={selectedId}
            copiedItem={copiedItem}
            onSelectItem={setSelectedId}
            onResetToDefaults={handleResetToDefaults}
            onOpenPhotoPicker={(it) => setSelectedId(it.id)}
            onDuplicateLetter={multiScene.handleDuplicateLetter}
            onReorderLetters={multiScene.handleReorderLetters}
            onReorderScenes={multiScene.handleReorderScenes}
            spaceId={spaceId}
            shareUrl={sync.shareUrl}
            shareCustomizer={sync.shareCustomizer}
            isPublished={sync.isPublished}
            isDirty={sync.syncState.hasUnpublishedChanges}
            onOpenPublish={sync.publishState.openPublishModal}
          />
        </div>

        <EditorModals
          isAddSceneModalOpen={isAddSceneModalOpen}
          onCloseAddScene={() => setIsAddSceneModalOpen(false)}
          onAddScene={workflow.handleGuardedAddScene}
          existingScenesCount={scenes.length}
          publishState={sync.publishState}
          onNavigateToScene={(sceneId) => handleOpenScene(sceneId)}
          accentColor={activeTheme.accentColor}
        />
      </div>
    </StudioBehaviorProvider>
  )
}
