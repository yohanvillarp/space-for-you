import { QrCode } from 'lucide-react'
import { StylizedQrCode } from '@/features/create-space/ui/StylizedQrCode'
import { WashiTape } from '@/features/space-themes/shared'
import type {
  ShareCardCustomization,
  ShareColorTarget,
} from './share-customizer.types'
import { SHARE_FONT_OPTIONS } from './share-customizer.types'
import { cn } from '@/shared/lib'

export interface ShareCardInlineEditorProps {
  recipientName: string
  onRecipientNameChange?: (name: string) => void
  customNote: string
  onCustomNoteChange?: (note: string) => void
  url: string
  customization: ShareCardCustomization
  selectedTarget: ShareColorTarget
  onSelectTarget: (target: ShareColorTarget) => void
  isEditorMode?: boolean
  isPublished?: boolean
  className?: string
}

export function ShareCardInlineEditor({
  recipientName,
  onRecipientNameChange,
  customNote,
  onCustomNoteChange,
  url,
  customization,
  selectedTarget,
  onSelectTarget,
  isEditorMode = true,
  isPublished = true,
  className,
}: ShareCardInlineEditorProps) {
  const currentFont =
    SHARE_FONT_OPTIONS.find((f) => f.id === customization.fontFamily) ??
    SHARE_FONT_OPTIONS[0]

  return (
    <div
      className={cn(
        'relative flex flex-col items-center select-none',
        className,
      )}
    >
      {/* Dedication Card Canvas */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectTarget('card')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSelectTarget('card')
        }}
        style={{ backgroundColor: customization.cardBg }}
        className={cn(
          'relative w-full max-w-md transform space-y-6 rounded-3xl p-8 text-center shadow-2xl transition-all duration-300 sm:p-10',
          isEditorMode && selectedTarget === 'card'
            ? 'ring-2 ring-amber-400 ring-offset-4 ring-offset-black'
            : 'border border-black/10 hover:border-black/20',
        )}
      >
        {/* Top Washi Tape */}
        <div className="pointer-events-none absolute -top-3 left-1/2 z-10 -translate-x-1/2">
          <WashiTape color={customization.tapeColor} tilt="left" />
        </div>

        {/* Recipient Header (Directly Inline Editable) */}
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            onSelectTarget('text')
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSelectTarget('text')
          }}
          className={cn(
            'group/text relative rounded-2xl p-2 transition-all',
            isEditorMode &&
              selectedTarget === 'text' &&
              'bg-black/5 ring-2 ring-amber-400/80',
          )}
        >
          {isEditorMode ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1.5">
                <span
                  style={{ color: customization.textColor }}
                  className={cn(
                    'text-2xl font-medium tracking-tight opacity-75 sm:text-3xl',
                    currentFont.familyClass,
                  )}
                >
                  For
                </span>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => onRecipientNameChange?.(e.target.value)}
                  placeholder="Recipient Name..."
                  aria-label="Recipient Name"
                  maxLength={35}
                  style={{ color: customization.textColor }}
                  className={cn(
                    'w-48 rounded-lg border border-transparent bg-transparent py-0.5 text-center text-2xl font-medium tracking-tight transition-all select-text hover:border-black/20 hover:bg-black/5 focus:border-amber-400 focus:bg-white/40 focus:ring-1 focus:ring-amber-400 focus:outline-none sm:w-56 sm:text-3xl',
                    currentFont.familyClass,
                  )}
                />
              </div>

              <input
                type="text"
                value={customNote}
                onChange={(e) => onCustomNoteChange?.(e.target.value)}
                placeholder="A quiet message for them..."
                aria-label="Invitation Note"
                maxLength={90}
                style={{ color: customization.textColor }}
                className={cn(
                  'mx-auto w-full max-w-xs rounded-lg border border-transparent bg-transparent py-0.5 text-center text-xs italic opacity-90 transition-all select-text hover:border-black/20 hover:bg-black/5 focus:border-amber-400 focus:bg-white/40 focus:ring-1 focus:ring-amber-400 focus:outline-none sm:text-sm',
                  currentFont.familyClass,
                )}
              />
            </div>
          ) : (
            <div className="space-y-1.5 pt-2">
              <h3
                style={{ color: customization.textColor }}
                className={cn(
                  'text-3xl font-medium tracking-tight sm:text-4xl',
                  currentFont.familyClass,
                )}
              >
                {recipientName ? `For ${recipientName}` : 'A Space for You'}
              </h3>
              <p
                style={{ color: customization.textColor }}
                className={cn(
                  'mx-auto max-w-xs text-xs leading-relaxed italic opacity-85 sm:text-sm',
                  currentFont.familyClass,
                )}
              >
                &ldquo;{customNote}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Stylized QR Code or Draft Placeholder */}
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            if (isPublished) onSelectTarget('qr')
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isPublished) onSelectTarget('qr')
          }}
          className={cn(
            'group/qr relative flex flex-col items-center justify-center rounded-2xl p-3 transition-all',
            isEditorMode &&
              isPublished &&
              selectedTarget === 'qr' &&
              'bg-amber-400/5 ring-2 ring-amber-400',
          )}
        >
          {isPublished ? (
            <StylizedQrCode
              url={url}
              accentColor={customization.qrColor}
              qrStyle={customization.qrStyle}
              size={220}
              className="shadow-sm transition-transform duration-300 group-hover/qr:scale-105"
            />
          ) : (
            <div className="flex h-[220px] w-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/20 bg-black/[0.03] p-5 text-center shadow-inner">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-700">
                <QrCode className="h-6 w-6" />
              </div>
              <p
                style={{ color: customization.textColor }}
                className={cn(
                  'mt-3 text-sm font-medium tracking-tight',
                  currentFont.familyClass,
                )}
              >
                Keepsake QR Code
              </p>
              <p
                style={{ color: customization.textColor }}
                className={cn(
                  'mt-1 max-w-[170px] text-[11px] leading-snug opacity-75',
                  currentFont.familyClass,
                )}
              >
                Unlocks and generates automatically when you publish.
              </p>
            </div>
          )}
        </div>

        {/* Scan Prompt & Signature */}
        <div className="space-y-1.5 border-t border-black/10 pt-3">
          <p
            style={{ color: customization.textColor }}
            className={cn('text-xs italic opacity-75', currentFont.familyClass)}
          >
            {isPublished
              ? 'Scan with your camera to open'
              : 'Will be scan-ready once published'}
          </p>
          <p
            className={cn(
              'text-xs font-medium italic',
              currentFont.familyClass,
            )}
            style={{ color: customization.qrColor }}
          >
            ✦ Created with love ✦
          </p>
        </div>
      </div>
    </div>
  )
}
