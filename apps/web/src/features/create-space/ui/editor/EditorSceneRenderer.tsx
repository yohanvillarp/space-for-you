import type { SpaceProtectionConfig } from '@/features/space-lock'
import type {
  SpaceMeta,
  SpaceScene,
  LetterItem,
  SceneScheduleConfig,
} from '@/features/create-space/model/scenes.types'
import type { SpatialStageCanvasProps } from '@/features/create-space/ui/canvas/spatial-stage-canvas.types'
import { LockGateScene } from '@/features/space-lock'
import { SpaceHubScene } from '@/features/create-space/ui/hub/SpaceHubScene'
import { LettersScene } from '@/features/create-space/ui/letters/LettersScene'
import { SpatialStageCanvas } from '@/features/create-space/ui/SpatialStageCanvas'
import { ShareScene } from '@/features/create-space/ui/share/ShareScene'
import type {
  ShareCardCustomization,
  ShareColorTarget,
} from '@/features/create-space/ui/share/share-customizer.types'

export interface EditorSceneRendererProps extends Omit<
  SpatialStageCanvasProps,
  'className'
> {
  spaceId?: string
  activeSceneId: string
  protectionConfig: SpaceProtectionConfig
  onChangeProtectionConfig: (updates: Partial<SpaceProtectionConfig>) => void
  spaceMeta: SpaceMeta
  onChangeSpaceMeta: (updates: Partial<SpaceMeta>) => void
  scenes: SpaceScene[]
  activeScene: SpaceScene | undefined
  onOpenScene: (sceneId: string) => void
  onOpenAddScene: () => void
  onOpenVault: () => void
  onAddScene?: (scene: SpaceScene) => void
  onRenameScene?: (sceneId: string, newTitle: string) => void
  onUpdateScene?: (
    sceneId: string,
    updates: {
      title?: string
      subtitle?: string
      schedule?: SceneScheduleConfig | null
    },
  ) => void
  onDuplicateScene?: (sceneId: string) => void
  onMoveScene?: (sceneId: string, direction: 'left' | 'right') => void
  onDeleteScene?: (sceneId: string) => void
  onReorderScenes?: (fromIndex: number, toIndex: number) => void
  onToggleProtection?: () => void
  isPublished?: boolean
  isDirty?: boolean
  onOpenPublish?: () => void
  // Letters
  selectedLetterId: string | null
  openLetterId?: string | null
  onSelectLetter: (id: string | null) => void
  onOpenLetter?: (id: string | null) => void
  onAddLetter?: () => void
  onDuplicateLetter?: (id: string) => void
  onDeleteLetter?: (id: string) => void
  onReorderLetters?: (fromIndex: number, toIndex: number) => void
  onUpdateLetter: (updated: LetterItem) => void
  shareUrl?: string
  shareCustomizer?: {
    customization: ShareCardCustomization
    selectedTarget: ShareColorTarget
    setSelectedTarget: (target: ShareColorTarget) => void
    updateCustomization: (updates: Partial<ShareCardCustomization>) => void
  }
}

