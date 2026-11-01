import { ID } from 'appwrite'
import { account, setSessionHint } from './appwrite.ts'
import type { AppwriteUser, EmailAuthCredentials } from './appwrite.ts'

export interface SignUpResult {
  user: AppwriteUser | null
  sessionCreated: boolean
  error?: unknown
}

export async function signUpWithEmail({
  email,
  password,
  name,
}: EmailAuthCredentials): Promise<SignUpResult> {
  const trimmedEmail = email.trim().toLowerCase()
  const trimmedName = name?.trim() || undefined

  // Step 1: Create the account
  await account.create({
    userId: ID.unique(),
    email: trimmedEmail,
    password,
    name: trimmedName,
  })

  // Step 2: Explicitly establish the authenticated session
  try {
    await account.createEmailPasswordSession({
      email: trimmedEmail,
      password,
    })
    const user = await account.get()
    setSessionHint(true)
    return { user, sessionCreated: true }
  } catch (sessionErr) {
    return { user: null, sessionCreated: false, error: sessionErr }
  }
}

export async function signInWithEmail({
  email,
  password,
}: EmailAuthCredentials): Promise<AppwriteUser> {
  const trimmedEmail = email.trim().toLowerCase()
  await account.createEmailPasswordSession({
    email: trimmedEmail,
    password,
  })
  const user = await account.get()
  setSessionHint(true)
  return user
}

export function isUserAlreadyExistsError(error: unknown): boolean {
  if (error && typeof error === 'object') {
    const err = error as { type?: string; code?: number }
    return err.type === 'user_already_exists' || err.code === 409
  }
  return false
}

export function formatAuthError(error: unknown): string {
  if (error && typeof error === 'object' && 'type' in error) {
    const appwriteErr = error as {
      type?: string
      message?: string
      code?: number
    }
    switch (appwriteErr.type) {
      case 'user_invalid_credentials':
        return 'Invalid email or password. Please check your credentials.'
      case 'user_already_exists':
        return 'An account with this email address already exists.'
      case 'user_not_found':
        return 'No account was found with this email address.'
      case 'password_recently_used':
        return 'Please choose a different password.'
      case 'user_password_mismatch':
        return 'Passwords do not match.'
      case 'rate_limit_exceeded':
      case 'general_rate_limit_exceeded':
        return 'Too many attempts. Please wait a moment before trying again.'
      case 'user_session_already_exists':
        return 'A session is already active. Please refresh the page.'
      default:
        if (appwriteErr.message) return appwriteErr.message
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred. Please try again.'
}

export async function sendEmailVerification(
  redirectUrl?: string,
): Promise<void> {
  const url = redirectUrl || `${window.location.origin}/verify-email`
  await account.createVerification({ url })
}

export async function verifyEmail(
  userId: string,
  secret: string,
): Promise<void> {
  await account.updateVerification({ userId, secret })
}

export async function sendPasswordRecovery(
  email: string,
  redirectUrl?: string,
): Promise<void> {
  const url = redirectUrl || `${window.location.origin}/reset-password`
  await account.createRecovery({ email: email.trim().toLowerCase(), url })
}

export async function resetPassword({
  userId,
  secret,
  password,
}: {
  userId: string
  secret: string
  password: string
}): Promise<void> {
  await account.updateRecovery({ userId, secret, password })
}

export function getSafeAuthReturnPath(fallback = '/dashboard'): string {
  try {
    const stored = sessionStorage.getItem('sfy_auth_return')
    sessionStorage.removeItem('sfy_auth_return')
    if (
      stored &&
      stored.startsWith('/') &&
      !stored.startsWith('//') &&
      !stored.includes(':') &&
      stored !== '/auth' &&
      stored !== '/auth/success' &&
      stored !== '/auth/failure' &&
      stored !== '/verify-email' &&
      stored !== '/reset-password'
    ) {
      return stored
    }
  } catch {
    // ignore storage access errors
  }
  return fallback
}
