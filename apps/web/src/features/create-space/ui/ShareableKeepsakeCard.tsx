import { useState } from 'react'
import { KeepsakeCardPreview } from './share/KeepsakeCardPreview'
import { ShareActionsPanel } from './share/ShareActionsPanel'
import {
  generateKeepsakeCardCanvas,
  copyCardImageToClipboard,
  downloadCardImage,
} from '@/features/create-space/lib/card-canvas-generator'
import type { KeepsakeCardData } from '@/features/create-space/lib/card-canvas-generator'
import { cn } from '@/shared/lib'

export interface ShareableKeepsakeCardProps {
  recipientName: string
  title: string
  stageName: string
  url: string
  accentColor: string
  tapeColor?: 'rose' | 'gold' | 'sage'
  onRecipientNameChange?: (name: string) => void
  className?: string
}

export function ShareableKeepsakeCard({
  recipientName,
  url,
  accentColor,
  tapeColor = 'rose',
  onRecipientNameChange,
  className,
}: ShareableKeepsakeCardProps) {
  const [copiedImage, setCopiedImage] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [customNote, setCustomNote] = useState(
    'A quiet, private world meant solely for you.',
  )

  const cardData: KeepsakeCardData = {
    recipientName,
    url,
    accentColor,
    tapeColor,
    note: customNote,
  }

  const handleCopyCardImage = async () => {
    setIsGenerating(true)
    try {
      const canvas = await generateKeepsakeCardCanvas(cardData)
      const success = await copyCardImageToClipboard(canvas)
      if (success) {
        setCopiedImage(true)
        setTimeout(() => setCopiedImage(false), 3500)
      } else {
        downloadCardImage(
          canvas,
          `invitation-for-${recipientName || 'you'}.png`,
        )
      }
    } catch (err) {
      console.error('Error copying card image:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadImage = async () => {
    setIsGenerating(true)
    try {
      const canvas = await generateKeepsakeCardCanvas(cardData)
      downloadCardImage(canvas, `invitation-for-${recipientName || 'you'}.png`)
    } catch (err) {
      console.error('Error downloading card image:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    } catch {
      // Fallback
    }
  }

  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      `He creado un espacio digital íntimo especialmente para ti. Abre este enlace: ${url}`,
    )
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank')
  }

  return (
    <div
      className={cn(
        'grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-12',
        className,
      )}
    >
      {/* Left Column: Keepsake Gift Card Preview */}
      <KeepsakeCardPreview
        recipientName={recipientName}
        url={url}
        accentColor={accentColor}
        tapeColor={tapeColor}
        customNote={customNote}
      />

      {/* Right Column: Customization Controls & Sharing Actions */}
      <div className="space-y-6 lg:col-span-5">
        {/* Recipient Customization Box */}
        <div className="border-border-base/70 bg-bg-surface/80 space-y-4 rounded-2xl border p-5 shadow-xs backdrop-blur-md">
          <div className="space-y-1">
            <span className="font-heading text-primary text-xs font-semibold italic">
              Personalize Your Invitation
            </span>
            <h4 className="font-heading text-text-primary text-lg font-medium">
              Card Dedication
            </h4>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-text-secondary mb-1 block font-sans text-xs font-medium">
                Recipient&apos;s Name
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => onRecipientNameChange?.(e.target.value)}
                placeholder="e.g. Sophia, Leo, Mateo"
                className="border-border-base bg-bg-surface text-text-primary focus:ring-primary/30 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-text-secondary mb-1 block font-sans text-xs font-medium">
                Invitation Note
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="A quiet message for them..."
                className="border-border-base bg-bg-surface text-text-primary focus:ring-primary/30 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons Panel */}
        <ShareActionsPanel
          onCopyCardImage={handleCopyCardImage}
          onDownloadImage={handleDownloadImage}
          onOpenWhatsApp={handleOpenWhatsApp}
          onCopyLink={handleCopyLink}
          isGenerating={isGenerating}
          copiedImage={copiedImage}
          copiedLink={copiedLink}
        />
      </div>
    </div>
  )
}
