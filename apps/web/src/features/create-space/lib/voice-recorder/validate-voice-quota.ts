import { functions } from '@/shared/api'
import {
  MAX_VOICE_NOTE_DURATION_SEC,
  MAX_VOICE_NOTES_PER_SPACE,
} from './voice-note-types'

export interface ValidateVoiceQuotaParams {
  spaceId: string
  durationSeconds: number
  existingCount: number
}

export interface ValidateVoiceQuotaResult {
  allowed: boolean
  error?: string
}

export async function validateVoiceQuotaWithServer({
  spaceId,
  durationSeconds,
  existingCount,
}: ValidateVoiceQuotaParams): Promise<ValidateVoiceQuotaResult> {
  // 1. Try server-side Appwrite Cloud Function
  try {
    const execution = await functions.createExecution(
      'validate-voice-quota',
      JSON.stringify({ spaceId, durationSeconds, existingCount }),
      false,
    )

    if (execution?.responseBody) {
      const res = JSON.parse(execution.responseBody)
      if (execution.responseStatusCode === 200 && res.allowed) {
        return { allowed: true }
      }
      if (!res.allowed) {
        return {
          allowed: false,
          error: res.error || 'Voice note limits exceeded.',
        }
      }
    }
  } catch {
    // Cloud function unavailable: fall back to local verification
  }

  // 2. Resilient local enforcement
  if (durationSeconds > MAX_VOICE_NOTE_DURATION_SEC + 0.5) {
    return {
      allowed: false,
      error: `Voice notes are limited to ${MAX_VOICE_NOTE_DURATION_SEC} seconds.`,
    }
  }

  if (existingCount >= MAX_VOICE_NOTES_PER_SPACE) {
    return {
      allowed: false,
      error: `Sanctuary voice note limit reached (maximum ${MAX_VOICE_NOTES_PER_SPACE} notes).`,
    }
  }

  return { allowed: true }
}
