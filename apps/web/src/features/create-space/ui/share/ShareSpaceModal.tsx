import { useEffect } from 'react'
import { X } from 'lucide-react'
import { ShareableKeepsakeCard } from '@/features/create-space/ui/ShareableKeepsakeCard'

export interface ShareSpaceModalProps {
  isOpen: boolean
  onClose: () => void
  recipientName: string
  onRecipientNameChange?: (name: string) => void
  title: string
  stageName: string
  url: string
  accentColor: string
  tapeColor?: 'rose' | 'gold' | 'sage'
}

export function ShareSpaceModal({
  isOpen,
  onClose,
  recipientName,
  onRecipientNameChange,
  title,
  stageName,
  url,
  accentColor,
  tapeColor = 'rose',
}: ShareSpaceModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share Your Space"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:p-6"
    >
      <div className="relative my-auto max-h-[92vh] w-full max-w-4xl scrollbar-none overflow-y-auto rounded-3xl border border-[#3B302A] bg-[#16120F] p-5 text-[#FAF6F0] shadow-2xl sm:p-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#3B302A] pb-4">
          <div className="space-y-1">
            <h2 className="font-heading text-xl font-medium tracking-tight text-[#FAF6F0] sm:text-2xl">
              Share Your Space
            </h2>
            <p className="font-sans text-xs text-[#A99B90]">
              Copy your customized keepsake card to paste directly into
              WhatsApp, or download high-res PNG.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="cursor-pointer rounded-full p-2 text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Keepsake Card Generator */}
        <div className="pt-6">
          <ShareableKeepsakeCard
            recipientName={recipientName}
            onRecipientNameChange={onRecipientNameChange}
            title={title}
            stageName={stageName}
            url={url}
            accentColor={accentColor}
            tapeColor={tapeColor}
          />
        </div>
      </div>
    </div>
  )
}
