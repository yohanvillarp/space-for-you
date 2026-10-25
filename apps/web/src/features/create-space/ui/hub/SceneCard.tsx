import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type { SpaceTemplateId } from '@/entities/space'
import { SCENE_CARD_THEMES } from '@/features/create-space/ui/hub/scene-card-themes'
import { MemoryCanvasCardContent } from '@/features/create-space/ui/hub/MemoryCanvasCardContent'
import { HeartfeltLettersCardContent } from '@/features/create-space/ui/hub/HeartfeltLettersCardContent'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface SceneCardProps {
  scene: SpaceScene
  index?: number
  templateId?: SpaceTemplateId
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
  templateId = 'birthday',
  accentColor,
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
  const theme = SCENE_CARD_THEMES[templateId] ?? SCENE_CARD_THEMES.birthday
  const resolvedAccent = accentColor || theme.accentColor

  const handleClick = () => {
    if (isDragging) return
    playSpatialSfx('tactile-tap')
    onOpenScene(scene.id)
  }

  const containerThemeClasses =
    scene.type === 'letters'
      ? `${theme.lettersBg} ${theme.lettersBorder}`
      : `${theme.canvasBg} ${theme.canvasBorder}`

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
        'group relative flex min-h-[175px] w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left shadow-xl backdrop-blur-md transition-all duration-300 select-none sm:min-h-[195px] sm:p-7',
        containerThemeClasses,
        isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer',
        !isDragging &&
          !isDragOver &&
          'hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40',
        isDragging &&
          'pointer-events-none scale-95 opacity-35 shadow-2xl ring-2 ring-amber-400/60',
        isDragOver &&
          'scale-102 border-amber-400/80 bg-[#251D19] shadow-2xl ring-2 ring-amber-400',
        className,
      )}
    >
      {/* Dynamic Ambient Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-8 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
        style={{ backgroundColor: resolvedAccent }}
        aria-hidden="true"
      />

      {/* Polymorphic Content by Scene Type */}
      {scene.type === 'letters' ? (
        <HeartfeltLettersCardContent
          scene={scene}
          templateId={templateId}
          theme={theme}
          accentColor={resolvedAccent}
          isDraggable={isDraggable}
        />
      ) : (
        <MemoryCanvasCardContent
          scene={scene}
          templateId={templateId}
          theme={theme}
          accentColor={resolvedAccent}
          isDraggable={isDraggable}
        />
      )}
    </div>
  )
}
