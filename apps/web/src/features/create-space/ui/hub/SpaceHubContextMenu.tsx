import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type { SpaceHubContextMenuState } from '@/features/create-space/ui/hub/space-hub-context-menu.types'
import { FloatingContextMenu } from '@/features/create-space/shared/context-menu'
import { SpaceHubContextMenuStrategy } from '@/features/create-space/ui/hub/SpaceHubContextMenuStrategy'

export interface SpaceHubContextMenuProps {
  state: SpaceHubContextMenuState
  totalScenes: number
  isProtectionEnabled: boolean
  onClose: () => void
  onOpenScene: (sceneId: string) => void
  onStartRename: (scene: SpaceScene) => void
  onDuplicateScene?: (sceneId: string) => void
  onMoveScene?: (sceneId: string, direction: 'left' | 'right') => void
  onDeleteScene?: (sceneId: string) => void
  onAddQuickScene?: (type: 'free-canvas' | 'letters') => void
  onOpenAddScene: () => void
  onOpenVault?: () => void
  onToggleProtection?: () => void
}

export function SpaceHubContextMenu(props: SpaceHubContextMenuProps) {
  const { state, onClose } = props
  if (!state.isOpen || !state.target) return null

  const sections = SpaceHubContextMenuStrategy.buildSections(
    state.target,
    props,
  )

  return (
    <FloatingContextMenu
      isOpen={state.isOpen}
      x={state.x}
      y={state.y}
      sections={sections}
      onClose={onClose}
      dataAttribute="data-space-hub-context-menu"
      minWidth={200}
    />
  )
}
