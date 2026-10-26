import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'

export const MAX_VOICE_NOTE_DURATION_SEC = 60
export const MAX_VOICE_NOTES_PER_SPACE = 3

export type VoiceRecorderStatus = 'idle' | 'recording' | 'reviewing' | 'saved'

export interface RecordedVoiceNote {
  id: string
  audioBlob: Blob
  audioUrl: string
  durationSeconds: number
  label: string
}

export function countSpaceVoiceNotes(items: SpatialItem[]): number {
  if (!Array.isArray(items)) return 0
  return items.filter(
    (item) => item.type === 'cassette-tape' && Boolean(item.data?.audioUrl),
  ).length
}

export function formatAudioDuration(seconds: number): string {
  const rounded = Math.max(0, Math.floor(seconds))
  const mins = Math.floor(rounded / 60)
  const secs = rounded % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
