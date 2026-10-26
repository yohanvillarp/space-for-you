import { useState } from 'react'
import { Sparkles, ExternalLink, Check, Copy, Eye } from 'lucide-react'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface ShareDraftPanelProps {
  onOpenPublish?: () => void
  previewUrl?: string
  accentColor?: string
  className?: string
}

export function ShareDraftPanel({
  onOpenPublish,
  previewUrl,
  accentColor = '#D97706',
  className,
}: ShareDraftPanelProps) {
  const [copiedPreview, setCopiedPreview] = useState(false)

  const handleCopyPreview = async () => {
    if (!previewUrl) return
    try {
      await navigator.clipboard.writeText(previewUrl)
      playSpatialSfx('tactile-tap')
      setCopiedPreview(true)
      setTimeout(() => setCopiedPreview(false), 2500)
    } catch {}
  }

  const handleOpenPreviewTab = () => {
    if (!previewUrl) return
    playSpatialSfx('pop-snap')
    window.open(previewUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={cn(
        'flex w-full flex-col space-y-6 rounded-3xl border border-white/10 bg-[#16120F]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8',
        className,
      )}
    >
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          <span className="font-sans text-xs font-semibold tracking-wider text-amber-300 uppercase">
            Private Draft
          </span>
        </div>
        <h3 className="font-heading text-xl font-medium tracking-tight text-[#FAF6F0] sm:text-2xl">
          Publish to Share
        </h3>
        <p className="font-sans text-xs leading-relaxed text-[#A99B90] sm:text-sm">
          Your sanctuary is currently saved safely in your browser. Publishing
          syncs it to the cloud so your recipient can open it, unlocking
          foldable keepsake card printing and direct sharing.
        </p>
      </div>

      <div className="space-y-3">
        {onOpenPublish && (
          <button
            type="button"
            onClick={() => {
              playSpatialSfx('pop-snap')
              onOpenPublish()
            }}
            style={{ backgroundColor: accentColor }}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-sans text-sm font-semibold text-[#18110D] shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Publish Sanctuary</span>
          </button>
        )}

        {previewUrl && (
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleOpenPreviewTab}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 font-sans text-xs font-medium text-stone-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Eye className="h-3.5 w-3.5 text-stone-400" />
              <span>Preview as Recipient</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </button>

            <button
              type="button"
              onClick={handleCopyPreview}
              title="Copy Preview Link"
              aria-label="Copy Preview Link"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {copiedPreview ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-white/10 pt-4 text-left">
        <p className="font-sans text-[11px] font-medium tracking-wider text-stone-400 uppercase">
          What happens when you publish?
        </p>
        <ul className="space-y-1.5 font-sans text-xs text-stone-300">
          <li className="flex items-center gap-2">
            <span className="text-amber-400">✦</span>
            <span>Generates an active, scannable QR code</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-amber-400">✦</span>
            <span>Unlocks printable foldable keepsake cards</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-amber-400">✦</span>
            <span>Enables instant 1-click sharing to WhatsApp & Telegram</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
