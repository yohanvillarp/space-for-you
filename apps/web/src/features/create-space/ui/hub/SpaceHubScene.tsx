import { useState } from 'react'
import type {
  SpaceScene,
  SpaceMeta,
} from '@/features/create-space/model/scenes.types'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { sceneTemplateRegistry } from '@/features/create-space/model/scene-templates.class'
import { SpaceHubHero } from '@/features/create-space/ui/hub/SpaceHubHero'
import { SceneCard } from '@/features/create-space/ui/hub/SceneCard'
import { AddSceneCard } from '@/features/create-space/ui/hub/AddSceneCard'
import { useSpaceHubContextMenu } from '@/features/create-space/ui/hub/useSpaceHubContextMenu'
import { SpaceHubContextMenu } from '@/features/create-space/ui/hub/SpaceHubContextMenu'
import { RenameSceneModal } from '@/features/create-space/ui/dock/RenameSceneModal'
import { cn } from '@/shared/lib'

export interface SpaceHubSceneProps {
  templateId?: SpaceTemplateId
  meta: SpaceMeta
  scenes: SpaceScene[]
  isStudioPreview?: boolean
  isProtectionEnabled?: boolean
  onChangeMeta?: (updates: Partial<SpaceMeta>) => void
  onOpenScene: (sceneId: string) => void
  onOpenAddScene: () => void
  onOpenVault?: () => void
  onAddScene?: (scene: SpaceScene) => void
  onRenameScene?: (sceneId: string, newTitle: string) => void
  onDuplicateScene?: (sceneId: string) => void
  onMoveScene?: (sceneId: string, direction: 'left' | 'right') => void
  onDeleteScene?: (sceneId: string) => void
  onToggleProtection?: () => void
  className?: string
}

export function SpaceHubScene({
  templateId = 'birthday',
  meta,
  scenes,
  isProtectionEnabled = false,
  onChangeMeta,
  onOpenScene,
  onOpenAddScene,
  onOpenVault,
  onAddScene,
  onRenameScene,
  onDuplicateScene,
  onMoveScene,
  onDeleteScene,
  onToggleProtection,
  className,
}: SpaceHubSceneProps) {
  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday
  const { state: menuState, openMenu, closeMenu } = useSpaceHubContextMenu()
  const [renamingScene, setRenamingScene] = useState<SpaceScene | null>(null)

  const handleAddQuickScene = (type: 'free-canvas' | 'letters') => {
    const template = sceneTemplateRegistry.getByType(type)
    if (!template) return
    const newScene = template.createInstance(scenes.length)
    if (onAddScene) {
      onAddScene(newScene)
    } else {
      onOpenAddScene()
    }
  }

  return (
    <>
      <div
        onContextMenu={(e) => openMenu(e, { type: 'background' })}
        className={cn(
          '@container relative flex h-full min-h-full w-full flex-col items-center justify-start overflow-y-auto px-4 py-8 pb-24 sm:px-6 sm:py-12 sm:pb-28 lg:px-12',
          className,
        )}
      >
        {/* Theme Ambient Radial Glow */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 bg-radial opacity-30 blur-3xl transition-all duration-1000',
            activeTheme.ambientGlow,
          )}
          aria-hidden="true"
        />

        {/* Main Hub Content */}
        <div className="relative z-10 w-full max-w-4xl space-y-8 sm:space-y-12">
          {/* Editorial Dedication Hero */}
          <SpaceHubHero
            meta={meta}
            accentColor={activeTheme.accentColor}
            onChangeMeta={onChangeMeta}
            onContextMenu={(e) => openMenu(e, { type: 'hero' })}
          />

          {/* Dynamic Scenes Grid */}
          <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @xl:gap-6">
            {scenes.map((scene, index) => (
              <SceneCard
                key={scene.id}
                scene={scene}
                accentColor={activeTheme.accentColor}
                onOpenScene={onOpenScene}
                onContextMenu={(e) =>
                  openMenu(e, { type: 'scene', scene, index })
                }
              />
            ))}

            {/* Add Scene Card */}
            <AddSceneCard
              accentColor={activeTheme.accentColor}
              onAddScene={onOpenAddScene}
              onContextMenu={(e) => openMenu(e, { type: 'add-card' })}
            />
          </div>
        </div>
      </div>

      {/* Space Hub Context Menu */}
      <SpaceHubContextMenu
        state={menuState}
        totalScenes={scenes.length}
        isProtectionEnabled={isProtectionEnabled}
        onClose={closeMenu}
        onOpenScene={onOpenScene}
        onStartRename={(scene) => setRenamingScene(scene)}
        onDuplicateScene={onDuplicateScene}
        onMoveScene={onMoveScene}
        onDeleteScene={onDeleteScene}
        onAddQuickScene={handleAddQuickScene}
        onOpenAddScene={onOpenAddScene}
        onOpenVault={onOpenVault}
        onToggleProtection={onToggleProtection}
      />

      {/* Rename Scene Modal for Space Hub */}
      {renamingScene && (
        <RenameSceneModal
          key={renamingScene.id}
          isOpen={true}
          currentTitle={renamingScene.title}
          onClose={() => setRenamingScene(null)}
          onSave={(newTitle) => {
            onRenameScene?.(renamingScene.id, newTitle)
          }}
        />
      )}
    </>
  )
}
