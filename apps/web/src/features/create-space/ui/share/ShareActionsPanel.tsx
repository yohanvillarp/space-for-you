import { Copy, Check, Download, Share2, MessageCircle } from 'lucide-react'
import { Button } from '@/shared/ui'

export interface ShareActionsPanelProps {
  onCopyCardImage: () => void
  onDownloadImage: () => void
  onOpenWhatsApp: () => void
  onCopyLink: () => void
  isGenerating: boolean
  copiedImage: boolean
  copiedLink: boolean
}

export function ShareActionsPanel({
  onCopyCardImage,
  onDownloadImage,
  onOpenWhatsApp,
  onCopyLink,
  isGenerating,
  copiedImage,
  copiedLink,
}: ShareActionsPanelProps) {
  return (
    <div className="border-border-base/70 bg-bg-surface/80 space-y-3.5 rounded-2xl border p-5 shadow-xs backdrop-blur-md">
      <span className="font-heading text-primary text-xs font-semibold italic">
        Share Options
      </span>

      {/* Primary WhatsApp copy button */}
      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={onCopyCardImage}
        disabled={isGenerating}
        className="w-full cursor-pointer justify-center gap-2.5 py-3.5 shadow-md"
      >
        {copiedImage ? (
          <>
            <Check className="h-5 w-5 text-white" />
            <span>Card Copied! Paste (Ctrl+V) in WhatsApp</span>
          </>
        ) : (
          <>
            <Copy className="h-5 w-5" />
            <span>
              {isGenerating ? 'Generating Card...' : 'Copy Card for WhatsApp'}
            </span>
          </>
        )}
      </Button>

      {/* Feedback banner when copied */}
      {copiedImage && (
        <div className="animate-fade-in rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center font-sans text-xs text-emerald-600 dark:text-emerald-400">
          ✨ <strong>¡Tarjeta copiada con éxito!</strong> Abre cualquier chat de
          WhatsApp y presiona <strong>Ctrl + V</strong> para pegarla.
        </div>
      )}

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onDownloadImage}
          disabled={isGenerating}
          className="cursor-pointer justify-center gap-2"
        >
          <Download className="h-4 w-4" />
          <span>Download PNG</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onOpenWhatsApp}
          className="cursor-pointer justify-center gap-2 text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Send via WhatsApp</span>
        </Button>
      </div>

      {/* Copy Plain Link */}
      <div className="pt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCopyLink}
          className="text-text-secondary w-full cursor-pointer justify-center gap-1.5 text-xs"
        >
          {copiedLink ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-600">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>Copy Plain URL Only</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
