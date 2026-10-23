import { StylizedQrCode } from '../StylizedQrCode'
import { WashiTape } from '@/features/space-themes/shared'

export interface KeepsakeCardPreviewProps {
  recipientName: string
  url: string
  accentColor: string
  tapeColor?: 'rose' | 'gold' | 'sage'
  customNote: string
}

export function KeepsakeCardPreview({
  recipientName,
  url,
  accentColor,
  tapeColor = 'rose',
  customNote,
}: KeepsakeCardPreviewProps) {
  return (
    <div className="flex flex-col items-center justify-center lg:col-span-7">
      <div className="relative w-full max-w-md transform space-y-6 rounded-3xl border border-stone-200/90 bg-[#FAF7F2] p-8 text-center text-[#221915] shadow-2xl transition-transform select-none hover:scale-[1.01] sm:p-10">
        {/* Top Washi Tape */}
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
          <WashiTape color={tapeColor} tilt="left" />
        </div>

        {/* Recipient Header */}
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

        {/* Scan Prompt & Signature */}
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

      <p className="text-text-muted pt-3 text-center font-sans text-xs">
        This card image is rendered in high resolution and can be pasted
        directly into WhatsApp.
      </p>
    </div>
  )
}
