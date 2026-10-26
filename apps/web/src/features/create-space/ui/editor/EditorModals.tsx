import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { AddSceneModal } from '@/features/create-space/ui/hub/AddSceneModal'
import { PublishSanctuaryModal } from '@/features/create-space/ui/editor/PublishSanctuaryModal'
import type { UsePublishSanctuaryReturn } from '@/features/create-space/ui/editor/usePublishSanctuary'

export interface EditorModalsProps {
  isAddSceneModalOpen: boolean
  onCloseAddScene: () => void
  onAddScene: (scene: SpaceScene) => void
  existingScenesCount: number
  publishState: UsePublishSanctuaryReturn
  onNavigateToScene: (sceneId: string) => void
  accentColor?: string
}

export function EditorModals({
  isAddSceneModalOpen,
  onCloseAddScene,
  onAddScene,
  existingScenesCount,
  publishState,
  onNavigateToScene,
  accentColor,
}: EditorModalsProps) {
  return (
    <>
      <AddSceneModal
        isOpen={isAddSceneModalOpen}
        onClose={onCloseAddScene}
        onAddScene={onAddScene}
        existingScenesCount={existingScenesCount}
      />
      <PublishSanctuaryModal
        isOpen={publishState.publishStep !== 'idle'}
        publishState={publishState}
        onClose={publishState.closePublishModal}
        onNavigateToScene={onNavigateToScene}
        accentColor={accentColor}
      />
    </>
  )
}
