import { useState } from 'react'
import {
  Lock,
  Home,
  Sparkles,
  Mail,
  Plus,
  Share2,
  MoreHorizontal,
} from 'lucide-react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { useDockContextMenu } from '@/features/create-space/ui/dock/useDockContextMenu'
import { DockContextMenu } from '@/features/create-space/ui/dock/DockContextMenu'
import { RenameSceneModal } from '@/features/create-space/ui/dock/RenameSceneModal'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface StageBottomDockProps {
  activeSceneId: string
  scenes: SpaceScene[]
  onSelectScene: (sceneId: string) => void
  onOpenAddScene: () => void
  isProtectionEnabled: boolean
  onRenameScene?: (sceneId: string, newTitle: string) => void
  onDuplicateScene?: (sceneId: string) => void
  onMoveScene?: (sceneId: string, direction: 'left' | 'right') => void
  onDeleteScene?: (sceneId: string) => void
  onToggleProtection?: () => void
  className?: string
}

export function StageBottomDock({
  activeSceneId,
  scenes,
  onSelectScene,
  onOpenAddScene,
  isProtectionEnabled,
  onRenameScene,
  onDuplicateScene,
  onMoveScene,
  onDeleteScene,
  onToggleProtection,
  className,
}: StageBottomDockProps) {
  const { state: menuState, openMenu, closeMenu } = useDockContextMenu()
  const [renamingScene, setRenamingScene] = useState<SpaceScene | null>(null)

  const handleSwitch = (sceneId: string) => {
    if (sceneId === activeSceneId) return
    playSpatialSfx('tactile-tap')
    onSelectScene(sceneId)
  }

  const renderSceneIcon = (type: string) =>
    type === 'letters' ? (
      <Mail className="h-3.5 w-3.5 shrink-0" />
    ) : (
      <Sparkles className="h-3.5 w-3.5 shrink-0" />
    )

  const isMany = scenes.length >= 2
  const dockBtnClass = (isActive: boolean) =>
    cn(
      'flex shrink-0 cursor-pointer items-center rounded-full font-sans text-xs font-medium transition-all duration-200',
      isMany ? 'h-7 w-7 justify-center' : 'gap-1.5 px-3 py-1.5',
      isActive
        ? 'bg-[#CF7056] text-white shadow-md shadow-[#CF7056]/20'
        : 'text-stone-300 hover:bg-white/10 hover:text-white',
    )

  return (
    <>
      <nav
        aria-label="Scene navigation dock"
        onContextMenu={(e) => openMenu(e, { type: 'dock' })}
        className={cn(
          'pointer-events-auto absolute bottom-3.5 left-1/2 z-30 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 scrollbar-none items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-[#140F0D]/95 px-2 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl select-none',
          className,
        )}
      >
        {/* Section 1: Portal & Vault (Access Gate) */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => handleSwitch('hub')}
            onContextMenu={(e) => openMenu(e, { type: 'hub' })}
            title="Space Hub: Central Portal"
            className={dockBtnClass(activeSceneId === 'hub')}
          >
            <Home className="h-3.5 w-3.5 shrink-0" />
            {!isMany && <span className="hidden sm:inline">Space Hub</span>}
          </button>

          <button
            type="button"
            onClick={() => handleSwitch('gate')}
            onContextMenu={(e) => openMenu(e, { type: 'vault' })}
            title="Entrance Vault: Passcode protection settings"
            className={cn('relative', dockBtnClass(activeSceneId === 'gate'))}
          >
            <Lock className="h-3.5 w-3.5 shrink-0" />
            {!isMany && (
              <span className="hidden sm:inline">Entrance Vault</span>
            )}
            {isProtectionEnabled && (
              <span
                title="Passcode protection is enabled"
                className={cn(
                  'rounded-full bg-emerald-400 shadow-xs',
                  isMany
                    ? 'absolute -top-0.5 -right-0.5 h-2 w-2 border border-[#140F0D]'
                    : 'flex h-1.5 w-1.5',
                )}
              />
            )}
          </button>
        </div>

        {/* Divider 1 */}
        <div className="mx-0.5 h-4 w-px shrink-0 bg-white/15" />

        {/* Section 2: Creative Scenes */}
        <div className="flex shrink-0 items-center gap-1">
          {scenes.map((scene, index) => {
            const isSelected = activeSceneId === scene.id
            const dupes = scenes.filter(
              (s) =>
                s.title.trim().toLowerCase() ===
                scene.title.trim().toLowerCase(),
            )
            const sameTitleIndex =
              dupes.length > 1
                ? dupes.findIndex((s) => s.id === scene.id) + 1
                : null

            return (
              <div
                key={scene.id}
                className={cn(
                  'group flex items-center rounded-full transition-all duration-200',
                  isSelected
                    ? 'bg-[#CF7056] text-white shadow-md shadow-[#CF7056]/20'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white',
                )}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    if (isSelected && isMany) {
                      openMenu(e, { type: 'scene', scene, index })
                    } else {
                      handleSwitch(scene.id)
                    }
                  }}
                  onContextMenu={(e) =>
                    openMenu(e, { type: 'scene', scene, index })
                  }
                  title={
                    isMany
                      ? `${scene.title} (Click again or right-click for options)`
                      : scene.title
                  }
                  className={cn(
                    'flex shrink-0 cursor-pointer items-center font-sans text-xs font-medium',
                    isMany ? 'h-7 w-7 justify-center' : 'gap-1.5 px-3 py-1.5',
                  )}
                >
                  {renderSceneIcon(scene.type)}
                  {!isMany && (
                    <>
                      <span className="max-w-[80px] truncate sm:max-w-[120px] md:max-w-[150px]">
                        {scene.title}
                      </span>
                      {sameTitleIndex !== null && (
                        <span
                          className={cn(
                            'py-0.2 ml-0.5 rounded-full px-1.5 font-mono text-[10px] leading-tight',
                            isSelected
                              ? 'bg-black/25 text-white/90'
                              : 'bg-white/15 text-stone-300',
                          )}
                        >
                          #{sameTitleIndex}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {/* Direct quick action menu on selected scene when labels are shown */}
                {isSelected && !isMany && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      openMenu(e, { type: 'scene', scene, index })
                    }}
                    title="Scene options (Rename, Duplicate, Move, Delete)"
                    aria-label="Scene options"
                    className="mr-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-white/70 hover:bg-white/20 hover:text-white"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </button>
                )}
              </div>
            )
          })}

          <button
            type="button"
            onClick={() => {
              playSpatialSfx('tactile-tap')
              onOpenAddScene()
            }}
            title="Add New Scene"
            aria-label="Add New Scene"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/15 hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Divider 2 */}
        <div className="mx-0.5 h-4 w-px shrink-0 bg-white/15" />

        {/* Section 3: Delivery & Share (Action) */}
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={() => handleSwitch('share')}
            title="Share Invitation Keepsake"
            aria-label="Share invitation"
            className={dockBtnClass(activeSceneId === 'share')}
          >
            <Share2 className="h-3.5 w-3.5 shrink-0" />
            {!isMany && <span className="hidden sm:inline">Share</span>}
          </button>
        </div>
      </nav>

      <DockContextMenu
        state={menuState}
        totalScenes={scenes.length}
        isProtectionEnabled={isProtectionEnabled}
        onClose={closeMenu}
        onSelectScene={onSelectScene}
        onOpenAddScene={onOpenAddScene}
        onStartRename={(scene) => setRenamingScene(scene)}
        onDuplicateScene={onDuplicateScene}
        onMoveScene={onMoveScene}
        onDeleteScene={onDeleteScene}
        onToggleProtection={onToggleProtection}
      />

      {renamingScene && (
        <RenameSceneModal
          key={renamingScene.id}
          isOpen={true}
          currentTitle={renamingScene.title}
          onClose={() => setRenamingScene(null)}
          onSave={(title) => onRenameScene?.(renamingScene.id, title)}
        />
      )}
    </>
  )
}
