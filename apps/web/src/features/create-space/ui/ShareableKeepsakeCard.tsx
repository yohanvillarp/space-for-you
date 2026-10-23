import { useState } from 'react'
import { Copy, Check, Download, Share2, MessageCircle } from 'lucide-react'
import { StylizedQrCode } from './StylizedQrCode'
import { WashiTape } from '@/features/space-themes/shared'
import {
  generateKeepsakeCardCanvas,
  copyCardImageToClipboard,
  downloadCardImage,
} from '../lib/card-canvas-generator'
import type { KeepsakeCardData } from '../lib/card-canvas-generator'
import { Button } from '@/shared/ui'
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
      {/* Left Column: Intimate Keepsake Gift Card Preview (Col 7) */}
      <div className="flex flex-col items-center justify-center lg:col-span-7">
        {/* Pure Cotton Gift Card (Zero Software Slogans or Tech Noise) */}
        <div className="relative w-full max-w-md transform space-y-6 rounded-3xl border border-stone-200/90 bg-[#FAF7F2] p-8 text-center text-[#221915] shadow-2xl transition-transform select-none hover:scale-[1.01] sm:p-10">
          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
            <WashiTape color={tapeColor} tilt="left" />
          </div>

          {/* Intimate Recipient Header */}
          <div className="space-y-1.5 pt-2">
            <h3 className="font-heading text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
              {recipientName ? `For ${recipientName}` : 'A Space for You'}
            </h3>
            <p className="font-heading mx-auto max-w-xs text-xs leading-relaxed text-stone-600 italic sm:text-sm">
              &ldquo;{customNote}&rdquo;
            </p>
          </div>

          {/* Centered Stylized QR Code on Card */}
          <div className="flex flex-col items-center justify-center py-2">
            <StylizedQrCode
              url={url}
              accentColor={accentColor}
              size={220}
              className="shadow-sm"
            />
          </div>

          {/* Simple, Pure Scan Prompt & Intimate Signature */}
          <div className="space-y-2 border-t border-black/5 pt-2">
            <p className="font-heading text-xs text-stone-700 italic">
              Scan with your camera to open
            </p>
            <p
              className="font-heading text-xs font-medium italic"
              style={{ color: accentColor }}
            >
              ✦ Created with love ✦
            </p>
          </div>
        </div>

        {/* Discreet guidance below the card */}
        <p className="text-text-muted pt-3 text-center font-sans text-xs">
          This card image is rendered in high resolution and can be pasted
          directly into WhatsApp.
        </p>
      </div>

      {/* Right Column: Customization Controls & Sharing Actions (Col 5) */}
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

        {/* Primary Action Buttons: Copy as Image for WhatsApp */}
        <div className="border-border-base/70 bg-bg-surface/80 space-y-3.5 rounded-2xl border p-5 shadow-xs backdrop-blur-md">
          <span className="font-heading text-primary text-xs font-semibold italic">
            Share Options
          </span>

          {/* BIG BUTTON: Copiar Tarjeta para WhatsApp */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleCopyCardImage}
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
                  {isGenerating
                    ? 'Generating Card...'
                    : 'Copy Card for WhatsApp'}
                </span>
              </>
            )}
          </Button>

          {/* Feedback banner when copied */}
          {copiedImage && (
            <div className="animate-fade-in rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center font-sans text-xs text-emerald-600 dark:text-emerald-400">
              ✨ <strong>¡Tarjeta copiada con éxito!</strong> Abre cualquier
              chat de WhatsApp y presiona <strong>Ctrl + V</strong> para
              pegarla.
            </div>
          )}

          {/* Secondary Actions Grid */}
          <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
            {/* Download PNG */}
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="cursor-pointer justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Download PNG</span>
            </Button>

            {/* Open WhatsApp Web */}
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleOpenWhatsApp}
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
              onClick={handleCopyLink}
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
      </div>
    </div>
  )
}
