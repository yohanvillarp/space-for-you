import { useState } from 'react'
import { Link } from 'react-router'
import { Sparkles, Share2, Layers, Heart, Copy, Check } from 'lucide-react'
import type { UserSpace } from '@/entities/space'
import { resolveSpaceDisplayStatus } from '@/entities/space/model/space-sync-engine'
import { SpaceStatusBadge } from '@/entities/space/ui/SpaceStatusBadge'
import { THEME_REGISTRY } from '@/features/space-themes'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { SpaceCardOptionsMenu } from './SpaceCardOptionsMenu'

export interface SpaceCardProps {
  space: UserSpace
  onDelete?: (id: string) => void
  onDuplicate?: (id: string) => void
  onRename?: (id: string) => void
  onArchive?: (id: string) => void
  onRestore?: (id: string) => void
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
  onRename,
  onArchive,
  onRestore,
  className,
}: SpaceCardProps) {
  const [copied, setCopied] = useState(false)
  const theme = THEME_REGISTRY[space.templateId] ?? THEME_REGISTRY.birthday
  const studioUrl = `${ROUTES.STUDIO}?template=${encodeURIComponent(space.templateId)}&spaceId=${encodeURIComponent(space.id)}`
  const shareSceneUrl = `${studioUrl}&scene=share`
  const publicUrl = `${window.location.origin}/s/${space.slug || space.id}`

  const displayStatus = resolveSpaceDisplayStatus(space)
  const isLiveOrScheduled =
    displayStatus === 'published' || displayStatus === 'scheduled'
  const isArchived = space.status === 'archived'

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback ignore
    }
  }

  return (
    <article
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#161210] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#CF7056]/40 hover:shadow-2xl hover:shadow-black/60',
        isArchived && 'opacity-75 grayscale-[20%]',
        className,
      )}
    >
      {/* Background Glow Container */}
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

      {/* Card Header */}
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

          <SpaceStatusBadge status={displayStatus} />
        </div>

        {/* Options Menu with clean popup */}
        <SpaceCardOptionsMenu
          spaceId={space.id}
          spaceTitle={space.title}
          shareSceneUrl={shareSceneUrl}
          isPublished={isLiveOrScheduled}
          isArchived={isArchived}
          publicUrl={publicUrl}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onRename={onRename}
          onArchive={onArchive}
          onRestore={onRestore}
        />
      </div>

      {/* Main Body */}
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

      {/* Direct Actions: Open Studio, Copy Link, Direct Share */}
      <div className="relative z-10 flex items-center gap-2">
        <Link
          to={studioUrl}
          className="group/btn flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 font-sans text-xs font-medium text-[#FAF6F0] shadow-sm transition-all hover:border-[#CF7056]/60 hover:bg-[#CF7056]/15 hover:text-white"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#CF7056] transition-transform group-hover/btn:scale-110" />
          <span>Open Studio</span>
        </Link>

        {isLiveOrScheduled && (
          <button
            type="button"
            onClick={handleCopyLink}
            title={copied ? 'Link copied!' : 'Copy public link'}
            aria-label="Copy public link"
            className="flex cursor-pointer items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 font-sans text-xs font-medium text-stone-300 shadow-sm transition-all hover:border-[#CF7056]/60 hover:bg-[#CF7056]/15 hover:text-white"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-stone-400" />
            )}
            <span className="hidden sm:inline">
              {copied ? 'Copied' : 'Link'}
            </span>
          </button>
        )}

        <Link
          to={shareSceneUrl}
          title="Open share & keepsake panel"
          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#CF7056]/30 bg-[#CF7056]/15 px-3.5 py-2.5 font-sans text-xs font-medium text-[#F3EAE1] shadow-sm transition-all hover:border-[#CF7056]/60 hover:bg-[#CF7056] hover:text-white"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </Link>
      </div>
    </article>
  )
}
