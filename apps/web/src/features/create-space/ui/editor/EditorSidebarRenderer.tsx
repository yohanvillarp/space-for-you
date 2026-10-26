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
import { ShareCustomizerSidebar } from '@/features/create-space/ui/share/sidebar/ShareCustomizerSidebar'
import type {
  ShareCardCustomization,
  ShareColorTarget,
} from '@/features/create-space/ui/share/share-customizer.types'

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
  uploadedPhotoCount?: number
  selectedLetterId: string | null
  openLetterId?: string | null
  onSelectLetter: (id: string | null) => void
  onOpenLetter?: (id: string | null) => void
  onAddLetter: () => void
  onUpdateLetter: (updated: LetterItem) => void
  onDeleteLetter: (id: string) => void
  onAssignLetterPhoto?: (letterId: string, url: string, file?: File) => void
  isCompact: boolean
  shareCustomizer?: {
    customization: ShareCardCustomization
    selectedTarget: ShareColorTarget
    setSelectedTarget: (target: ShareColorTarget) => void
    updateCustomization: (updates: Partial<ShareCardCustomization>) => void
    applyColorToSelectedTarget: (hex: string) => void
    applyHarmonyPalette: (palette: {
      qrColor: string
      cardBg: string
      textColor: string
    }) => void
  }
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
  uploadedPhotoCount = 0,
  selectedLetterId,
  openLetterId,
  onSelectLetter,
  onOpenLetter,
  onAddLetter,
  onUpdateLetter,
  onDeleteLetter,
  onAssignLetterPhoto,
  isCompact,
  shareCustomizer,
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

  if (activeSceneId === 'share' && shareCustomizer) {
    return (
      <ShareCustomizerSidebar
        currentQrStyle={shareCustomizer.customization.qrStyle}
        onSelectQrStyle={(s) =>
          shareCustomizer.updateCustomization({ qrStyle: s })
        }
        selectedTarget={shareCustomizer.selectedTarget}
        onSelectTarget={shareCustomizer.setSelectedTarget}
        currentQrColor={shareCustomizer.customization.qrColor}
        currentCardBg={shareCustomizer.customization.cardBg}
        currentTextColor={shareCustomizer.customization.textColor}
        onApplyColor={shareCustomizer.applyColorToSelectedTarget}
        onApplyPalette={shareCustomizer.applyHarmonyPalette}
        currentFont={shareCustomizer.customization.fontFamily}
        onSelectFont={(f) =>
          shareCustomizer.updateCustomization({ fontFamily: f })
        }
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
        onAssignLetterPhoto={onAssignLetterPhoto}
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
      uploadedPhotoCount={uploadedPhotoCount}
      isCompact={isCompact}
      className="h-full w-full"
    />
  )
}
