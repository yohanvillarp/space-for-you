import type { SpaceTemplateId } from '@/entities/space'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import type {
  SpaceScene,
  SpaceMeta,
  LetterItem,
  SceneScheduleConfig,
} from '@/features/create-space/model/scenes.types'
import type {
  SpatialItem,
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'
import { EditorSceneRenderer } from '@/features/create-space/ui/editor/EditorSceneRenderer'
import { StageBottomDock } from '@/features/create-space/ui/dock/StageBottomDock'
import { cn } from '@/shared/lib'

export interface EditorStageViewportProps {
  activeSceneId: string
  activeScene: SpaceScene | undefined
  scenes: SpaceScene[]
  spaceMeta: SpaceMeta
  protectionConfig: SpaceProtectionConfig
  templateId: SpaceTemplateId
  onChangeProtectionConfig: (updates: Partial<SpaceProtectionConfig>) => void
  onChangeSpaceMeta: (updates: Partial<SpaceMeta>) => void
  onOpenScene: (sceneId: string) => void
  onOpenAddScene: () => void
  onOpenVault: () => void
  onAddScene: (scene: SpaceScene) => void
  onRenameScene: (sceneId: string, newTitle: string) => void
  onUpdateScene?: (
    sceneId: string,
    updates: {
      title?: string
      subtitle?: string
      schedule?: SceneScheduleConfig | null
    },
  ) => void
  onDuplicateScene: (sceneId: string) => void
  onMoveScene: (sceneId: string, direction: 'left' | 'right') => void
  onDeleteScene: (sceneId: string) => void
  onReorderScenes?: (fromIndex: number, toIndex: number) => void
  onToggleProtection: () => void
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
    customization: import('@/features/create-space/ui/share/share-customizer.types').ShareCardCustomization
    selectedTarget: import('@/features/create-space/ui/share/share-customizer.types').ShareColorTarget
    setSelectedTarget: (
      target: import('@/features/create-space/ui/share/share-customizer.types').ShareColorTarget,
    ) => void
    updateCustomization: (
      updates: Partial<
        import('@/features/create-space/ui/share/share-customizer.types').ShareCardCustomization
      >,
    ) => void
  }
  className?: string
}

export function EditorStageViewport(props: EditorStageViewportProps) {
  const {
    activeSceneId,
    activeScene,
    scenes,
    protectionConfig,
    onOpenScene,
    onOpenAddScene,
    onRenameScene,
    onDuplicateScene,
    onMoveScene,
    onDeleteScene,
    onToggleProtection,
    className,
    ...rendererProps
  } = props

  return (
    <main
      className={cn(
        'relative min-h-0 flex-1',
        activeScene?.type === 'free-canvas'
          ? 'overflow-auto p-2 pb-24 sm:p-6 sm:pb-16 lg:p-8'
          : 'overflow-hidden p-0',
        className,
      )}
    >
      <EditorSceneRenderer
        activeSceneId={activeSceneId}
        activeScene={activeScene}
        scenes={scenes}
        protectionConfig={protectionConfig}
        onOpenScene={onOpenScene}
        onOpenAddScene={onOpenAddScene}
        onRenameScene={onRenameScene}
        onDuplicateScene={onDuplicateScene}
        onMoveScene={onMoveScene}
        onDeleteScene={onDeleteScene}
        onToggleProtection={onToggleProtection}
        {...rendererProps}
      />

      <StageBottomDock
        activeSceneId={activeSceneId}
        scenes={scenes}
        onSelectScene={onOpenScene}
        onOpenAddScene={onOpenAddScene}
        isProtectionEnabled={protectionConfig.enabled}
        onRenameScene={onRenameScene}
        onDuplicateScene={onDuplicateScene}
        onMoveScene={onMoveScene}
        onDeleteScene={onDeleteScene}
        onToggleProtection={onToggleProtection}
      />
    </main>
  )
}
