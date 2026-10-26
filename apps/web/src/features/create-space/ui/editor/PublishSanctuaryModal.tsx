import { useEffect } from 'react'
import { X, AlertCircle, RefreshCw } from 'lucide-react'
import type { UsePublishSanctuaryReturn } from '@/features/create-space/ui/editor/usePublishSanctuary'
import { PublishPreflightView } from './PublishPreflightView'
import { PublishProgressView } from './PublishProgressView'
import { PublishSuccessView } from './PublishSuccessView'
import { PublishAuthPrompt } from './PublishAuthPrompt'
import { Button } from '@/shared/ui'

export interface PublishSanctuaryModalProps {
  isOpen: boolean
  publishState: UsePublishSanctuaryReturn
  onClose: () => void
  onNavigateToScene?: (sceneId: string) => void
  accentColor?: string
}

export function PublishSanctuaryModal({
  isOpen,
  publishState,
  onClose,
  onNavigateToScene,
  accentColor = '#D97706',
}: PublishSanctuaryModalProps) {
  const {
    publishStep,
    validation,
    isPublishing,
    shortenedUrl,
    publishedUrl,
    errorMessage,
    confirmPublish,
    retryPublish,
  } = publishState

  // Keyboard shortcut Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isPublishing) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isPublishing, onClose])

  if (!isOpen || publishStep === 'idle') return null

  const targetShareUrl = shortenedUrl || publishedUrl || ''
  const recipientName = validation?.summary.recipientName || 'Someone Special'

  const handleOpenPublicView = () => {
    if (targetShareUrl) {
      window.open(targetShareUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleNavigateToShare = () => {
    onClose()
    onNavigateToScene?.('share')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Publish Space"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md select-none sm:p-6"
    >
      <div className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#16120F] p-6 text-[#FAF6F0] shadow-2xl sm:p-8">
        {/* Close Button (disabled while publishing) */}
        {!isPublishing && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* View Switching */}
        {publishStep === 'preflight' && validation && (
          <PublishPreflightView
            validation={validation}
            isPublishing={isPublishing}
            onConfirm={confirmPublish}
            onClose={onClose}
            onNavigateToScene={(sceneId) => {
              onClose()
              onNavigateToScene?.(sceneId)
            }}
            accentColor={accentColor}
          />
        )}

        {publishStep === 'auth_prompt' && (
          <PublishAuthPrompt onClose={onClose} accentColor={accentColor} />
        )}

        {(publishStep === 'uploading' || publishStep === 'persisting') && (
          <PublishProgressView
            step={publishStep}
            pendingPhotosCount={validation?.summary.pendingPhotosCount}
            accentColor={accentColor}
          />
        )}

        {publishStep === 'success' && (
          <PublishSuccessView
            shareUrl={targetShareUrl}
            recipientName={recipientName}
            onClose={onClose}
            onNavigateToShare={handleNavigateToShare}
            onOpenPublicView={handleOpenPublicView}
            accentColor={accentColor}
          />
        )}

        {publishStep === 'error' && (
          <div className="space-y-6 py-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 text-rose-300">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-medium text-[#FAF6F0]">
                Publication Paused
              </h3>
              <p className="max-w-sm font-sans text-xs text-stone-300">
                {errorMessage ||
                  'Something interrupted the cloud sync. Your local changes are safe.'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-white/15 bg-white/5 text-stone-300 hover:bg-white/10"
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={retryPublish}
                style={{ backgroundColor: accentColor }}
                className="flex items-center gap-2 font-medium text-[#1A120B]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry Publishing</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
