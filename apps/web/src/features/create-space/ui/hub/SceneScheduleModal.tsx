import { useState } from 'react'
import { CalendarClock, Lock, X } from 'lucide-react'
import type {
  SpaceScene,
  SceneScheduleConfig,
} from '@/features/create-space/model/scenes.types'
import { formatTimeRemaining } from '@/features/create-space/lib/scene-schedule-utils'
import { Button } from '@/shared/ui'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface SceneScheduleModalProps {
  isOpen: boolean
  scene: SpaceScene
  onClose: () => void
  onSave: (sceneId: string, schedule: SceneScheduleConfig | null) => void
  accentColor?: string
}

export function SceneScheduleModal({
  isOpen,
  scene,
  onClose,
  onSave,
  accentColor = '#D97706',
}: SceneScheduleModalProps) {
  const currentSchedule = scene.schedule
  const [isEnabled, setIsEnabled] = useState<boolean>(
    Boolean(currentSchedule?.enabled),
  )

  // Default to tomorrow noon if not set
  const getDefaultDateTime = () => {
    if (currentSchedule?.unlockAt) {
      const d = new Date(currentSchedule.unlockAt)
      if (!isNaN(d.getTime())) {
        return d.toISOString().slice(0, 16)
      }
    }
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(12, 0, 0, 0)
    return tomorrow.toISOString().slice(0, 16)
  }

  const [unlockAt, setUnlockAt] = useState<string>(getDefaultDateTime)
  const [teaserMessage, setTeaserMessage] = useState<string>(
    currentSchedule?.teaserMessage || '',
  )

  if (!isOpen) return null

  const handleSave = () => {
    playSpatialSfx('tactile-tap')
    if (!isEnabled || !unlockAt) {
      onSave(scene.id, null)
    } else {
      onSave(scene.id, {
        enabled: true,
        unlockAt: new Date(unlockAt).toISOString(),
        teaserMessage: teaserMessage.trim() || undefined,
      })
    }
    onClose()
  }

  const previewString =
    isEnabled && unlockAt ? formatTimeRemaining(unlockAt) : ''

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#17110E] p-6 text-stone-200 shadow-2xl">
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner"
              style={{ color: accentColor }}
            >
              <CalendarClock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-[#FAF6F0]">
                Schedule Chapter Reveal
              </h2>
              <p className="max-w-[240px] truncate font-sans text-xs text-stone-400">
                {scene.title}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 space-y-5 py-5 font-sans">
          {/* Toggle Enable */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="space-y-0.5">
              <span className="text-sm font-medium text-stone-200">
                Time-Locked Chapter
              </span>
              <p className="text-xs text-stone-400">
                Lock access until a specific date & time
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                setIsEnabled(!isEnabled)
              }}
              className={cn(
                'flex h-7 w-12 cursor-pointer items-center rounded-full p-1 transition-colors',
                isEnabled
                  ? 'justify-end bg-amber-500'
                  : 'justify-start bg-stone-700',
              )}
            >
              <span className="h-5 w-5 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {isEnabled && (
            <div className="animate-fade-in space-y-4">
              {/* Date & Time Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-300">
                  Unlock Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={unlockAt}
                  onChange={(e) => setUnlockAt(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-[#FAF6F0] transition-all outline-none focus:border-amber-400"
                />
              </div>

              {/* Teaser Message Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-stone-300">
                  Anticipation Note (Optional)
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={teaserMessage}
                  placeholder="e.g. A special memory unlocks on your birthday..."
                  onChange={(e) => setTeaserMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-[#FAF6F0] transition-all outline-none placeholder:text-stone-500 focus:border-amber-400"
                />
              </div>

              {/* Live Preview Teaser Chip */}
              {previewString && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                  <Lock className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    Recipient sees: <strong>{previewString}</strong>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-stone-400 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            className="bg-amber-500 font-medium text-black hover:bg-amber-400"
          >
            Save Schedule
          </Button>
        </div>
      </div>
    </div>
  )
}
