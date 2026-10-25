/**
 * @fileoverview Secure server-side sanctuary unlocking via Appwrite Cloud Functions.
 * Enforces zero-exposure of passcode hashes and server-authoritative time-lock filters.
 */

import { functions } from '@/shared/api'
import { verifyPasscode } from '@/shared/lib/crypto'
import type { SpaceWithScenes } from './types'
import { fetchSpaceBySlug, fetchSpaceById } from './space-database'
import { getLocalSpaceWithScenes } from '../model/local-space-resolver'

export interface UnlockSpaceParams {
  slug: string
  passcode?: string
}

export interface UnlockSpaceResult {
  success: boolean
  isUnlocked: boolean
  isProtected: boolean
  data?: SpaceWithScenes
  error?: string
  attemptsLeft?: number
  locked?: boolean
  retryAfterSeconds?: number
}

/**
 * Unlocks a space by calling the Appwrite Cloud Function 'unlock-sanctuary'.
 * Falls back to offline/local storage if cloud function execution is unavailable.
 */
export async function unlockSpaceViaFunction({
  slug,
  passcode,
}: UnlockSpaceParams): Promise<UnlockSpaceResult> {
  // 1. Try server-side Appwrite Cloud Function first
  try {
    const execution = await functions.createExecution(
      'unlock-sanctuary',
      JSON.stringify({ slug, passcode }),
      false,
    )

    if (execution?.responseBody) {
      const res = JSON.parse(execution.responseBody)

      if (execution.responseStatusCode === 200) {
        return {
          success: true,
          isUnlocked: Boolean(res.isUnlocked),
          isProtected: Boolean(res.isProtected),
          data: {
            space: res.space,
            scenes: res.scenes || [],
            senderName: res.space?.senderName,
            dedicationMessage: res.space?.dedicationMessage,
            themeConfig: res.space?.themeConfig,
            slug: res.space?.slug,
            passcodeHint: res.space?.passcodeHint,
            protectionTheme: res.space?.protectionTheme,
            passcodeLength: res.space?.passcodeLength,
          },
        }
      }

      if (
        execution.responseStatusCode === 401 ||
        execution.responseStatusCode === 429
      ) {
        return {
          success: false,
          isUnlocked: false,
          isProtected: true,
          error: res.error || 'Invalid secret passcode.',
          attemptsLeft: res.attemptsLeft,
          locked: res.locked,
          retryAfterSeconds: res.retryAfterSeconds,
        }
      }
    }
  } catch {
    // Cloud function not deployed or network offline: execute resilient fallback
  }

  // 2. Resilient local fallback (development / offline / localStorage)
  const resolved =
    (await fetchSpaceBySlug(slug)) ??
    (await fetchSpaceById(slug)) ??
    getLocalSpaceWithScenes(slug)

  if (!resolved) {
    return {
      success: false,
      isUnlocked: false,
      isProtected: false,
      error: 'Sanctuary not found.',
    }
  }

  const isProtected = Boolean(resolved.space?.isProtected)

  if (!isProtected) {
    return {
      success: true,
      isUnlocked: true,
      isProtected: false,
      data: resolved,
    }
  }

  // If protected and no passcode provided, return metadata ONLY with scenes stripped
  if (!passcode) {
    return {
      success: true,
      isUnlocked: false,
      isProtected: true,
      data: {
        ...resolved,
        scenes: [],
      },
    }
  }

  // Verify passcode locally
  let isMatch = false
  if (resolved.passcodeHash && resolved.passcodeSalt) {
    try {
      isMatch = await verifyPasscode(
        passcode,
        resolved.passcodeHash,
        resolved.passcodeSalt,
      )
    } catch {
      isMatch = false
    }
  }

  if (isMatch) {
    // Once verified, return full scenes
    const fullData =
      (await fetchSpaceBySlug(slug)) ??
      (await fetchSpaceById(slug)) ??
      getLocalSpaceWithScenes(slug)

    return {
      success: true,
      isUnlocked: true,
      isProtected: true,
      data: fullData ?? resolved,
    }
  }

  return {
    success: false,
    isUnlocked: false,
    isProtected: true,
    error: 'Incorrect passcode. Please try again.',
  }
}
