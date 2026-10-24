import { useState } from 'react'
import { Compass, Share2 } from 'lucide-react'
import type { SpaceMeta } from '@/features/create-space/model/scenes.types'
import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { ShareCardInlineEditor } from './ShareCardInlineEditor'
import { ShareActionsPanel } from './ShareActionsPanel'
import type {
  ShareCardCustomization,
  ShareColorTarget,
} from './share-customizer.types'
import {
  generateKeepsakeCardCanvas,
  copyCardImageToClipboard,
  downloadCardImage,
} from '@/features/create-space/lib/card-canvas-generator'
import type { KeepsakeCardData } from '@/features/create-space/lib/card-canvas-generator'
import { useStudioBehavior } from '@/features/create-space/ui/editor/useStudioBehavior'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface ShareSceneProps {
  templateId?: SpaceTemplateId
  spaceMeta: SpaceMeta
  onChangeSpaceMeta: (updates: Partial<SpaceMeta>) => void
  url: string
  customization: ShareCardCustomization
  selectedTarget: ShareColorTarget
  onSelectTarget: (target: ShareColorTarget) => void
  onUpdateCustomization: (updates: Partial<ShareCardCustomization>) => void
  onBackToHub: () => void
  isStudioPreview?: boolean
  className?: string
}

export function ShareScene({
  templateId = 'birthday',
  spaceMeta,
  onChangeSpaceMeta,
  url,
  customization,
  selectedTarget,
  onSelectTarget,
  onUpdateCustomization,
  onBackToHub,
  isStudioPreview = true,
  className,
}: ShareSceneProps) {
  const { isEditorMode } = useStudioBehavior()
  const isEffectiveEditor = Boolean(isStudioPreview) && isEditorMode

  const [copiedImage, setCopiedImage] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday

  const cardData: KeepsakeCardData = {
    recipientName: spaceMeta.recipientName,
    url,
    accentColor: customization.qrColor,
    tapeColor: customization.tapeColor,
    note: customization.customNote,
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
          `invitation-for-${spaceMeta.recipientName || 'you'}.png`,
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
      downloadCardImage(
        canvas,
        `invitation-for-${spaceMeta.recipientName || 'you'}.png`,
      )
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
        '@container relative flex h-full min-h-full w-full flex-col items-center justify-between overflow-y-auto px-4 py-8 pb-24 select-none sm:px-6 sm:py-10 sm:pb-28 lg:px-12',
        className,
      )}
    >
      {/* Dynamic Ambient Theme Glow */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 bg-radial opacity-30 blur-3xl transition-all duration-1000',
          activeTheme.ambientGlow,
        )}
        aria-hidden="true"
      />

      {/* Main Share Workspace */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center space-y-8 sm:space-y-10">
        {/* Editorial Scene Header */}
        <div className="flex w-full max-w-xl flex-col items-center space-y-2 px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 font-sans text-xs text-amber-300">
            <Share2 className="h-3.5 w-3.5" />
            <span>Invitation Keepsake</span>
          </div>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-[#FAF6F0] sm:text-4xl">
            Share Your Sanctuary
          </h2>
          <p className="max-w-md font-sans text-xs text-[#A99B90] sm:text-sm">
            {isEffectiveEditor
              ? 'Click directly on the card texts to edit them, or pick styles in the sidebar.'
              : 'Scan or copy your high-res dedication card to send via WhatsApp.'}
          </p>
        </div>

        {/* Center Grid: Interactive Card + Actions Panel */}
        <div className="grid w-full grid-cols-1 items-start justify-items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex w-full justify-center lg:col-span-7">
            <ShareCardInlineEditor
              recipientName={spaceMeta.recipientName}
              onRecipientNameChange={(name) =>
                onChangeSpaceMeta({ recipientName: name })
              }
              customNote={customization.customNote}
              onCustomNoteChange={(note) =>
                onUpdateCustomization({ customNote: note })
              }
              url={url}
              customization={customization}
              selectedTarget={selectedTarget}
              onSelectTarget={onSelectTarget}
              isEditorMode={isEffectiveEditor}
            />
          </div>

          <div className="w-full max-w-md lg:col-span-5">
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
      </div>

      {/* Return to Hub Button for User Mode */}
      {!isEffectiveEditor && (
        <div className="relative z-10 mt-10 pt-4">
          <button
            type="button"
            onClick={() => {
              playSpatialSfx('tactile-tap')
              onBackToHub()
            }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-[#17120F]/90 px-5 py-2 font-sans text-xs font-medium text-stone-200 shadow-xl backdrop-blur-md transition-all hover:border-amber-400 hover:text-amber-200 hover:shadow-2xl"
          >
            <Compass className="h-4 w-4 text-amber-300" />
            <span>Explore Space Hub</span>
          </button>
        </div>
      )}
    </div>
  )
}
