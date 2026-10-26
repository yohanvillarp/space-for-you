import { Heart, ArrowRight, Volume2, VolumeX } from 'lucide-react'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface SanctuaryWelcomeIntroProps {
  spaceTitle: string
  recipientName: string
  senderName?: string
  dedicationMessage?: string
  accentColor?: string
  ambientGlow?: string
  isPlayingAudio?: boolean
  hasAudioTrack?: boolean
  onToggleAudio?: () => void
  onEnter: () => void
}

export function SanctuaryWelcomeIntro({
  spaceTitle,
  recipientName,
  senderName,
  dedicationMessage,
  accentColor = '#D97706',
  ambientGlow,
  isPlayingAudio,
  hasAudioTrack,
  onToggleAudio,
  onEnter,
}: SanctuaryWelcomeIntroProps) {
  const handleProceed = () => {
    playSpatialSfx('pop-snap')
    onEnter()
  }

  return (
    <div className="animate-fade-in relative flex h-full min-h-full w-full flex-1 flex-col items-center justify-center overflow-y-auto p-6 text-center select-none">
      {/* Background Ambient Aura */}
      {ambientGlow && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 bg-radial opacity-35 blur-3xl transition-all duration-1000',
            ambientGlow,
          )}
          aria-hidden="true"
        />
      )}

      <div
        className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border shadow-2xl transition-transform duration-500 hover:scale-105"
        style={{
          borderColor: `${accentColor}55`,
          backgroundColor: `${accentColor}15`,
        }}
      >
        <Heart
          className="h-9 w-9"
          style={{
            fill: `${accentColor}33`,
            color: accentColor,
          }}
        />
      </div>

      <span
        className="font-heading text-xs font-semibold tracking-widest uppercase sm:text-sm"
        style={{ color: accentColor }}
      >
        A dedicated digital space
      </span>

      <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight text-white sm:text-5xl">
        {spaceTitle}
      </h1>

      <p className="mt-3 max-w-md font-sans text-sm text-stone-300 sm:text-base">
        Crafted with heartfelt love for{' '}
        <strong className="font-medium text-white">
          {recipientName || 'Someone Special'}
        </strong>
        {senderName ? ` by ${senderName}` : ''}.
      </p>

      {dedicationMessage && (
        <div className="mt-6 max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-xl backdrop-blur-md">
          <p className="font-heading text-center text-sm leading-relaxed text-stone-200 italic sm:text-base">
            “{dedicationMessage}”
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleProceed}
          className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-8 py-3.5 font-sans text-sm font-semibold text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
          style={{
            borderColor: `${accentColor}88`,
            backgroundColor: `${accentColor}33`,
          }}
        >
          <span>Open Your Space</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        {hasAudioTrack && onToggleAudio && (
          <button
            type="button"
            onClick={onToggleAudio}
            className="mt-1 inline-flex cursor-pointer items-center gap-1.5 font-sans text-xs transition-colors hover:text-white"
            style={{ color: accentColor }}
          >
            {isPlayingAudio ? (
              <Volume2 className="h-3.5 w-3.5" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" />
            )}
            <span>
              {isPlayingAudio
                ? 'Background music playing'
                : 'Tap to enable background music'}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
