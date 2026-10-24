import { useConfirmDialog } from '@/shared/ui'

export interface UseStudioResetOptions {
  onResetStage: () => void
  onResetScene: () => void
}

export function useStudioReset({
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
      localStorage.removeItem('sfy_scenes_draft')
      localStorage.removeItem('sfy_space_meta_draft')
      localStorage.removeItem('sfy_active_scene_id')
    } catch {
      // ignore
    }
    onResetScene()
  }

  return { handleResetToDefaults }
}
