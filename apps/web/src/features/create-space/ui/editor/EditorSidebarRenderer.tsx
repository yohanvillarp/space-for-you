import type { SpaceProtectionConfig } from '@/features/space-lock'
import type {
  SpaceMeta,
  SpaceScene,
  LetterItem,
} from '@/features/create-space/model/scenes.types'
import type { SpaceTemplateId } from '@/entities/space'
import type { AudioTrack } from '@/entities/audio'
import type {
  SpatialItem,
  SpatialItemType,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'
import { LockGateSidebar } from '@/features/space-lock'
import { SpaceGeneralSidebar } from '@/features/create-space/ui/hub/SpaceGeneralSidebar'
import { SpatialToolboxSidebar } from '@/features/create-space/ui/SpatialToolboxSidebar'
import { LettersToolboxSidebar } from '@/features/create-space/ui/letters/LettersToolboxSidebar'

export interface EditorSidebarRendererProps {
  activeSceneId: string
  protectionConfig: SpaceProtectionConfig
  onChangeProtectionConfig: (updates: Partial<SpaceProtectionConfig>) => void
  spaceMeta: SpaceMeta
  onChangeSpaceMeta: (updates: Partial<SpaceMeta>) => void
  scenes: SpaceScene[]
  activeScene: SpaceScene | undefined
  onOpenScene: (sceneId: string) => void
  onAddScene?: (scene: SpaceScene) => void
  onOpenAddScene: () => void
  onDeleteScene: (sceneId: string) => void
  onOpenVault: () => void
  templateId: SpaceTemplateId
  onAddItem: (
    type: SpatialItemType,
    x?: number,
    y?: number,
    customData?: Partial<SpatialItemData>,
  ) => void
  onAssignTrack: (track: AudioTrack) => void
  selectedMusicItem: SpatialItem | null | undefined
  selectedPhotoItem: SpatialItem | null | undefined
  onAssignPhoto: (url: string, file?: File) => void
  photoCount: number
  selectedLetterId: string | null
  openLetterId?: string | null
  onSelectLetter: (id: string | null) => void
  onOpenLetter?: (id: string | null) => void
  onAddLetter: () => void
  onUpdateLetter: (updated: LetterItem) => void
  onDeleteLetter: (id: string) => void
  isCompact: boolean
}

export function EditorSidebarRenderer({
  activeSceneId,
  protectionConfig,
  onChangeProtectionConfig,
  spaceMeta: _spaceMeta,
  onChangeSpaceMeta: _onChangeSpaceMeta,
  scenes,
  activeScene,
  onOpenScene: _onOpenScene,
  onAddScene,
  onOpenAddScene,
  onDeleteScene: _onDeleteScene,
  onOpenVault: _onOpenVault,
  templateId,
  onAddItem,
  onAssignTrack,
  selectedMusicItem,
  selectedPhotoItem,
  onAssignPhoto,
  photoCount,
  selectedLetterId,
  openLetterId,
  onSelectLetter,
  onOpenLetter,
  onAddLetter,
  onUpdateLetter,
  onDeleteLetter,
  isCompact,
}: EditorSidebarRendererProps) {
  if (activeSceneId === 'gate') {
    return (
      <LockGateSidebar
        config={protectionConfig}
        onChangeConfig={onChangeProtectionConfig}
        isCompact={isCompact}
        className="h-full w-full"
      />
    )
  }

  if (activeSceneId === 'hub') {
    return (
      <SpaceGeneralSidebar
        scenesCount={scenes.length}
        onAddScene={onAddScene ?? (() => onOpenAddScene())}
        isCompact={isCompact}
        className="h-full w-full"
      />
    )
  }

  if (activeScene?.type === 'letters') {
    return (
      <LettersToolboxSidebar
        letters={activeScene.letters}
        selectedLetterId={selectedLetterId}
        openLetterId={openLetterId}
        onSelectLetter={onSelectLetter}
        onOpenLetter={onOpenLetter}
        onAddLetter={onAddLetter}
        onUpdateLetter={onUpdateLetter}
        onDeleteLetter={onDeleteLetter}
        isCompact={isCompact}
        className="h-full w-full"
      />
    )
  }

  return (
    <SpatialToolboxSidebar
      templateId={templateId}
      onAddItem={onAddItem}
      onAssignTrack={onAssignTrack}
      selectedMusicItem={selectedMusicItem}
      selectedPhotoItem={selectedPhotoItem}
      onAssignPhoto={onAssignPhoto}
      photoCount={photoCount}
      isCompact={isCompact}
      className="h-full w-full"
    />
  )
}
