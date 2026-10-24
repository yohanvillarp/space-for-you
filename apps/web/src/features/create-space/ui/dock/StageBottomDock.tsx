import { useState } from 'react'
import { Lock, Home, Sparkles, Mail, Plus, Share2 } from 'lucide-react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { useDockContextMenu } from '@/features/create-space/ui/dock/useDockContextMenu'
import { DockContextMenu } from '@/features/create-space/ui/dock/DockContextMenu'
import { RenameSceneModal } from '@/features/create-space/ui/dock/RenameSceneModal'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface StageBottomDockProps {
  activeSceneId: string // 'gate' | 'hub' | sceneId
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

  const renderSceneIcon = (type: string) => {
    if (type === 'letters') return <Mail className="h-3.5 w-3.5" />
    return <Sparkles className="h-3.5 w-3.5" />
  }

  return (
    <>
      <div
        onContextMenu={(e) => openMenu(e, { type: 'dock' })}
        className={cn(
          'pointer-events-auto absolute bottom-3 left-1/2 z-30 flex max-w-[95vw] -translate-x-1/2 scrollbar-none items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-[#17120F]/90 p-1 shadow-2xl backdrop-blur-md select-none',
          className,
        )}
      >
        {/* 1: Entrance Vault */}
        <button
          type="button"
          onClick={() => handleSwitch('gate')}
          onContextMenu={(e) => openMenu(e, { type: 'vault' })}
          className={cn(
            'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-medium transition-all duration-200',
            activeSceneId === 'gate'
              ? 'bg-amber-400/20 text-amber-200 shadow-xs ring-1 ring-amber-400/50'
              : 'text-stone-400 hover:bg-white/5 hover:text-stone-200',
          )}
        >
          <Lock className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Entrance Vault</span>
          <span className="sm:hidden">Vault</span>
          {isProtectionEnabled && (
            <span
              title="Passcode protection is enabled"
              className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-xs"
            />
          )}
        </button>

        {/* Divider */}
        <div className="h-3.5 w-px shrink-0 bg-white/15" />

        {/* 2: Space Hub (Central Portal Scene) */}
        <button
          type="button"
          onClick={() => handleSwitch('hub')}
          onContextMenu={(e) => openMenu(e, { type: 'hub' })}
          className={cn(
            'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-medium transition-all duration-200',
            activeSceneId === 'hub'
              ? 'bg-amber-400/20 text-amber-200 shadow-xs ring-1 ring-amber-400/50'
              : 'text-stone-400 hover:bg-white/5 hover:text-stone-200',
          )}
        >
          <Home className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Space Hub</span>
          <span className="sm:hidden">Hub</span>
        </button>

        {/* 3: Dynamic Created Scenes */}
        {scenes.map((scene, index) => {
          const isSelected = activeSceneId === scene.id
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => handleSwitch(scene.id)}
              onContextMenu={(e) =>
                openMenu(e, { type: 'scene', scene, index })
              }
              className={cn(
                'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-medium transition-all duration-200',
                isSelected
                  ? 'bg-amber-400/20 text-amber-200 shadow-xs ring-1 ring-amber-400/50'
                  : 'text-stone-400 hover:bg-white/5 hover:text-stone-200',
              )}
            >
              {renderSceneIcon(scene.type)}
              <span className="max-w-[80px] truncate sm:max-w-[120px] md:max-w-[150px]">
                {scene.title}
              </span>
            </button>
          )
        })}

        {/* 4: Share Invitation Scene Button */}
        <button
          type="button"
          onClick={() => handleSwitch('share')}
          title="Share Invitation Keepsake"
          className={cn(
            'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-medium transition-all duration-200',
            activeSceneId === 'share'
              ? 'bg-amber-400/20 text-amber-200 shadow-xs ring-1 ring-amber-400/50'
              : 'text-stone-400 hover:bg-white/5 hover:text-stone-200',
          )}
        >
          <Share2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* 5: Add Scene Quick Button */}
        <button
          type="button"
          onClick={() => {
            playSpatialSfx('tactile-tap')
            onOpenAddScene()
          }}
          title="Add New Scene"
          aria-label="Add New Scene"
          className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/10 hover:text-amber-200"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Dock Context Menu */}
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

      {/* Rename Scene Modal */}
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
