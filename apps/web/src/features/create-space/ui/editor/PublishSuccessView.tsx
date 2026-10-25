import { useState } from 'react'
import {
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/shared/ui'
import { playSpatialSfx } from '@/shared/lib'

export interface PublishSuccessViewProps {
  shareUrl: string
  recipientName: string
  onClose: () => void
  onNavigateToShare: () => void
  onOpenPublicView: () => void
  accentColor?: string
}

export function PublishSuccessView({
  shareUrl,
  recipientName,
  onClose,
  onNavigateToShare,
  onOpenPublicView,
  accentColor = '#D97706',
}: PublishSuccessViewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      playSpatialSfx('tactile-tap')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
    }
  }

  return (
    <div className="space-y-6 text-center">
      {/* Celebration Header */}
      <div className="flex flex-col items-center space-y-2">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 shadow-xl"
          style={{ backgroundColor: `${accentColor}33` }}
        >
          <Sparkles className="h-7 w-7 text-amber-300" />
        </div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#FAF6F0]">
          Sanctuary Published!
        </h2>
        <p className="max-w-md font-sans text-xs text-stone-300">
          Your gift is live and safely accessible to{' '}
          <strong className="text-amber-200">{recipientName}</strong> without
          any sign-up required.
        </p>
      </div>

      {/* Copy Link Input Box */}
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 shadow-inner">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="flex-1 bg-transparent px-3 font-mono text-xs text-amber-200 outline-none select-all"
        />
        <Button
          type="button"
          size="sm"
          onClick={handleCopy}
          style={{ backgroundColor: accentColor }}
          className="flex items-center gap-1.5 font-medium text-[#1A120B]"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </Button>
      </div>

      {/* Recommended Next Actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onNavigateToShare}
          className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-amber-400/40 hover:bg-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/20 text-amber-300">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading text-sm font-medium text-[#FAF6F0]">
                Keepsake Card
              </p>
              <p className="font-sans text-[11px] text-stone-400">
                Print dedication with QR code
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-stone-500 transition-transform group-hover:translate-x-1 group-hover:text-amber-300" />
        </button>

        <button
          type="button"
          onClick={onOpenPublicView}
          className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-amber-400/40 hover:bg-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-300">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading text-sm font-medium text-[#FAF6F0]">
                Recipient View
              </p>
              <p className="font-sans text-[11px] text-stone-400">
                Experience it as they will
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-stone-500 transition-transform group-hover:translate-x-1 group-hover:text-emerald-300" />
        </button>
      </div>

      {/* Done Button */}
      <div className="border-t border-white/10 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="w-full border-white/15 bg-white/5 text-stone-300 hover:bg-white/10"
        >
          Done
        </Button>
      </div>
    </div>
  )
}
