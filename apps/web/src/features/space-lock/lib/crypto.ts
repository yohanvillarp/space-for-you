/**
 * Cryptographic utility & client-side rate limiter for Passcode Gate.
 */

export {
  bufferToHex,
  hexToBuffer,
  generateCryptographicSalt,
  derivePasscodeHash,
  verifyPasscode,
  deriveEncryptionKey,
  encryptSensitiveData,
  decryptSensitiveData,
  type EncryptedPayload,
} from '@/shared/lib/crypto'

const ATTEMPTS_PREFIX = 'sfy_lock_attempts_'
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 30_000

export interface RateLimitState {
  allowed: boolean
  remainingAttempts: number
  lockoutRemainingSeconds: number
}

export function checkPasscodeRateLimit(spaceId: string): RateLimitState {
  if (typeof window === 'undefined') {
    return {
      allowed: true,
      remainingAttempts: MAX_ATTEMPTS,
      lockoutRemainingSeconds: 0,
    }
  }

  const key = `${ATTEMPTS_PREFIX}${spaceId}`
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) {
      return {
        allowed: true,
        remainingAttempts: MAX_ATTEMPTS,
        lockoutRemainingSeconds: 0,
      }
    }
    const data = JSON.parse(raw) as { failures: number; lockedUntil: number }
    const now = Date.now()

    if (data.lockedUntil && now < data.lockedUntil) {
      const remainingSeconds = Math.ceil((data.lockedUntil - now) / 1000)
      return {
        allowed: false,
        remainingAttempts: 0,
        lockoutRemainingSeconds: remainingSeconds,
      }
    }

    if (data.lockedUntil && now >= data.lockedUntil) {
      sessionStorage.removeItem(key)
      return {
        allowed: true,
        remainingAttempts: MAX_ATTEMPTS,
        lockoutRemainingSeconds: 0,
      }
    }

    const remaining = Math.max(0, MAX_ATTEMPTS - (data.failures || 0))
    return {
      allowed: remaining > 0,
      remainingAttempts: remaining,
      lockoutRemainingSeconds: 0,
    }
  } catch {
    return {
      allowed: true,
      remainingAttempts: MAX_ATTEMPTS,
      lockoutRemainingSeconds: 0,
    }
  }
}

export function recordFailedPasscodeAttempt(spaceId: string): RateLimitState {
  if (typeof window === 'undefined') {
    return {
      allowed: true,
      remainingAttempts: MAX_ATTEMPTS,
      lockoutRemainingSeconds: 0,
    }
  }

  const key = `${ATTEMPTS_PREFIX}${spaceId}`
  try {
    const raw = sessionStorage.getItem(key)
    const existing = raw ? JSON.parse(raw) : { failures: 0, lockedUntil: 0 }
    const nextFailures = (existing.failures || 0) + 1

    let lockedUntil = 0
    if (nextFailures >= MAX_ATTEMPTS) {
      lockedUntil = Date.now() + LOCKOUT_MS
    }

    sessionStorage.setItem(
      key,
      JSON.stringify({ failures: nextFailures, lockedUntil }),
    )
    return checkPasscodeRateLimit(spaceId)
  } catch {
    return { allowed: true, remainingAttempts: 4, lockoutRemainingSeconds: 0 }
  }
}

export function resetPasscodeRateLimit(spaceId: string): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(`${ATTEMPTS_PREFIX}${spaceId}`)
  } catch {
    // ignore
  }
}
