import { useState } from 'react'
import { ArrowRight, RotateCcw, LockOpen, Lock, HelpCircle } from 'lucide-react'
import type { SpaceProtectionConfig } from '@/features/space-lock/model/lock.types'
import { SpatialVaultObject } from '@/features/space-lock/ui/SpatialVaultObject'
import { LockKeypad } from '@/features/space-lock/ui/LockKeypad'
import { GateAtmosphereBackdrop } from '@/features/space-lock/ui/GateAtmosphereBackdrop'
import { Button } from '@/shared/ui'
import { playSpatialSfx } from '@/shared/lib'

export interface LockGateSceneProps {
  config: SpaceProtectionConfig
  spaceTitle?: string
  recipientName?: string
  isStudioPreview?: boolean
  onChangeConfig?: (updates: Partial<SpaceProtectionConfig>) => void
  onProceedToStage?: () => void
  onVerifyPasscode?: (code: string) => Promise<{
    success: boolean
    errorMessage?: string
  }>
}

export function LockGateScene({
  config,
  spaceTitle = 'A Secret Keepsake',
  recipientName: _recipientName,
  isStudioPreview = false,
  onChangeConfig,
  onProceedToStage,
  onVerifyPasscode,
}: LockGateSceneProps) {
  const [isUnlocked, setIsUnlocked] = useState(() => !config.enabled)
  const [showHint, setShowHint] = useState(false)

  // Keep lock state synchronized with configuration toggle
  const [prevEnabled, setPrevEnabled] = useState(config.enabled)
  if (prevEnabled !== config.enabled) {
    setPrevEnabled(config.enabled)
    setIsUnlocked(!config.enabled)
  }

  const handleUnlockSuccess = () => {
    setIsUnlocked(true)
    if (!isStudioPreview && onProceedToStage) {
      setTimeout(() => {
        onProceedToStage()
      }, 900)
    }
  }

  const displayTitle =
    config.customTitle !== undefined && config.customTitle !== ''
      ? config.customTitle
      : spaceTitle

  const defaultSubtitle = config.enabled
    ? 'Enter the secret combination to unlock'
    : 'Sanctuary is unlocked and open'
  const displaySubtitle =
    config.customSubtitle !== undefined && config.customSubtitle !== ''
      ? config.customSubtitle
      : defaultSubtitle

  return (
    <div className="relative flex h-full min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto px-4 py-6 select-none sm:px-6 sm:py-8 lg:px-12">
      <GateAtmosphereBackdrop theme={config.backgroundTheme} />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center gap-4 lg:flex-row lg:items-center lg:justify-center lg:gap-14">
        {/* Responsive Spatial Vault Medallion */}
        <div className="flex shrink-0 items-center justify-center py-1 sm:py-2 lg:py-0">
          <SpatialVaultObject
            vaultTheme={config.vaultTheme}
            isUnlocked={isUnlocked}
            className="scale-75 transition-transform duration-300 sm:scale-90 lg:scale-105"
          />
        </div>

        {/* Right Station: Keypad & Inline Editable Greetings */}
        <div className="flex w-full max-w-sm shrink-0 flex-col items-center space-y-4 text-center sm:max-w-md">
          <div className="w-full space-y-1.5">
            {isStudioPreview &&
            onChangeConfig &&
            (!isUnlocked || !config.enabled) ? (
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={displayTitle}
                  onChange={(e) =>
                    onChangeConfig({ customTitle: e.target.value })
                  }
                  placeholder="Enter space title..."
                  aria-label="Edit Entrance Title"
                  className="font-heading w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-center text-xl font-medium tracking-tight text-white transition-all hover:border-white/20 hover:bg-white/5 focus:border-amber-400/80 focus:bg-black/40 focus:outline-hidden sm:text-2xl lg:text-3xl"
                />
                <input
                  type="text"
                  value={displaySubtitle}
                  onChange={(e) =>
                    onChangeConfig({ customSubtitle: e.target.value })
                  }
                  placeholder="Enter entrance instructions..."
                  aria-label="Edit Entrance Message"
                  className="w-full rounded-lg border border-transparent bg-transparent px-2 py-0.5 text-center font-sans text-xs leading-relaxed text-stone-300 transition-all hover:border-white/20 hover:bg-white/5 focus:border-amber-400/80 focus:bg-black/40 focus:outline-hidden"
                />
              </div>
            ) : (
              <>
                <h2 className="font-heading text-xl font-medium tracking-tight text-white sm:text-2xl lg:text-3xl">
                  {displayTitle}
                </h2>
                <p className="font-sans text-xs leading-relaxed text-stone-400">
                  {isUnlocked
                    ? 'Combination confirmed — Sanctuary unlocked'
                    : displaySubtitle}
                </p>
              </>
            )}
          </div>

          {/* Conditional Gate Station Content */}
          {!config.enabled ? (
            <div className="animate-fade-in flex w-full flex-col items-center space-y-3.5 rounded-2xl border border-white/10 bg-black/40 p-5 text-center backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                <LockOpen className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-sm font-semibold text-amber-100">
                  Open Entrance
                </h4>
                <p className="font-sans text-xs leading-relaxed text-stone-400">
                  Passcode protection is off. Anyone with the link can explore
                  directly.
                </p>
              </div>
              {isStudioPreview && onChangeConfig && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    playSpatialSfx('tactile-tap')
                    onChangeConfig({ enabled: true })
                  }}
                  className="cursor-pointer gap-2 border-amber-500/40 font-sans text-xs text-amber-200 hover:bg-amber-500/10"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Set up Passcode</span>
                </Button>
              )}
            </div>
          ) : !isUnlocked ? (
            <div className="w-full space-y-2.5 pt-0.5">
              <LockKeypad
                key={`${config.passcode}-${config.passcodeHash}-${config.passcodeLength}-${config.keypadTheme || 'classic'}`}
                expectedPasscode={config.passcode}
                passcodeLength={config.passcodeLength}
                passcodeHash={config.passcodeHash}
                passcodeSalt={config.passcodeSalt}
                rateLimitKey={`vault_${config.passcodeSalt || 'default'}`}
                theme={config.keypadTheme || 'classic'}
                isUnlocked={isUnlocked}
                onUnlockSuccess={handleUnlockSuccess}
                onVerifyPasscode={onVerifyPasscode}
              />

              {config.hint && (
                <div className="pt-0.5">
                  {!showHint ? (
                    <button
                      type="button"
                      onClick={() => {
                        playSpatialSfx('tactile-tap')
                        setShowHint(true)
                      }}
                      className="inline-flex cursor-pointer items-center gap-1.5 font-sans text-xs text-amber-300/80 hover:text-amber-200 hover:underline"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span>Need a clue?</span>
                    </button>
                  ) : (
                    <div className="animate-fade-in rounded-xl border border-amber-500/30 bg-amber-950/30 px-3.5 py-2 text-center font-sans text-xs text-amber-200">
                      <span className="font-medium text-amber-300">Clue: </span>
                      <span>{config.hint}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="animate-scale-in flex flex-col items-center space-y-3 pt-2">
              {onProceedToStage && (
                <Button
                  type="button"
                  size="md"
                  onClick={() => {
                    playSpatialSfx('pop-snap')
                    onProceedToStage()
                  }}
                  className="cursor-pointer gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-sans text-sm font-semibold text-stone-900 shadow-xl transition-all hover:scale-105"
                >
                  <span>Enter Sanctuary</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}

              {isStudioPreview && (
                <button
                  type="button"
                  onClick={() => {
                    playSpatialSfx('tactile-tap')
                    setIsUnlocked(false)
                    setShowHint(false)
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 font-sans text-xs text-stone-400 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Lock again & test</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
