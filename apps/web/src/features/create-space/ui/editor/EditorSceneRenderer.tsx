import type { SpaceProtectionConfig } from '@/features/space-lock'
import type {
  SpaceMeta,
  SpaceScene,
  LetterItem,
  SceneScheduleConfig,
} from '@/features/create-space/model/scenes.types'
import type { SpaceTemplateId } from '@/entities/space'
import type {
  SpatialItem,
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'
import { LockGateScene } from '@/features/space-lock'
import { SpaceHubScene } from '@/features/create-space/ui/hub/SpaceHubScene'
import { LettersScene } from '@/features/create-space/ui/letters/LettersScene'
import { SpatialStageCanvas } from '@/features/create-space/ui/SpatialStageCanvas'
import { ShareScene } from '@/features/create-space/ui/share/ShareScene'
import type {
  ShareCardCustomization,
  ShareColorTarget,
} from '@/features/create-space/ui/share/share-customizer.types'

export interface EditorSceneRendererProps {
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
  templateId: SpaceTemplateId
  isPublished?: boolean
  onOpenPublish?: () => void
  // Spatial Stage Canvas props
  items: SpatialItem[]
  selectedId: string | null
  copiedItem: SpatialItem | null
  onSelectItem: (id: string | null) => void
  onUpdateItemPosition: (id: string, x: number, y: number) => void
  onStartDragItem?: (id: string) => void
  onCommitItemPosition?: () => void
  onRotateItem: (id: string, delta: number) => void
  onSetRotation: (id: string, rotation: number) => void
  onResetRotation: (id: string) => void
  onBringToFront: (id: string) => void
  onSendToBack: (id: string) => void
  onDeleteItem: (id: string) => void
  onDuplicateItem: (id: string) => void
  onToggleLock: (id: string) => void
  onCopyItem: (item: SpatialItem) => void
  onPasteItem: () => void
  onResetToDefaults: () => void
  onClearCanvas: () => void
  onUpdateItemData: (id: string, data: Partial<SpatialItemData>) => void
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    customData?: Partial<SpatialItemData>,
  ) => void
  onOpenPhotoPicker: (item: SpatialItem) => void
  // Letters props
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

export function EditorSceneRenderer({
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
  onOpenPublish,
}: EditorSceneRendererProps) {
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
        templateId={templateId}
        meta={spaceMeta}
        scenes={scenes}
        isStudioPreview={true}
        isProtectionEnabled={protectionConfig.enabled}
        onChangeMeta={onChangeSpaceMeta}
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
