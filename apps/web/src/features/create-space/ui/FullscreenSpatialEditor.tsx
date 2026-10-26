import { useState } from 'react'
import { useNavigate } from 'react-router'
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
import { countTotalArtifacts } from '@/features/create-space/lib/space-tier-limits'
import { StudioBehaviorProvider } from '@/features/create-space/ui/editor/StudioBehaviorProvider'
import { useStudioReset } from '@/features/create-space/ui/editor/useStudioReset'
import { useShareCardCustomizer } from '@/features/create-space/ui/share/useShareCardCustomizer'
import { useStudioSave } from '@/features/create-space/ui/editor/useStudioSave'
import { usePublishSanctuary } from '@/features/create-space/ui/editor/usePublishSanctuary'
import { useSanctuarySyncState } from '@/features/create-space/ui/editor/useSanctuarySyncState'
import { useSpaceProtectionState } from '@/features/create-space/ui/editor/useSpaceProtectionState'
import { useFullscreenEditorHandlers } from '@/features/create-space/ui/editor/useFullscreenEditorHandlers'
import { useEditorStageWorkflow } from '@/features/create-space/ui/editor/useEditorStageWorkflow'
import { useConfirmDialog } from '@/shared/ui'
import { ROUTES } from '@/shared/config'
import { getCanonicalPublicUrl } from '@/features/create-space/lib/url-shortener'
import { generateSpaceSlug } from '@/entities/space/api/space-converters'
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

  const isPublished = spaceMeta.status === 'published'
  const syncState = useSanctuarySyncState({
    spaceId,
    isPublished,
    spaceMeta,
    scenes: resolvedScenes,
    protectionConfig,
  })

  const publishState = usePublishSanctuary({
    spaceId,
    templateId,
    spaceMeta,
    scenes: resolvedScenes,
    protectionConfig,
    pendingPhotos: stage.pendingPhotos,
    onPhotosUploaded: handlePhotosUploaded,
    onPublishSuccess: () => {
      handleUpdateSpaceMeta({ status: 'published' })
      syncState.markAsPublished()
    },
  })

  const canonicalSlug = spaceId
    ? generateSpaceSlug(spaceMeta.title, spaceMeta.recipientName, spaceId)
    : undefined
  const fallbackShareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${ROUTES.STUDIO}?template=${encodeURIComponent(templateId)}`
  const shareUrl = canonicalSlug
    ? getCanonicalPublicUrl(canonicalSlug)
    : fallbackShareUrl
  const shareCustomizer = useShareCardCustomizer(activeTheme.accentColor)

  const navigate = useNavigate()
  const { isSaved, isSaving, isDirty, handleSave, flushSave } = useStudioSave({
    spaceId,
    templateId,
    spaceMeta,
    protectionConfig,
    scenes: resolvedScenes,
    scenesCount: scenes.length,
    artifactsCount: countTotalArtifacts(resolvedScenes, items, activeSceneId),
    fallbackTitle: `${activeTheme.title} Space`,
    pendingPhotos: stage.pendingPhotos,
    onPhotosUploaded: handlePhotosUploaded,
  })

  const handleBackToDashboard = async () => {
    if (isDirty) await flushSave()
    navigate(ROUTES.DASHBOARD)
  }

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
          onOpenPublish={publishState.openPublishModal}
          onOpenShare={() => handleOpenScene('share')}
          onSave={handleSave}
          onBackToDashboard={handleBackToDashboard}
          isPublished={isPublished}
          isSaved={isSaved}
          isSaving={isSaving}
          isDirty={isDirty}
        />

        <div className="relative flex flex-1 overflow-hidden">
          <EditorSidebarDrawer
            showSidebar={showSidebar}
            sidebarWidth={sidebarWidth}
            isResizingSidebar={isResizingSidebar}
            activeSceneId={activeSceneId}
            onToggleSidebar={handleToggleSidebar}
            onResizeStart={handleResizeStart}
            hideSidebarDrawer={activeSceneId === 'share' && !isPublished}
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
              shareCustomizer={shareCustomizer}
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
            onOpenPhotoPicker={(it) => {
              setSelectedId(it.id)
              handleOpenSidebar()
            }}
            onDuplicateLetter={multiScene.handleDuplicateLetter}
            onReorderLetters={multiScene.handleReorderLetters}
            onReorderScenes={multiScene.handleReorderScenes}
            spaceId={spaceId}
            shareUrl={shareUrl}
            shareCustomizer={shareCustomizer}
            isPublished={isPublished}
            isDirty={syncState.hasUnpublishedChanges}
            onOpenPublish={publishState.openPublishModal}
          />
        </div>

        <EditorModals
          isAddSceneModalOpen={isAddSceneModalOpen}
          onCloseAddScene={() => setIsAddSceneModalOpen(false)}
          onAddScene={workflow.handleGuardedAddScene}
          existingScenesCount={scenes.length}
          publishState={publishState}
          onNavigateToScene={(sceneId) => handleOpenScene(sceneId)}
          accentColor={activeTheme.accentColor}
        />
      </div>
    </StudioBehaviorProvider>
  )
}
