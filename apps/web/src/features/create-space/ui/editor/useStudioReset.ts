import { useConfirmDialog } from '@/shared/ui'
import { getSpaceStorageKeys } from './multi-scene-storage'

export interface UseStudioResetOptions {
  spaceId?: string
  onResetStage: () => void
  onResetScene: () => void
}

export function useStudioReset({
  spaceId,
  onResetStage,
  onResetScene,
}: UseStudioResetOptions) {
  const { confirm } = useConfirmDialog()

  const handleResetToDefaults = async () => {
    const ok = await confirm({
      title: 'Reset workspace to defaults?',
      description:
        'This will restore all stage elements, letter drafts, and layout back to their initial template settings. Any unsaved custom work will be removed.',
      confirmText: 'Reset workspace',
      cancelText: 'Keep working',
      type: 'danger',
    })
    if (!ok) return
    onResetStage()
    try {
      const keys = getSpaceStorageKeys(spaceId)
      localStorage.removeItem(keys.scenesKey)
      localStorage.removeItem(keys.metaKey)
      localStorage.removeItem(keys.activeSceneKey)
    } catch {
      // ignore
    }
    onResetScene()
  }

  return { handleResetToDefaults }
}
