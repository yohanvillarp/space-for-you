import { Sparkles, Mail, ArrowRight, GripVertical } from 'lucide-react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface SceneCardProps {
  scene: SpaceScene
  index?: number
  accentColor?: string
  onOpenScene: (sceneId: string) => void
  onContextMenu?: (e: React.MouseEvent) => void
  isDraggable?: boolean
  onDragStart?: (e: React.DragEvent, index: number) => void
  onDragOver?: (e: React.DragEvent, index: number) => void
  onDragLeave?: (e: React.DragEvent, index: number) => void
  onDrop?: (e: React.DragEvent, index: number) => void
  onDragEnd?: (e?: React.DragEvent) => void
  isDragging?: boolean
  isDragOver?: boolean
  className?: string
}

export function SceneCard({
  scene,
  index = 0,
  accentColor = '#CF7056',
  onOpenScene,
  onContextMenu,
  isDraggable = false,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  isDragging = false,
  isDragOver = false,
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
    if (isDragging) return
    playSpatialSfx('tactile-tap')
    onOpenScene(scene.id)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      draggable={isDraggable}
      onDragStart={(e) => onDragStart?.(e, index)}
      onDragOver={(e) => onDragOver?.(e, index)}
      onDragLeave={(e) => onDragLeave?.(e, index)}
      onDrop={(e) => onDrop?.(e, index)}
      onDragEnd={() => onDragEnd?.()}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      onContextMenu={onContextMenu}
      className={cn(
        'group relative flex min-h-[170px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#1E1815]/90 p-6 text-left shadow-xl backdrop-blur-md transition-all duration-200 select-none sm:min-h-[190px] sm:p-7',
        isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer',
        !isDragging &&
          !isDragOver &&
          'hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl',
        isDragging &&
          'pointer-events-none scale-95 opacity-35 shadow-2xl ring-2 ring-amber-400/60',
        isDragOver &&
          'scale-102 border-amber-400/80 bg-[#251D19] shadow-2xl ring-2 ring-amber-400',
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
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#28211D] shadow-inner transition-transform duration-300 group-hover:scale-105">
            {getSceneIcon()}
          </div>
          {isDraggable && (
            <div
              title="Drag to reorder scene"
              className="flex h-7 w-5 items-center justify-center rounded text-white/30 transition-colors group-hover:text-amber-300/80"
            >
              <GripVertical className="h-4 w-4" />
            </div>
          )}
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
    </div>
  )
}
