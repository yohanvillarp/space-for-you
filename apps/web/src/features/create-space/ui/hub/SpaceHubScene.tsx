import { useState, useEffect } from 'react'
import type {
  SpaceScene,
  SpaceMeta,
  SceneScheduleConfig,
} from '@/features/create-space/model/scenes.types'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { sceneTemplateRegistry } from '@/features/create-space/model/scene-templates.class'
import { SpaceHubHero } from '@/features/create-space/ui/hub/SpaceHubHero'
import { SceneCard } from '@/features/create-space/ui/hub/SceneCard'
import { AddSceneCard } from '@/features/create-space/ui/hub/AddSceneCard'
import { useSpaceHubContextMenu } from '@/features/create-space/ui/hub/useSpaceHubContextMenu'
import { SpaceHubContextMenu } from '@/features/create-space/ui/hub/SpaceHubContextMenu'
import { EditSceneDetailsModal } from '@/features/create-space/ui/hub/EditSceneDetailsModal'
import { SceneScheduleModal } from '@/features/create-space/ui/hub/SceneScheduleModal'
import { SceneTeaserModal } from '@/features/create-space/ui/public/SceneTeaserModal'
import { useScenesDragReorder } from '@/features/create-space/ui/hub/useScenesDragReorder'
import { useStudioBehavior } from '@/features/create-space/ui/editor/useStudioBehavior'
import { cn } from '@/shared/lib'
import '@/features/space-themes/birthday/birthday.css'
import '@/features/space-themes/romantic/romantic.css'
import '@/features/space-themes/friendship/friendship.css'

const SURFACE_CLASSES: Record<SpaceTemplateId, string> = {
  birthday: 'universe-birthday celebration-table-surface',
  anniversary: 'universe-romantic romantic-desk-surface',
  friendship: 'universe-friendship corkboard-surface',
}

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
  className?: string
}

export function SpaceHubScene({
  templateId = 'birthday',
  meta,
  scenes,
  isStudioPreview = false,
  isProtectionEnabled = false,
  onChangeMeta,
  onOpenScene,
  onOpenAddScene,
  onOpenVault,
  onAddScene,
  onUpdateScene,
  onDuplicateScene,
  onMoveScene,
  onDeleteScene,
  onReorderScenes,
  onToggleProtection,
  className,
}: SpaceHubSceneProps) {
  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday
  const { state: menuState, openMenu, closeMenu } = useSpaceHubContextMenu()
  const [editingScene, setEditingScene] = useState<SpaceScene | null>(null)
  const [schedulingScene, setSchedulingScene] = useState<SpaceScene | null>(
    null,
  )
  const [teaserScene, setTeaserScene] = useState<SpaceScene | null>(null)
  const [highlightedSceneId, setHighlightedSceneId] = useState<string | null>(
    null,
  )
  const { isEditorMode } = useStudioBehavior()
  const isEffectiveEditor = Boolean(isStudioPreview) && isEditorMode

  const {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useScenesDragReorder({ onReorderScenes, enabled: isEffectiveEditor })

  const [prevCount, setPrevCount] = useState(scenes.length)
  if (scenes.length !== prevCount) {
    setPrevCount(scenes.length)
    if (scenes.length > prevCount && isEffectiveEditor) {
      const newest = scenes[scenes.length - 1]
      if (newest) {
        setHighlightedSceneId(newest.id)
        setEditingScene(newest)
        setTimeout(() => {
          document
            .getElementById(`scene-card-${newest.id}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 100)
      }
    }
  }

  useEffect(() => {
    if (highlightedSceneId) {
      const timer = setTimeout(() => setHighlightedSceneId(null), 2600)
      return () => clearTimeout(timer)
    }
  }, [highlightedSceneId])

  const handleAddQuickScene = (type: 'free-canvas' | 'letters') => {
    const template = sceneTemplateRegistry.getByType(type)
    if (!template) return
    const newScene = template.createInstance(scenes.length)
    if (onAddScene) onAddScene(newScene)
    else onOpenAddScene()
  }

  return (
    <>
      <div
        onContextMenu={(e) => openMenu(e, { type: 'background' })}
        className={cn(
          '@container relative flex h-full min-h-full w-full flex-col items-center justify-start overflow-y-auto px-4 py-8 pb-24 sm:px-6 sm:py-12 sm:pb-28 lg:px-12',
          SURFACE_CLASSES[templateId] ?? 'celebration-table-surface',
          className,
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 bg-radial opacity-30 blur-3xl transition-all duration-1000',
            activeTheme.ambientGlow,
          )}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-4xl space-y-8 sm:space-y-12">
          <SpaceHubHero
            meta={meta}
            templateId={templateId}
            accentColor={activeTheme.accentColor}
            onChangeMeta={onChangeMeta}
            onContextMenu={(e) => openMenu(e, { type: 'hero' })}
          />

          <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @xl:gap-6">
            {scenes.map((scene, index) => (
              <SceneCard
                key={scene.id}
                scene={scene}
                index={index}
                templateId={templateId}
                isEditor={isEffectiveEditor}
                isDraggable={isEffectiveEditor}
                isHighlighted={highlightedSceneId === scene.id}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                isDragging={draggedIndex === index}
                isDragOver={dragOverIndex === index}
                accentColor={activeTheme.accentColor}
                onOpenScene={onOpenScene}
                onEditDetails={(target) => setEditingScene(target)}
                onOpenSchedule={(target) => setSchedulingScene(target)}
                onOpenTeaser={(target) => setTeaserScene(target)}
                onContextMenu={(e) =>
                  openMenu(e, { type: 'scene', scene, index })
                }
              />
            ))}

            {isEffectiveEditor && (
              <AddSceneCard
                accentColor={activeTheme.accentColor}
                onAddScene={onOpenAddScene}
                onContextMenu={(e) => openMenu(e, { type: 'add-card' })}
              />
            )}
          </div>
        </div>
      </div>

      <SpaceHubContextMenu
        state={menuState}
        totalScenes={scenes.length}
        isProtectionEnabled={isProtectionEnabled}
        onClose={closeMenu}
        onOpenScene={onOpenScene}
        onStartRename={(scene) => setEditingScene(scene)}
        onOpenSchedule={(scene) => setSchedulingScene(scene)}
        onDuplicateScene={onDuplicateScene}
        onMoveScene={onMoveScene}
        onDeleteScene={onDeleteScene}
        onAddQuickScene={handleAddQuickScene}
        onOpenAddScene={onOpenAddScene}
        onOpenVault={onOpenVault}
        onToggleProtection={onToggleProtection}
      />

      {editingScene && (
        <EditSceneDetailsModal
          key={editingScene.id}
          isOpen={true}
          currentTitle={editingScene.title}
          currentSubtitle={editingScene.subtitle}
          onClose={() => setEditingScene(null)}
          onSave={(newTitle, newSubtitle) => {
            onUpdateScene?.(editingScene.id, {
              title: newTitle,
              subtitle: newSubtitle,
            })
            setEditingScene(null)
          }}
        />
      )}

      {schedulingScene && (
        <SceneScheduleModal
          key={schedulingScene.id}
          isOpen={true}
          scene={schedulingScene}
          onClose={() => setSchedulingScene(null)}
          onSave={(sceneId, schedule) => {
            onUpdateScene?.(sceneId, { schedule })
            setSchedulingScene(null)
          }}
        />
      )}

      {teaserScene && (
        <SceneTeaserModal
          key={teaserScene.id}
          isOpen={true}
          scene={teaserScene}
          onClose={() => setTeaserScene(null)}
        />
      )}
    </>
  )
}
