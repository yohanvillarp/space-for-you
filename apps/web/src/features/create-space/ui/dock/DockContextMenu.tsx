import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type { DockContextMenuState } from '@/features/create-space/ui/dock/dock-context-menu.types'
import { FloatingContextMenu } from '@/features/create-space/shared/context-menu'
import { DockContextMenuStrategy } from '@/features/create-space/ui/dock/DockContextMenuStrategy'

export interface DockContextMenuProps {
  state: DockContextMenuState
  totalScenes: number
  isProtectionEnabled: boolean
  onClose: () => void
  onSelectScene: (sceneId: string) => void
  onOpenAddScene: () => void
  onStartRename: (scene: SpaceScene) => void
  onDuplicateScene?: (sceneId: string) => void
  onMoveScene?: (sceneId: string, direction: 'left' | 'right') => void
  onDeleteScene?: (sceneId: string) => void
  onToggleProtection?: () => void
}

export function DockContextMenu(props: DockContextMenuProps) {
  const { state, onClose } = props
  if (!state.isOpen || !state.target) return null

  const sections = DockContextMenuStrategy.buildSections(state.target, props)

  return (
    <FloatingContextMenu
      isOpen={state.isOpen}
      x={state.x}
      y={state.y}
      sections={sections}
      onClose={onClose}
      dataAttribute="data-dock-context-menu"
      minWidth={190}
    />
  )
}
