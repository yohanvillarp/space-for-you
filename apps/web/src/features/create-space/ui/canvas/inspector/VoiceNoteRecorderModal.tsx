import { useState } from 'react'
import {
  Mic,
  Square,
  RotateCcw,
  Check,
  X,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { Button } from '@/shared/ui'
import { useVoiceRecorder } from '@/features/create-space/lib/voice-recorder/useVoiceRecorder'
import {
  MAX_VOICE_NOTE_DURATION_SEC,
  MAX_VOICE_NOTES_PER_SPACE,
  formatAudioDuration,
  validateVoiceQuotaWithServer,
} from '@/features/create-space/lib/voice-recorder'
import { uploadVoiceNoteAudio } from '@/features/create-space/lib/stage-audio-upload'
import { AudioWaveformVisualizer } from './AudioWaveformVisualizer'
import { VoiceNoteReviewSection } from './VoiceNoteReviewSection'
import type { VoiceNoteRecorderModalProps } from './voice-note-recorder.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export type { VoiceNoteRecorderModalProps }

export function VoiceNoteRecorderModal({
  isOpen,
  onClose,
  currentVoiceNotesCount,
  initialLabel = 'Personal Voice Message',
  onSaveVoiceNote,
}: VoiceNoteRecorderModalProps) {
  const [label, setLabel] = useState(initialLabel)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const recorder = useVoiceRecorder()

  if (!isOpen) return null

  const isQuotaFull = currentVoiceNotesCount >= MAX_VOICE_NOTES_PER_SPACE
  const isRecording = recorder.status === 'recording'
  const isReviewing = recorder.status === 'reviewing'
  const isEndingSoon = isRecording && recorder.remainingSeconds <= 10

  const handleStart = async () => {
    setValidationError(null)
    playSpatialSfx('pop-snap')
    await recorder.startRecording()
  }

  const handleStop = () => {
    playSpatialSfx('cassette-click')
    recorder.stopRecording()
  }

  const handleSave = async () => {
    if (!recorder.audioUrl || !recorder.audioBlob) return
    setValidationError(null)
    setIsUploading(true)
    try {
      const res = await validateVoiceQuotaWithServer({
        spaceId: 'current',
        durationSeconds: recorder.elapsedSeconds || 1,
        existingCount: currentVoiceNotesCount,
      })
      if (!res.allowed) {
        setValidationError(res.error || 'Voice note limits exceeded.')
        setIsUploading(false)
        return
      }
      const permanentUrl = await uploadVoiceNoteAudio(recorder.audioBlob)
      playSpatialSfx('cassette-click')
      onSaveVoiceNote(
        permanentUrl,
        recorder.elapsedSeconds || 1,
        label.trim() || 'Personal Voice Message',
      )
      onClose()
    } catch {
      setValidationError('Failed to save audio.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    recorder.reset()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#171311] text-[#FAF6F0] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#CF7056]/20 text-[#CF7056]">
              <Mic className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold">
                Record Voice Keepsake
              </h3>
              <p className="font-sans text-xs text-stone-400">
                1-minute limit • {currentVoiceNotesCount} of{' '}
                {MAX_VOICE_NOTES_PER_SPACE} notes used
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-stone-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6 text-center">
          {(recorder.error || validationError) && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-left font-sans text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{validationError || recorder.error}</span>
            </div>
          )}

          {/* Waveform Visualizer */}
          <AudioWaveformVisualizer
            levels={recorder.waveLevels}
            isRecording={isRecording}
            className="my-2"
          />

          {/* Timer Display */}
          <div className="space-y-1">
            <span
              className={cn(
                'font-mono text-3xl font-semibold tracking-wider transition-colors',
                isEndingSoon ? 'text-amber-400' : 'text-stone-100',
              )}
            >
              {formatAudioDuration(recorder.elapsedSeconds)}
              <span className="text-sm font-normal text-stone-500">
                {' '}
                / {formatAudioDuration(MAX_VOICE_NOTE_DURATION_SEC)}
              </span>
            </span>

            {isEndingSoon && (
              <p className="animate-pulse font-sans text-xs text-amber-300">
                Wrapping up in {recorder.remainingSeconds}s...
              </p>
            )}
          </div>

          {/* Review Mode: Preview & Label */}
          {isReviewing && recorder.audioUrl && (
            <VoiceNoteReviewSection
              audioUrl={recorder.audioUrl}
              label={label}
              onChangeLabel={setLabel}
            />
          )}

          {/* Primary Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {!isRecording && !isReviewing && (
              <button
                type="button"
                onClick={handleStart}
                disabled={isQuotaFull}
                title={isQuotaFull ? 'Limit reached' : 'Start recording'}
                className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 border-[#CF7056] bg-[#CF7056]/20 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#CF7056] text-white shadow-lg">
                  <Mic className="h-6 w-6 transition-transform group-hover:scale-110" />
                </div>
              </button>
            )}

            {isRecording && (
              <button
                type="button"
                onClick={handleStop}
                title="Finish recording"
                className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 border-rose-500 bg-rose-500/20 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg">
                  <Square className="h-5 w-5 fill-current" />
                </div>
              </button>
            )}
          </div>

          {!isRecording && !isReviewing && (
            <p className="font-sans text-xs text-stone-400">
              {isQuotaFull
                ? 'Limit reached (3 of 3 notes). Delete an existing cassette to record a new one.'
                : 'Click microphone to record your message (maximum 60 seconds).'}
            </p>
          )}
        </div>

        {/* Footer Actions in Reviewing Mode */}
        {isReviewing && (
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-3.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={recorder.discardRecording}
              className="cursor-pointer gap-1.5 text-xs text-stone-300 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5 text-stone-400" />
              <span>Discard & Re-record</span>
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              disabled={isUploading}
              onClick={handleSave}
              className="cursor-pointer gap-1.5 text-xs font-semibold shadow-md"
            >
              {isUploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
              <span>{isUploading ? 'Saving...' : 'Save to Cassette'}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
