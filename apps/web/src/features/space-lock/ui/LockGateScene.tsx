import { useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import type { SpaceProtectionConfig } from '../model/lock.types'
import { SpatialVaultObject } from './SpatialVaultObject'
import { LockKeypad } from './LockKeypad'
import { Button } from '@/shared/ui'
import { playSpatialSfx } from '@/shared/lib'

export interface LockGateSceneProps {
  config: SpaceProtectionConfig
  spaceTitle?: string
  recipientName?: string
  isStudioPreview?: boolean
  onChangeConfig?: (updates: Partial<SpaceProtectionConfig>) => void
  onProceedToStage?: () => void
}

export function LockGateScene({
  config,
  spaceTitle = 'A Secret Keepsake',
  recipientName: _recipientName,
  isStudioPreview = false,
  onChangeConfig,
  onProceedToStage,
}: LockGateSceneProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

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

  const defaultSubtitle = 'Enter the secret combination to unlock'
  const displaySubtitle =
    config.customSubtitle !== undefined && config.customSubtitle !== ''
      ? config.customSubtitle
      : defaultSubtitle

  const vaultX = config.vaultX ?? 32
  const vaultY = config.vaultY ?? 50
  const vaultRotation = config.vaultRotation ?? 0

  return (
    <div
      onClick={() => setIsSelected(false)}
      className="relative flex h-full min-h-full w-full items-center justify-center overflow-hidden px-4 py-8 pb-24 select-none sm:px-6 sm:py-10 sm:pb-28 lg:px-12 lg:pb-24"
    >
      {/* Ambient Backdrop Glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-amber-500/10 via-black/40 to-black/85" />

      {/* Main Responsive Scene Container */}
      <div className="relative z-10 flex h-full w-full max-w-5xl flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        {/* Interactive Spatial Vault Stage Area */}
        <div className="relative flex h-72 w-full flex-1 items-center justify-center sm:h-96 lg:h-[480px]">
          <SpatialVaultObject
            vaultTheme={config.vaultTheme}
            isUnlocked={isUnlocked}
            x={vaultX}
            y={vaultY}
            rotation={vaultRotation}
            isSelected={isSelected}
            isStudioPreview={isStudioPreview}
            onSelect={() => setIsSelected(true)}
            onUpdatePosition={(x, y) =>
              onChangeConfig?.({ vaultX: x, vaultY: y })
            }
            onSetRotation={(angle) =>
              onChangeConfig?.({ vaultRotation: angle })
            }
          />
        </div>

        {/* Right Station: Keypad & Inline Editable Greetings */}
        <div className="flex w-full max-w-sm shrink-0 flex-col items-center space-y-5 text-center sm:max-w-md lg:items-center">
          {/* Header Title Information */}
          <div className="w-full space-y-2">
            {isStudioPreview && onChangeConfig && !isUnlocked ? (
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={displayTitle}
                  onChange={(e) =>
                    onChangeConfig({ customTitle: e.target.value })
                  }
                  placeholder="Enter space title..."
                  aria-label="Edit Entrance Title"
                  className="font-heading w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-center text-2xl font-medium tracking-tight text-white transition-all hover:border-white/20 hover:bg-white/5 focus:border-amber-400/80 focus:bg-black/40 focus:outline-hidden sm:text-3xl lg:text-4xl"
                />
                <input
                  type="text"
                  value={displaySubtitle}
                  onChange={(e) =>
                    onChangeConfig({ customSubtitle: e.target.value })
                  }
                  placeholder="Enter entrance instructions..."
                  aria-label="Edit Entrance Message"
                  className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-center font-sans text-xs leading-relaxed text-stone-300 transition-all hover:border-white/20 hover:bg-white/5 focus:border-amber-400/80 focus:bg-black/40 focus:outline-hidden"
                />
              </div>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl">
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

          {/* Keypad or Unlock Success Actions */}
          {!isUnlocked ? (
            <div className="w-full pt-1">
              <LockKeypad
                key={config.passcode}
                expectedPasscode={config.passcode}
                isUnlocked={isUnlocked}
                onUnlockSuccess={handleUnlockSuccess}
              />
            </div>
          ) : (
            <div className="animate-scale-in flex flex-col items-center space-y-4 pt-4">
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