export function EditorSceneRenderer(props: EditorSceneRendererProps) {
  const {
    spaceId,
    activeSceneId,
    protectionConfig,
    onChangeProtectionConfig,
    spaceMeta,
    onChangeSpaceMeta,
    scenes,
    activeScene,
    onOpenScene,
    onOpenAddScene,
    onOpenVault,
    onAddScene,
    onRenameScene,
    onUpdateScene,
    onDuplicateScene,
    onMoveScene,
    onDeleteScene,
    onReorderScenes,
    onToggleProtection,
    templateId,
    items,
    selectedId,
    copiedItem,
    onSelectItem,
    onUpdateItemPosition,
    onStartDragItem,
    onCommitItemPosition,
    onRotateItem,
    onSetRotation,
    onResetRotation,
    onBringToFront,
    onSendToBack,
    onDeleteItem,
    onDuplicateItem,
    onToggleLock,
    onCopyItem,
    onPasteItem,
    onResetToDefaults,
    onClearCanvas,
    onUpdateItemData,
    onAddItem,
    onOpenPhotoPicker,
    selectedLetterId,
    openLetterId,
    onSelectLetter,
    onOpenLetter,
    onAddLetter,
    onDuplicateLetter,
    onDeleteLetter,
    onReorderLetters,
    onUpdateLetter,
    shareUrl,
    shareCustomizer,
    isPublished,
    isDirty,
    onOpenPublish,
  } = props

  if (activeSceneId === 'gate') {
    return (
      <LockGateScene
        config={protectionConfig}
        spaceTitle={spaceMeta.title}
        recipientName={spaceMeta.recipientName}
        isStudioPreview={true}
        onChangeConfig={onChangeProtectionConfig}
        onProceedToStage={() => onOpenScene('hub')}
      />
    )
  }

  if (activeSceneId === 'hub') {
    return (
      <SpaceHubScene
        meta={spaceMeta}
        scenes={scenes}
        isProtectionEnabled={Boolean(protectionConfig.enabled)}
        onChangeMeta={onChangeSpaceMeta}
        templateId={templateId}
        onOpenScene={onOpenScene}
        onOpenAddScene={onOpenAddScene}
        onOpenVault={onOpenVault}
        onAddScene={onAddScene}
        onRenameScene={onRenameScene}
        onUpdateScene={onUpdateScene}
        onDuplicateScene={onDuplicateScene}
        onMoveScene={onMoveScene}
        onDeleteScene={onDeleteScene}
        onReorderScenes={onReorderScenes}
        onToggleProtection={onToggleProtection}
      />
    )
  }

  if (activeSceneId === 'share' && shareCustomizer) {
    return (
      <ShareScene
        spaceId={spaceId}
        templateId={templateId}
        spaceMeta={spaceMeta}
        onChangeSpaceMeta={onChangeSpaceMeta}
        url={shareUrl || ''}
        customization={shareCustomizer.customization}
        selectedTarget={shareCustomizer.selectedTarget}
        onSelectTarget={shareCustomizer.setSelectedTarget}
        onUpdateCustomization={shareCustomizer.updateCustomization}
        onBackToHub={() => onOpenScene('hub')}
        isStudioPreview={true}
        isPublished={isPublished}
        isDirty={isDirty}
        onOpenPublish={onOpenPublish}
      />
    )
  }

  if (activeScene?.type === 'letters') {
    return (
      <LettersScene
        scene={activeScene}
        templateId={templateId}
        isStudioPreview={true}
        selectedLetterId={selectedLetterId}
        openLetterId={openLetterId}
        onSelectLetter={onSelectLetter}
        onOpenLetter={onOpenLetter}
        onAddLetter={onAddLetter}
        onDuplicateLetter={onDuplicateLetter}
        onDeleteLetter={onDeleteLetter}
        onReorderLetters={onReorderLetters}
        onUpdateLetter={onUpdateLetter}
        onUpdateScene={(updates) => onUpdateScene?.(activeScene.id, updates)}
        onBackToHub={() => onOpenScene('hub')}
      />
    )
  }

  return (
    <SpatialStageCanvas
      templateId={templateId}
      items={items}
      selectedId={selectedId}
      copiedItem={copiedItem}
      onSelectItem={onSelectItem}
      onUpdateItemPosition={onUpdateItemPosition}
      onStartDragItem={onStartDragItem}
      onCommitItemPosition={onCommitItemPosition}
      onRotateItem={onRotateItem}
      onSetRotation={onSetRotation}
      onResetRotation={onResetRotation}
      onBringToFront={onBringToFront}
      onSendToBack={onSendToBack}
      onDeleteItem={onDeleteItem}
      onDuplicateItem={onDuplicateItem}
      onToggleLock={onToggleLock}
      onCopyItem={onCopyItem}
      onPasteItem={onPasteItem}
      onResetToDefaults={onResetToDefaults}
      onClearCanvas={onClearCanvas}
      onUpdateItemData={onUpdateItemData}
      onAddItem={onAddItem}
      onOpenPhotoPicker={onOpenPhotoPicker}
      className="min-h-full w-full rounded-2xl"
    />
  )
}
