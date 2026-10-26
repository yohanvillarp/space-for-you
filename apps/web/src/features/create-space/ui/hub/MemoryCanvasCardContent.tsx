import {
  Sparkles,
  ArrowRight,
  GripVertical,
  Image as ImageIcon,
} from 'lucide-react'
import type { FreeCanvasScene } from '@/features/create-space/model/scenes.types'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import type { SpaceTemplateId } from '@/entities/space'
import type { SceneCardThemeConfig } from '@/features/create-space/ui/hub/scene-card-themes'
import { cn } from '@/shared/lib'

export interface MemoryCanvasCardContentProps {
  scene: FreeCanvasScene
  templateId?: SpaceTemplateId
  theme: SceneCardThemeConfig
  accentColor: string
  isDraggable?: boolean
  isEditor?: boolean
}

export function MemoryCanvasCardContent({
  scene,
  theme,
  accentColor,
  isDraggable = false,
  isEditor = false,
}: MemoryCanvasCardContentProps) {
  const items: SpatialItem[] = scene.items || []
  const photoUrls: string[] = items
    .map((item: SpatialItem) => item.data?.photoUrl)
    .filter((url: string | undefined): url is string => Boolean(url))
    .slice(0, 3)

  const keepsakesLabel = isEditor
    ? items.length === 1
      ? '1 keepsake'
      : `${items.length} keepsakes`
    : 'Keepsakes'

  return (
    <>
      {/* Decorative Washi Tape Accent on Top Edge */}
      <div
        className={cn(
          'pointer-events-none absolute -top-1.5 left-10 h-3.5 w-16 -rotate-2 rounded-xs border shadow-xs backdrop-blur-xs',
          theme.tapeStyle,
        )}
        aria-hidden="true"
      />

      {/* Top Bar: Icon & Keepsakes Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#28211D]/80 shadow-inner transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5" style={{ color: accentColor }} />
          </div>
          {isDraggable && (
            <div
              title="Drag to reorder"
              className="flex h-7 w-5 items-center justify-center rounded text-white/30 transition-colors group-hover:text-amber-300/80"
            >
              <GripVertical className="h-4 w-4" />
            </div>
          )}
        </div>

        <span
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-[11px] font-medium shadow-xs',
            theme.badgeStyle,
          )}
        >
          {photoUrls.length > 0 && <ImageIcon className="h-3 w-3 opacity-80" />}
          {keepsakesLabel}
        </span>
      </div>

      {/* Middle Visual Preview: Fan of Polaroids or Tactile Atmosphere */}
      <div className="relative z-10 my-3 flex min-h-[52px] items-center justify-between">
        {photoUrls.length > 0 ? (
          <div className="flex items-center -space-x-3 pt-1">
            {photoUrls.map((url: string, i: number) => (
              <div
                key={url}
                style={{
                  transform:
                    i === 0
                      ? 'rotate(-8deg)'
                      : i === 1
                        ? 'rotate(3deg) translateY(-2px)'
                        : 'rotate(10deg)',
                }}
                className="relative h-12 w-11 shrink-0 overflow-hidden rounded-xs border border-stone-200/90 bg-[#FAF6F0] p-0.5 shadow-md transition-transform duration-300 group-hover:scale-105"
              >
                <img
                  src={url}
                  alt="Polaroid preview"
                  className="h-9 w-full rounded-[1px] object-cover"
                />
              </div>
            ))}
            <span className="pl-4 font-sans text-[11px] text-stone-400 italic">
              {isEditor
                ? 'Interactive stage items'
                : 'Moments & photo keepsakes'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-stone-400">
            <span className="font-heading text-xs tracking-wide text-stone-300 italic">
              {isEditor
                ? 'Interactive 3D Stage'
                : 'Touch to explore the memory diorama'}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Information: Title, Subtitle, Arrow */}
      <div className="relative z-10 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-[#FAF6F0] transition-colors group-hover:text-amber-200 sm:text-xl">
            {scene.title}
          </h3>
          <ArrowRight className="h-4 w-4 text-stone-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-300" />
        </div>
        <p className="line-clamp-2 font-sans text-xs text-[#A99B90]">
          {scene.subtitle ||
            (isEditor
              ? 'Diorama stage for keepsakes & moments'
              : 'Explore intimate keepsakes, photos & memories')}
        </p>
      </div>
    </>
  )
}
