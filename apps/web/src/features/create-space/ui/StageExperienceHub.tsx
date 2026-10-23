import { useState } from 'react'
import { ExternalLink, Copy, Check, Smartphone, Sparkles } from 'lucide-react'
import { THEME_REGISTRY } from '@/features/space-themes'
import type { SpaceTemplateId } from '@/entities/space'
import { StylizedQrCode } from './StylizedQrCode'
import { WashiTape } from '@/features/space-themes/shared'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib'

export interface StageExperienceHubProps {
  templateId: SpaceTemplateId
  className?: string
}

export function StageExperienceHub({
  templateId,
  className,
}: StageExperienceHubProps) {
  const [copied, setCopied] = useState(false)
  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday

  // Construct the absolute preview URL
  const previewPath = `/spaces/preview/${templateId}`
  const fullPreviewUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${previewPath}`
      : previewPath

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullPreviewUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
    }
  }

  const getTapeColor = () => {
    switch (templateId) {
      case 'birthday':
        return 'gold'
      case 'anniversary':
        return 'rose'
      case 'friendship':
        return 'sage'
      default:
        return 'gold'
    }
  }

  return (
    <div className={cn('relative w-full space-y-6', className)}>
      {/* Dynamic Ambient Radiant Backlight */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-4 rounded-3xl bg-radial opacity-60 blur-2xl transition-all duration-700',
          activeTheme.ambientGlow,
        )}
      />

      {/* Main Experience Card */}
      <div className="border-border-base/70 bg-bg-surface/85 relative space-y-6 overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-xl sm:p-8">
        {/* Header with Title & Badge */}
        <div className="border-border-base/50 flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: activeTheme.accentColor }}
                aria-hidden="true"
              />
              <span className="font-heading text-primary text-xs font-semibold italic">
                {activeTheme.stageName}
              </span>
            </div>
            <h3 className="font-heading text-text-primary text-xl font-medium tracking-tight sm:text-2xl">
              Test on Your Mobile Device
            </h3>
          </div>

          <div className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 font-sans text-xs font-medium sm:self-auto">
            <Sparkles className="h-3.5 w-3.5" />
            <span>100% Recipient View</span>
          </div>
        </div>

        {/* Center: Stylized QR Code with Washi Tape & Scanning Cue */}
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <div className="relative">
            {/* Washi Tape on top of QR Card */}
            <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
              <WashiTape color={getTapeColor()} tilt="left" />
            </div>

            {/* Stylized QR Code Component */}
            <StylizedQrCode
              url={fullPreviewUrl}
              accentColor={activeTheme.accentColor}
              size={210}
            />
          </div>

          {/* Scanning Guidance */}
          <div className="text-text-secondary flex items-center gap-2 pt-1 text-center font-sans text-xs">
            <Smartphone className="text-primary h-4 w-4 shrink-0" />
            <span>
              Point your phone camera to open the live stage on your screen
            </span>
          </div>
        </div>

        {/* Action Controls: Fullscreen in New Tab & Copy Link */}
        <div className="border-border-base/50 flex flex-col items-center justify-center gap-3 border-t pt-2 sm:flex-row">
          <Button
            asChild
            variant="primary"
            size="md"
            className="w-full cursor-pointer gap-2 shadow-xs sm:w-auto"
          >
            <a href={previewPath} target="_blank" rel="noopener noreferrer">
              <span>Open in Fullscreen</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleCopyLink}
            className="w-full cursor-pointer gap-2 sm:w-auto"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">
                  Link Copied!
                </span>
              </>
            ) : (
              <>
                <Copy className="text-text-muted h-4 w-4" />
                <span>Copy Preview Link</span>
              </>
            )}
          </Button>
        </div>

        {/* Stage Atmospheric Summary */}
        <div className="bg-bg-subtle/70 border-border-base/40 text-text-secondary flex items-start gap-2.5 rounded-xl border p-3.5 font-sans text-xs">
          <span className="text-base select-none">✨</span>
          <p className="leading-relaxed">
            <strong className="text-text-primary font-medium">
              {activeTheme.title}:
            </strong>{' '}
            {activeTheme.mood}. Letters, photographs, and personal audio will be
            penned in Step 2.
          </p>
        </div>
      </div>
    </div>
  )
}
