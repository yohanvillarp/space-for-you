import { Sparkles, Mail, ArrowRight } from 'lucide-react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface SceneCardProps {
  scene: SpaceScene
  accentColor?: string
  onOpenScene: (sceneId: string) => void
  onContextMenu?: (e: React.MouseEvent) => void
  className?: string
}

export function SceneCard({
  scene,
  accentColor = '#CF7056',
  onOpenScene,
  onContextMenu,
  className,
}: SceneCardProps) {
  const getSceneIcon = () => {
    switch (scene.type) {
      case 'letters':
        return <Mail className="h-6 w-6" style={{ color: accentColor }} />
      case 'free-canvas':
      default:
        return <Sparkles className="h-6 w-6" style={{ color: accentColor }} />
    }
  }

  const getItemsCountLabel = () => {
    if (scene.type === 'letters') {
      const count = scene.letters.length
      return `${count} ${count === 1 ? 'letter' : 'letters'}`
    }
    if (scene.type === 'free-canvas') {
      const count = scene.items.length
      return `${count} ${count === 1 ? 'keepsake' : 'keepsakes'}`
    }
    return 'Special chapter'
  }

  const handleClick = () => {
    playSpatialSfx('tactile-tap')
    onOpenScene(scene.id)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onContextMenu={onContextMenu}
      className={cn(
        'group relative flex min-h-[170px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#1E1815]/90 p-6 text-left shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl sm:min-h-[190px] sm:p-7',
        className,
      )}
    >
      {/* Subtle Ambient Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Top Header: Icon & Item Count Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#28211D] shadow-inner transition-transform duration-300 group-hover:scale-105">
          {getSceneIcon()}
        </div>

        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-sans text-[11px] font-medium text-stone-300">
          {getItemsCountLabel()}
        </span>
      </div>

      {/* Bottom Content: Title & Subtitle */}
      <div className="relative z-10 mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-[#FAF6F0] transition-colors group-hover:text-amber-200 sm:text-xl">
            {scene.title}
          </h3>
          <ArrowRight className="h-4 w-4 text-stone-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-300" />
        </div>
        <p className="line-clamp-2 font-sans text-xs text-[#A99B90]">
          {scene.subtitle}
        </p>
      </div>
    </button>
  )
}
