import { useState, useEffect } from 'react'
import { Compass } from 'lucide-react'
import type { SpaceTemplateId } from '@/entities/space'
import type { KeepsakeCardData } from '@/features/create-space/lib/card-canvas-generator'
import type { SpaceMeta } from '@/features/create-space/model/scenes.types'
import { useStudioBehavior } from '@/features/create-space/ui/editor/useStudioBehavior'
import { THEME_REGISTRY } from '@/features/space-themes'
import { cn, playSpatialSfx } from '@/shared/lib'
import { shortenSanctuaryUrl } from '@/features/create-space/lib/url-shortener'
import { ShareActionsPanel } from './ShareActionsPanel'
import { ShareCardInlineEditor } from './ShareCardInlineEditor'
import { ShareDraftPanel } from './ShareDraftPanel'
import { SharePendingUpdatesBanner } from './SharePendingUpdatesBanner'
import { useShareActions } from './useShareActions'
import { openWhatsAppShare, openTelegramShare } from './share-messaging'
import { PrintableKeepsakeModal } from './print/PrintableKeepsakeModal'
import type {
  ShareCardCustomization,
  ShareColorTarget,
} from './share-customizer.types'
import '@/features/space-themes/birthday/birthday.css'
import '@/features/space-themes/romantic/romantic.css'
import '@/features/space-themes/friendship/friendship.css'

const SURFACE_CLASSES: Record<SpaceTemplateId, string> = {
  birthday: 'universe-birthday celebration-table-surface',
  anniversary: 'universe-romantic romantic-desk-surface',
  friendship: 'universe-friendship corkboard-surface',
}

export interface ShareSceneProps {
  spaceId?: string
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
  isPublished?: boolean
  isDirty?: boolean
  onOpenPublish?: () => void
  className?: string
}

export function ShareScene({
  spaceId,
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
  isPublished = false,
  isDirty = false,
  onOpenPublish,
  className,
}: ShareSceneProps) {
  const { isEditorMode } = useStudioBehavior()
  const isEffectiveEditor = Boolean(isStudioPreview) && isEditorMode

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)
  const [resolvedUrl, setResolvedUrl] = useState(url)

  useEffect(() => {
    let isMounted = true
    if (url) {
      shortenSanctuaryUrl(url).then((short) => {
        if (isMounted) setResolvedUrl(short)
      })
    }
    return () => {
      isMounted = false
    }
  }, [url])

  const activeTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday
  const activeShareUrl = resolvedUrl || url

  const cardData: KeepsakeCardData = {
    recipientName: spaceMeta.recipientName,
    url: activeShareUrl,
    accentColor: customization.qrColor,
    cardBg: customization.cardBg,
    textColor: customization.textColor,
    fontFamily: customization.fontFamily,
    qrStyle: customization.qrStyle,
    tapeColor: customization.tapeColor,
    note: customization.customNote,
  }

  const {
    isGenerating,
    copiedImage,
    copiedLink,
    socialFeedback,
    handleCopyCardImage,
    handleDownloadImage,
    handleCopyLink,
    handleShareSocial,
  } = useShareActions({
    cardData,
    recipientName: spaceMeta.recipientName,
    title: spaceMeta.title,
    shareUrl: activeShareUrl,
  })

  return (
    <div
      className={cn(
        '@container relative flex h-full min-h-full w-full flex-col items-center justify-between overflow-y-auto px-4 py-8 pb-24 select-none sm:px-6 sm:py-10 sm:pb-28 lg:px-12',
        SURFACE_CLASSES[templateId] ?? 'celebration-table-surface',
        className,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 bg-radial opacity-30 blur-3xl transition-all duration-1000',
          activeTheme.ambientGlow,
        )}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center space-y-6 sm:space-y-8">
        <div className="flex w-full max-w-xl flex-col items-center space-y-2 px-4 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-[#FAF6F0] sm:text-4xl">
            Share Your Sanctuary
          </h2>
          <p className="max-w-md font-sans text-xs text-[#A99B90] sm:text-sm">
            {isPublished
              ? 'Print a foldable keepsake card or share directly via messaging.'
              : 'Preview your keepsake dedication card or publish to share with your recipient.'}
          </p>
        </div>

        {/* Above-QR Alert when there are unpublished changes in a live sanctuary */}
        {isPublished && isDirty && (
          <SharePendingUpdatesBanner
            spaceId={spaceId}
            onOpenPublish={onOpenPublish}
          />
        )}

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
              url={activeShareUrl}
              customization={customization}
              selectedTarget={selectedTarget}
              onSelectTarget={onSelectTarget}
              isEditorMode={isEffectiveEditor && isPublished}
              isPublished={isPublished}
            />
          </div>

          <div className="w-full max-w-md lg:col-span-5">
            {isPublished ? (
              <ShareActionsPanel
                onCopyCardImage={handleCopyCardImage}
                onDownloadImage={handleDownloadImage}
                onOpenPrintModal={() => setIsPrintModalOpen(true)}
                onOpenWhatsApp={() =>
                  openWhatsAppShare({
                    recipientName: spaceMeta.recipientName,
                    url: activeShareUrl,
                  })
                }
                onOpenTelegram={() =>
                  openTelegramShare({
                    recipientName: spaceMeta.recipientName,
                    url: activeShareUrl,
                  })
                }
                onShareSocial={handleShareSocial}
                onCopyLink={handleCopyLink}
                isGenerating={isGenerating}
                copiedImage={copiedImage}
                copiedLink={copiedLink}
                socialFeedback={socialFeedback}
              />
            ) : (
              <ShareDraftPanel
                onOpenPublish={onOpenPublish}
                previewUrl={url}
                accentColor={activeTheme.accentColor}
              />
            )}
          </div>
        </div>
      </div>

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

      {isPrintModalOpen && (
        <PrintableKeepsakeModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          baseCardData={cardData}
        />
      )}
    </div>
  )
}
