import {
  Mail,
  ArrowRight,
  GripVertical,
  Heart,
  Star,
  Sun,
  Sparkles,
} from 'lucide-react'
import type { LettersScene } from '@/features/create-space/model/scenes.types'
import type { SpaceTemplateId } from '@/entities/space'
import type { SceneCardThemeConfig } from '@/features/create-space/ui/hub/scene-card-themes'
import { cn } from '@/shared/lib'

export interface HeartfeltLettersCardContentProps {
  scene: LettersScene
  templateId?: SpaceTemplateId
  theme: SceneCardThemeConfig
  accentColor: string
  isDraggable?: boolean
}

export function HeartfeltLettersCardContent({
  scene,
  templateId = 'birthday',
  theme,
  accentColor,
  isDraggable = false,
}: HeartfeltLettersCardContentProps) {
  const letters = scene.letters || []
  const firstLetter = letters[0]

  const lettersCountLabel =
    letters.length === 1 ? '1 letter' : `${letters.length} letters`

  const renderWaxSealIcon = () => {
    const sealType = firstLetter?.waxSeal
    if (sealType === 'star') return <Star className="h-4 w-4 fill-current" />
    if (sealType === 'sun') return <Sun className="h-4 w-4" />
    if (sealType === 'sparkle') return <Sparkles className="h-4 w-4" />
    if (templateId === 'anniversary' || sealType === 'heart') {
      return <Heart className="h-4 w-4 fill-current" />
    }
    if (templateId === 'friendship') {
      return <Sun className="h-4 w-4" />
    }
    return <Sparkles className="h-4 w-4" />
  }

  return (
    <>
      {/* Envelope Flap Fold Illusion (Decorative V-Shaped Top Edge) */}
      <div
        className={cn(
          'pointer-events-none absolute top-0 right-0 left-0 h-10 border-b opacity-40',
          theme.flapBorder,
        )}
        style={{
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          background: 'rgba(255, 255, 255, 0.03)',
        }}
        aria-hidden="true"
      />

      {/* Top Header: Mailbox / Grip & Postage Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#28211D]/80 shadow-inner transition-transform duration-300 group-hover:scale-105">
            <Mail className="h-5 w-5" style={{ color: accentColor }} />
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

        {/* Tactile Wax Seal Centerpiece */}
        <div
          title="Wax seal stamp"
          style={{ color: theme.sealIconColor }}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6',
            theme.sealStyle,
          )}
        >
          {renderWaxSealIcon()}
        </div>

        {/* Vintage Stamp Badge */}
        <span
          className={cn(
            'flex items-center rounded-xs border border-dashed px-2.5 py-1 font-mono text-[11px] font-medium tracking-tight shadow-xs',
            theme.badgeStyle,
          )}
        >
          {lettersCountLabel}
        </span>
      </div>

      {/* Middle Preview: Intimate Letter Title or Writing Preview */}
      <div className="relative z-10 my-3 flex min-h-[52px] flex-col justify-center rounded-lg border border-white/5 bg-black/20 px-3.5 py-2">
        {firstLetter ? (
          <div className="space-y-0.5">
            <span className="font-heading text-xs font-medium text-stone-200 italic">
              "{firstLetter.title || 'Folded Letter'}"
            </span>
            <p className="line-clamp-1 font-sans text-[11px] text-stone-400">
              {firstLetter.content || 'Sealed with heartfelt thoughts'}
            </p>
          </div>
        ) : (
          <span className="font-heading text-xs text-stone-400 italic">
            Desk of folded handwritten notes
          </span>
        )}
      </div>

      {/* Bottom Content: Title, Subtitle, Arrow */}
      <div className="relative z-10 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-[#FAF6F0] transition-colors group-hover:text-amber-200 sm:text-xl">
            {scene.title}
          </h3>
          <ArrowRight className="h-4 w-4 text-stone-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-300" />
        </div>
        <p className="line-clamp-2 font-sans text-xs text-[#A99B90]">
          {scene.subtitle || 'Read what I wrote for you'}
        </p>
      </div>
    </>
  )
}
