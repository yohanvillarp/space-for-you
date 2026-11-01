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

// In-memory lockout cache to resist simple local storage clearing scripts
const IN_MEMORY_LOCKOUTS = new Map<
  string,
  { failures: number; lockedUntil: number }
>()

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
    const raw = localStorage.getItem(key)
    const memData = IN_MEMORY_LOCKOUTS.get(spaceId)
    const data = raw
      ? (JSON.parse(raw) as { failures: number; lockedUntil: number })
      : memData || null

    if (!data) {
      return {
        allowed: true,
        remainingAttempts: MAX_ATTEMPTS,
        lockoutRemainingSeconds: 0,
      }
    }

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
      localStorage.removeItem(key)
      IN_MEMORY_LOCKOUTS.delete(spaceId)
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
    const raw = localStorage.getItem(key)
    const mem = IN_MEMORY_LOCKOUTS.get(spaceId)
    const existing = raw
      ? JSON.parse(raw)
      : mem || { failures: 0, lockedUntil: 0 }
    const nextFailures = (existing.failures || 0) + 1

    let lockedUntil = 0
    if (nextFailures >= MAX_ATTEMPTS) {
      lockedUntil = Date.now() + LOCKOUT_MS
    }

    const record = { failures: nextFailures, lockedUntil }
    IN_MEMORY_LOCKOUTS.set(spaceId, record)
    localStorage.setItem(key, JSON.stringify(record))

    return checkPasscodeRateLimit(spaceId)
  } catch {
    return { allowed: true, remainingAttempts: 4, lockoutRemainingSeconds: 0 }
  }
}

export function resetPasscodeRateLimit(spaceId: string): void {
  IN_MEMORY_LOCKOUTS.delete(spaceId)
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(`${ATTEMPTS_PREFIX}${spaceId}`)
  } catch {
    // ignore
  }
}
