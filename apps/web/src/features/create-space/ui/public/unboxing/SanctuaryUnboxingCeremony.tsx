import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import type { UnboxingCeremonyProps, UnboxingStage } from './unboxing.types'
import { UnboxingTemplateRenderer } from './unboxing-registry'
import { markSanctuaryAsUnboxed } from './unboxing-storage'
import { UnboxingTransitionOverlay } from './UnboxingTransitionOverlay'
import { playWelcomeChime } from './audio/welcome-chime-sfx'
import { cn, playSpatialSfx } from '@/shared/lib'

export function SanctuaryUnboxingCeremony({
  spaceId,
  spaceTitle,
  recipientName,
  senderName,
  dedicationMessage,
  templateId,
  accentColor = '#D97706',
  ambientGlow,
  hasAudioTrack,
  isPlayingAudio,
  onToggleAudio,
  onComplete,
}: UnboxingCeremonyProps) {
  const [stage, setStage] = useState<UnboxingStage>('sealed')

  const handleTriggerOpen = () => {
    if (stage !== 'sealed') return

    setStage('unwrapping')
    // Tactile acoustic feedback according to universe
    if (templateId === 'anniversary') {
      playSpatialSfx('wax-crack')
    } else if (templateId === 'friendship') {
      playSpatialSfx('paper-rustle')
    } else {
      playSpatialSfx('candle-spark')
    }

    // Play celestial welcome chord
    playWelcomeChime(0.65)

    // Stage 2: Bloom light flare
    setTimeout(() => {
      setStage('blooming')
    }, 750)

    // Stage 3: Complete & transition to stage
    setTimeout(() => {
      setStage('completed')
      markSanctuaryAsUnboxed(spaceId)
      onComplete()
    }, 1700)
  }

  return (
    <div className="relative flex h-full min-h-full w-full flex-1 flex-col items-center justify-center overflow-y-auto p-6 text-center select-none">
      {/* Background Ambient Theme Aura */}
      {ambientGlow && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 bg-radial opacity-35 blur-3xl transition-all duration-1000',
            ambientGlow,
          )}
          aria-hidden="true"
        />
      )}

      {/* Template-Specific Unboxing Experience */}
      <UnboxingTemplateRenderer
        templateId={templateId}
        recipientName={recipientName}
        senderName={senderName}
        spaceTitle={spaceTitle}
        dedicationMessage={dedicationMessage}
        accentColor={accentColor}
        stage={stage}
        onTriggerOpen={handleTriggerOpen}
      />

      {/* Ambient Audio Pill */}
      {hasAudioTrack && onToggleAudio && (
        <div className="relative z-20 mt-6">
          <button
            type="button"
            onClick={onToggleAudio}
            className="inline-flex cursor-pointer items-center gap-1.5 font-sans text-xs transition-colors hover:text-white"
            style={{ color: accentColor }}
          >
            {isPlayingAudio ? (
              <Volume2 className="h-3.5 w-3.5" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" />
            )}
            <span>
              {isPlayingAudio
                ? 'Soundscape active'
                : 'Tap to enable ambient soundscape'}
            </span>
          </button>
        </div>
      )}

      {/* Light Burst Transition Bloom Overlay */}
      <UnboxingTransitionOverlay stage={stage} accentColor={accentColor} />
    </div>
  )
}
