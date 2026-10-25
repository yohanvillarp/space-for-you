/**
 * In-memory sliding window rate limiter for passcode verification.
 * Blocks brute force attempts by IP / slug combination.
 */

const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

// Key -> { attempts: number, lockedUntil: number, lastAttempt: number }
const attemptsMap = new Map()

function getClientIdentifier(req) {
  const forwarded =
    req.headers?.['x-forwarded-for'] || req.headers?.['x-real-ip']
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return 'unknown-client'
}

export function checkRateLimit(req, slug) {
  const ip = getClientIdentifier(req)
  const key = `${ip}:${slug}`
  const now = Date.now()

  // Clean expired records periodically
  if (attemptsMap.size > 1000) {
    for (const [k, data] of attemptsMap.entries()) {
      if (now - data.lastAttempt > LOCKOUT_WINDOW_MS) {
        attemptsMap.delete(k)
      }
    }
  }

  const record = attemptsMap.get(key)
  if (!record) return { allowed: true, attemptsLeft: MAX_FAILED_ATTEMPTS }

  if (record.lockedUntil && now < record.lockedUntil) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000)
    return {
      allowed: false,
      locked: true,
      retryAfterSeconds,
      attemptsLeft: 0,
    }
  }

  // If lockout window expired, reset
  if (record.lockedUntil && now >= record.lockedUntil) {
    attemptsMap.delete(key)
    return { allowed: true, attemptsLeft: MAX_FAILED_ATTEMPTS }
  }

  const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - record.attempts)
  return { allowed: true, attemptsLeft }
}

export function recordFailedAttempt(req, slug) {
  const ip = getClientIdentifier(req)
  const key = `${ip}:${slug}`
  const now = Date.now()

  const record = attemptsMap.get(key) || {
    attempts: 0,
    lockedUntil: null,
    lastAttempt: now,
  }

  record.attempts += 1
  record.lastAttempt = now

  if (record.attempts >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_WINDOW_MS
  }

  attemptsMap.set(key, record)
  const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - record.attempts)
  return {
    locked: Boolean(record.lockedUntil),
    attemptsLeft,
    retryAfterSeconds: record.lockedUntil
      ? Math.ceil(LOCKOUT_WINDOW_MS / 1000)
      : 0,
  }
}

export function clearFailedAttempts(req, slug) {
  const ip = getClientIdentifier(req)
  const key = `${ip}:${slug}`
  attemptsMap.delete(key)
}
