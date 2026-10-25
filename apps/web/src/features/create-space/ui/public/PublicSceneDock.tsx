import { Home, Mail, Sparkles, Image } from 'lucide-react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface PublicSceneDockProps {
  scenes: SpaceScene[]
  activeSceneId: string
  onSelectScene: (sceneId: string) => void
  hasHub?: boolean
  accentColor?: string
  className?: string
}

export function PublicSceneDock({
  scenes,
  activeSceneId,
  onSelectScene,
  hasHub = true,
  accentColor = '#D97706',
  className,
}: PublicSceneDockProps) {
  const handleSelect = (id: string) => {
    playSpatialSfx('tactile-tap')
    onSelectScene(id)
  }

  const renderIcon = (sceneType: string, isHub?: boolean) => {
    if (isHub) return <Home className="h-4 w-4" />
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
      <div className="flex max-w-[94vw] scrollbar-none items-center gap-1.5 overflow-x-auto rounded-full border border-white/15 bg-[#140F0D]/95 px-3 py-1.5 shadow-2xl backdrop-blur-xl sm:px-4">
        {hasHub && (
          <button
            type="button"
            onClick={() => handleSelect('hub')}
            style={
              activeSceneId === 'hub'
                ? {
                    borderColor: `${accentColor}66`,
                    backgroundColor: `${accentColor}25`,
                    color: '#FAF6F0',
                  }
                : undefined
            }
            className={cn(
              'flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium transition-all sm:px-4 sm:py-2',
              activeSceneId === 'hub'
                ? 'shadow-xs'
                : 'border-transparent text-stone-300 hover:bg-white/5 hover:text-white',
            )}
          >
            {renderIcon('', true)}
            <span className="shrink-0">Home</span>
          </button>
        )}

        {scenes.map((scene) => {
          const isActive = activeSceneId === scene.id
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => handleSelect(scene.id)}
              style={
                isActive
                  ? {
                      borderColor: `${accentColor}66`,
                      backgroundColor: `${accentColor}25`,
                      color: '#FAF6F0',
                    }
                  : undefined
              }
              className={cn(
                'flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium transition-all sm:px-4 sm:py-2',
                isActive
                  ? 'shadow-xs'
                  : 'border-transparent text-stone-300 hover:bg-white/5 hover:text-white',
              )}
            >
              {renderIcon(scene.type)}
              <span className="max-w-[130px] truncate sm:max-w-[180px]">
                {scene.title || 'Scene'}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
