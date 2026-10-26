import {
  Copy,
  Check,
  Download,
  Share2,
  MessageCircle,
  Printer,
  Send,
  Camera,
} from 'lucide-react'
import { Button } from '@/shared/ui'

export interface ShareActionsPanelProps {
  onCopyCardImage: () => void
  onDownloadImage: () => void
  onOpenPrintModal?: () => void
  onOpenWhatsApp?: () => void
  onOpenTelegram?: () => void
  onShareSocial?: () => void
  onCopyLink: () => void
  isGenerating: boolean
  copiedImage: boolean
  copiedLink: boolean
  socialFeedback?: 'shared' | 'copied' | null
}

export function ShareActionsPanel({
  onCopyCardImage,
  onDownloadImage,
  onOpenPrintModal,
  onOpenWhatsApp,
  onOpenTelegram,
  onShareSocial,
  onCopyLink,
  isGenerating,
  copiedImage,
  copiedLink,
  socialFeedback,
}: ShareActionsPanelProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-[#16120F]/90 p-5 shadow-2xl backdrop-blur-md select-none">
      {/* Section 1: Physical Keepsake & Print */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs font-semibold text-[#CF7056] italic">
            Physical Keepsake Card
          </span>
          <span className="rounded-full bg-white/5 px-2 py-0.5 font-sans text-[10px] text-stone-400">
            A6 / 4x6" Bi-fold
          </span>
        </div>

        {onOpenPrintModal && (
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={onOpenPrintModal}
            disabled={isGenerating}
            className="w-full cursor-pointer justify-center gap-2.5 py-3 shadow-md"
          >
            <Printer className="h-4 w-4" />
            <span>Print Foldable Keepsake Card</span>
          </Button>
        )}

        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCopyCardImage}
            disabled={isGenerating}
            className="cursor-pointer justify-center gap-1.5 text-xs"
          >
            {copiedImage ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-stone-400" />
                <span>Copy Postcard</span>
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onDownloadImage}
            disabled={isGenerating}
            className="cursor-pointer justify-center gap-1.5 text-xs"
          >
            <Download className="h-3.5 w-3.5 text-stone-400" />
            <span>Download PNG</span>
          </Button>
        </div>
      </div>

      {/* Dynamic Feedback Banners */}
      {copiedImage && (
        <div className="animate-fade-in rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-center font-sans text-xs text-emerald-300">
          ✨ <strong>Card image copied!</strong> Paste directly with{' '}
          <strong>Ctrl + V</strong> in your chat.
        </div>
      )}

      {socialFeedback === 'copied' && (
        <div className="animate-fade-in rounded-xl border border-sky-500/30 bg-sky-500/10 p-2.5 text-center font-sans text-xs text-sky-300">
          ✨ <strong>Caption & link copied!</strong> Ready to paste in Instagram
          or messages.
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Section 2: 1-Click Instant Sharing */}
      <div className="space-y-2.5">
        <span className="font-heading text-xs font-semibold text-[#CF7056] italic">
          Instant 1-Click Sharing
        </span>

        <div className="grid grid-cols-3 gap-2">
          {/* WhatsApp */}
          <button
            type="button"
            onClick={() => onOpenWhatsApp?.()}
            className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-stone-200 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/20 hover:text-white"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />
            <span className="font-sans text-[11px] font-medium">WhatsApp</span>
          </button>

          {/* Telegram */}
          <button
            type="button"
            onClick={() => onOpenTelegram?.()}
            className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-sky-500/20 bg-sky-500/10 p-2.5 text-stone-200 transition-all hover:border-sky-500/40 hover:bg-sky-500/20 hover:text-white"
          >
            <Send className="h-4 w-4 text-sky-400" />
            <span className="font-sans text-[11px] font-medium">Telegram</span>
          </button>

          {/* Stories / Social */}
          <button
            type="button"
            onClick={() => onShareSocial?.()}
            className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-stone-200 transition-all hover:border-rose-500/40 hover:bg-rose-500/20 hover:text-white"
          >
            <Camera className="h-4 w-4 text-rose-400" />
            <span className="font-sans text-[11px] font-medium">Stories</span>
          </button>
        </div>

        {/* Copy Plain Link */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCopyLink}
          className="w-full cursor-pointer justify-center gap-1.5 text-xs text-stone-400 hover:text-stone-200"
        >
          {copiedLink ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Short Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>Copy Direct Link Only</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
