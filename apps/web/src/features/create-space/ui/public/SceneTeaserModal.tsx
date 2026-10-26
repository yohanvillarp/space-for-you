import { useEffect, useState } from 'react'
import { CalendarClock, Lock, X } from 'lucide-react'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import {
  getTimeRemainingParts,
  formatUnlockDate,
  type TimeRemainingParts,
} from '@/features/create-space/lib/scene-schedule-utils'
import { Button } from '@/shared/ui'
import { playSpatialSfx } from '@/shared/lib'

export interface SceneTeaserModalProps {
  isOpen: boolean
  scene: SpaceScene | null
  onClose: () => void
  accentColor?: string
}

export function SceneTeaserModal({
  isOpen,
  scene,
  onClose,
  accentColor = '#D97706',
}: SceneTeaserModalProps) {
  const unlockAt = scene?.schedule?.unlockAt || ''

  const [parts, setParts] = useState<TimeRemainingParts>(() =>
    getTimeRemainingParts(unlockAt),
  )

  // Live ticking countdown every 1 second
  useEffect(() => {
    if (!isOpen || !unlockAt) return

    const interval = setInterval(() => {
      const current = getTimeRemainingParts(unlockAt)
      setParts(current)
      if (current.isUnlocked) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, unlockAt])

  if (!isOpen || !scene) return null

  const formattedTargetDate = unlockAt ? formatUnlockDate(unlockAt) : ''

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md select-none"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-[#140F0D] p-6 text-stone-200 shadow-2xl sm:p-8">
        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            playSpatialSfx('tactile-tap')
            onClose()
          }}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Animated Lock Icon */}
          <div
            className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/15 bg-white/5 shadow-xl transition-transform hover:scale-105"
            style={{ color: accentColor }}
          >
            <CalendarClock className="h-8 w-8 animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="font-heading mt-5 text-2xl font-bold tracking-tight text-[#FAF6F0]">
            {scene.title}
          </h2>
          <span className="mt-1 font-sans text-xs tracking-wide text-amber-300/80 uppercase">
            Sealed Chapter
          </span>

          {/* Sender Custom Teaser Note */}
          {scene.schedule?.teaserMessage ? (
            <p className="font-heading mt-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-stone-300 italic">
              "{scene.schedule.teaserMessage}"
            </p>
          ) : (
            <p className="mt-3 font-sans text-xs text-stone-400">
              This chapter was sealed with anticipation by someone special.
            </p>
          )}

          {/* Live Countdown Grid */}
          <div className="mt-6 grid w-full grid-cols-4 gap-2 font-mono">
            {[
              { label: 'Days', val: parts.days },
              { label: 'Hours', val: parts.hours },
              { label: 'Mins', val: parts.minutes },
              { label: 'Secs', val: parts.seconds },
            ].map((slot) => (
              <div
                key={slot.label}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-black/40 p-2.5 shadow-inner"
              >
                <span className="text-xl font-bold text-amber-200">
                  {String(slot.val).padStart(2, '0')}
                </span>
                <span className="font-sans text-[10px] text-stone-400 uppercase">
                  {slot.label}
                </span>
              </div>
            ))}
          </div>

          {/* Target Unlock Date */}
          <div className="mt-4 flex items-center gap-1.5 font-sans text-xs text-stone-400">
            <Lock className="h-3 w-3 text-amber-400/70" />
            <span>Opens {formattedTargetDate}</span>
          </div>

          {/* Action Button */}
          <Button
            type="button"
            size="md"
            onClick={() => {
              playSpatialSfx('tactile-tap')
              onClose()
            }}
            className="mt-6 w-full cursor-pointer bg-white/10 text-stone-200 hover:bg-white/20 hover:text-white"
          >
            Back to Space
          </Button>
        </div>
      </div>
    </div>
  )
}
