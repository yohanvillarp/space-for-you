/**
 * Cryptographic utility using native Web Crypto API (SubtleCrypto).
 * Zero-Knowledge: Passwords are never sent or stored in plaintext.
 * Uses PBKDF2 with SHA-256 (100,000 iterations) and AES-GCM-256.
 */

const PBKDF2_ITERATIONS = 100_000

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes
}

export function generateCryptographicSalt(): string {
  const salt = new Uint8Array(16)
  window.crypto.getRandomValues(salt)
  return bufferToHex(salt.buffer)
}

async function getMasterKey(passcode: string): Promise<CryptoKey> {
  const enc = new TextEncoder()
  return window.crypto.subtle.importKey(
    'raw',
    enc.encode(passcode),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  )
}

export async function derivePasscodeHash(
  passcode: string,
  saltHex: string,
): Promise<string> {
  const masterKey = await getMasterKey(passcode)
  const saltBuffer = hexToBuffer(saltHex)

  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer.buffer as ArrayBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    masterKey,
    256,
  )

  return bufferToHex(derivedBits)
}

export async function verifyPasscode(
  enteredPasscode: string,
  storedHashHex: string,
  saltHex: string,
): Promise<boolean> {
  if (!enteredPasscode || !storedHashHex || !saltHex) return false
  const computedHash = await derivePasscodeHash(enteredPasscode, saltHex)
  if (computedHash.length !== storedHashHex.length) return false

  let diff = 0
  for (let i = 0; i < computedHash.length; i++) {
    diff |= computedHash.charCodeAt(i) ^ storedHashHex.charCodeAt(i)
  }
  return diff === 0
}

export async function deriveEncryptionKey(
  passcode: string,
  saltHex: string,
): Promise<CryptoKey> {
  const masterKey = await getMasterKey(passcode)
  const saltBuffer = hexToBuffer(saltHex)

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer.buffer as ArrayBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    masterKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

export interface EncryptedPayload {
  ciphertext: string
  iv: string
}

export async function encryptSensitiveData(
  data: unknown,
  passcode: string,
  saltHex: string,
): Promise<EncryptedPayload> {
  const key = await deriveEncryptionKey(passcode, saltHex)
  const iv = new Uint8Array(12)
  window.crypto.getRandomValues(iv)

  const enc = new TextEncoder()
  const encoded = enc.encode(JSON.stringify(data))

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded,
  )

  return {
    ciphertext: bufferToHex(encryptedBuffer),
    iv: bufferToHex(iv.buffer),
  }
}

export async function decryptSensitiveData<T>(
  encrypted: EncryptedPayload,
  passcode: string,
  saltHex: string,
): Promise<T> {
  const key = await deriveEncryptionKey(passcode, saltHex)
  const iv = hexToBuffer(encrypted.iv)
  const ciphertext = hexToBuffer(encrypted.ciphertext)

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
    key,
    ciphertext.buffer as ArrayBuffer,
  )

  const dec = new TextDecoder()
  return JSON.parse(dec.decode(decryptedBuffer)) as T
}

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
