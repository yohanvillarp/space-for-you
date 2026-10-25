import { Heart, Mail, Sparkles, Image } from 'lucide-react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface PublicSceneDockProps {
  scenes: SpaceScene[]
  activeSceneId: string
  onSelectScene: (sceneId: string) => void
  hasHub?: boolean
  className?: string
}

export function PublicSceneDock({
  scenes,
  activeSceneId,
  onSelectScene,
  hasHub = true,
  className,
}: PublicSceneDockProps) {
  const handleSelect = (id: string) => {
    playSpatialSfx('tactile-tap')
    onSelectScene(id)
  }

  const renderIcon = (sceneType: string, isHub?: boolean) => {
    if (isHub) return <Heart className="h-4 w-4" />
    if (sceneType === 'letters') return <Mail className="h-4 w-4" />
    if (sceneType === 'photos') return <Image className="h-4 w-4" />
    return <Sparkles className="h-4 w-4" />
  }

  return (
    <nav
      aria-label="Sanctuary scene navigation"
      className={cn(
        'animate-fade-in fixed bottom-6 left-1/2 z-40 -translate-x-1/2 select-none',
        className,
      )}
    >
      <div className="flex max-w-[92vw] items-center gap-1.5 overflow-x-auto rounded-full border border-white/15 bg-[#140F0D]/90 p-1.5 shadow-2xl backdrop-blur-xl">
        {hasHub && (
          <button
            type="button"
            onClick={() => handleSelect('hub')}
            className={cn(
              'flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-sans text-xs font-medium transition-all',
              activeSceneId === 'hub'
                ? 'border border-amber-400/30 bg-amber-400/20 text-amber-200 shadow-sm'
                : 'text-stone-300 hover:bg-white/5 hover:text-white',
            )}
          >
            {renderIcon('', true)}
            <span>Dedication</span>
          </button>
        )}

        {scenes.map((scene) => {
          const isActive = activeSceneId === scene.id
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => handleSelect(scene.id)}
              className={cn(
                'flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-sans text-xs font-medium transition-all',
                isActive
                  ? 'border border-amber-400/30 bg-amber-400/20 text-amber-200 shadow-sm'
                  : 'text-stone-300 hover:bg-white/5 hover:text-white',
              )}
            >
              {renderIcon(scene.type)}
              <span>{scene.title || 'Scene'}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
