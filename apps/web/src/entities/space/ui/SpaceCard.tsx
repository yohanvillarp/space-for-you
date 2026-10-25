import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Sparkles, Share2, Check, Layers, Heart } from 'lucide-react'
import type { UserSpace } from '../model/types'
import { THEME_REGISTRY } from '@/features/space-themes'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { SpaceCardOptionsMenu } from './SpaceCardOptionsMenu'

export interface SpaceCardProps {
  space: UserSpace
  onDelete?: (id: string) => void
  onDuplicate?: (id: string) => void
  className?: string
}

function formatRelativeTime(isoString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    if (diffMinutes < 5) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return new Date(isoString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return 'Recently'
  }
}

export function SpaceCard({
  space,
  onDelete,
  onDuplicate,
  className,
}: SpaceCardProps) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const theme = THEME_REGISTRY[space.templateId] ?? THEME_REGISTRY.birthday
  const studioUrl = `${ROUTES.STUDIO}?template=${encodeURIComponent(space.templateId)}&spaceId=${encodeURIComponent(space.id)}`
  const shareSceneUrl = `${studioUrl}&scene=share`

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const fullShareUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${shareSceneUrl}`
        : shareSceneUrl

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(fullShareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2400)
      } catch {
        navigate(shareSceneUrl)
      }
    } else {
      navigate(shareSceneUrl)
    }
  }

  return (
    <article
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#161210] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#CF7056]/40 hover:shadow-2xl hover:shadow-black/60',
        className,
      )}
    >
      {/* Background Glow Container (isolated with overflow-hidden so card popups are not clipped) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute -top-16 -right-16 h-36 w-36 rounded-full bg-radial opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40',
            theme.ambientGlow,
          )}
        />
      </div>

      {/* Card Header (Elevated to z-20 so dropdown is always above the title) */}
      <div className="relative z-20 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-sans text-[11px] font-medium tracking-wide uppercase"
            style={{ color: theme.accentColor }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: theme.accentColor }}
            />
            {theme.title}
          </span>

          <span className="rounded-full bg-white/5 px-2 py-0.5 font-sans text-[11px] text-stone-400">
            {space.status === 'published'
              ? 'Shared'
              : space.status === 'ready'
                ? 'Ready'
                : 'Draft'}
          </span>
        </div>

        {/* Options Menu with clean popup */}
        <SpaceCardOptionsMenu
          spaceId={space.id}
          spaceTitle={space.title}
          shareSceneUrl={shareSceneUrl}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      </div>

      {/* Main Body (z-10 so it stays under the header's z-20 dropdown) */}
      <div className="relative z-10 my-4 space-y-2">
        <div className="font-heading flex items-center gap-1.5 text-xs text-[#E2927C] italic">
          <Heart className="h-3 w-3 fill-current text-[#E2927C]" />
          <span>For {space.recipientName}</span>
        </div>

        <h3 className="font-heading text-lg font-medium tracking-tight text-[#FAF6F0] transition-colors group-hover:text-[#CF7056] sm:text-xl">
          <Link to={studioUrl} className="focus:outline-hidden">
            {space.title}
          </Link>
        </h3>

        {space.description && (
          <p className="line-clamp-2 font-sans text-xs leading-relaxed text-stone-400">
            {space.description}
          </p>
        )}
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 mb-5 flex items-center justify-between border-t border-white/10 pt-3 font-sans text-xs text-stone-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-stone-500" />
            <span>
              {space.scenesCount} {space.scenesCount === 1 ? 'scene' : 'scenes'}
            </span>
          </span>
          <span>•</span>
          <span>{space.artifactsCount} artifacts</span>
        </div>

        <span className="text-[11px] text-stone-500">
          {formatRelativeTime(space.updatedAt)}
        </span>
      </div>

      {/* Direct Actions: Open Studio & Direct Share (Fluent English labels) */}
      <div className="relative z-10 flex items-center gap-2">
        <Link
          to={studioUrl}
          className="group/btn flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 font-sans text-xs font-medium text-[#FAF6F0] shadow-sm transition-all hover:border-[#CF7056]/60 hover:bg-[#CF7056]/15 hover:text-white"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#CF7056] transition-transform group-hover/btn:scale-110" />
          <span>Open Studio</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          title={
            copied ? 'Link copied to clipboard!' : 'Copy direct share link'
          }
          className={cn(
            'flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3.5 py-2.5 font-sans text-xs font-medium shadow-sm transition-all',
            copied
              ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
              : 'border border-[#CF7056]/30 bg-[#CF7056]/15 text-[#F3EAE1] hover:border-[#CF7056]/60 hover:bg-[#CF7056] hover:text-white',
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </article>
  )
}
