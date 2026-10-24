import { Account, ID, OAuthProvider, Storage } from 'appwrite'
import type { Models } from 'appwrite'
import {
  client,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_NAME,
} from '@/appwrite'

export { client, APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_PROJECT_NAME }

export const account = new Account(client)
export const storage = new Storage(client)

export type AppwriteUser = Models.User<Models.Preferences>

export interface EmailAuthCredentials {
  email: string
  password: string
  name?: string
}

const SESSION_HINT_KEY = 'sfy_session_active'

export function hasSessionHint(): boolean {
  try {
    return localStorage.getItem(SESSION_HINT_KEY) === '1'
  } catch {
    return false
  }
}

export function setSessionHint(active: boolean): void {
  try {
    if (active) {
      localStorage.setItem(SESSION_HINT_KEY, '1')
    } else {
      localStorage.removeItem(SESSION_HINT_KEY)
    }
  } catch {
    // Ignore localStorage errors (e.g., privacy mode)
  }
}

export async function signInWithGoogle(): Promise<void> {
  const success = `${window.location.origin}/auth/success`
  const failure = `${window.location.origin}/auth/failure`

  // createOAuth2Token navigates the browser to the provider; do not redirect manually.
  await account.createOAuth2Token({
    provider: OAuthProvider.Google,
    success,
    failure,
  })
}

export async function signInWithEmail({
  email,
  password,
}: EmailAuthCredentials): Promise<void> {
  await account.createEmailPasswordSession({
    email,
    password,
  })
  setSessionHint(true)
  window.location.assign('/dashboard')
}

export async function signUpWithEmail({
  email,
  password,
  name,
}: EmailAuthCredentials): Promise<void> {
  await account.create({
    userId: ID.unique(),
    email,
    password,
    name: name?.trim() || undefined,
  })
  // Immediately create a session for seamless onboarding
  await account.createEmailPasswordSession({
    email,
    password,
  })
  setSessionHint(true)
  window.location.assign('/dashboard')
}

export async function handleOAuthSuccess(): Promise<void> {
  const url = new URL(window.location.href)
  const secret = url.searchParams.get('secret')
  const userId = url.searchParams.get('userId')
  if (!secret || !userId) {
    throw new Error('Missing OAuth credentials')
  }
  await account.createSession({ userId, secret })
  setSessionHint(true)
  window.location.assign('/dashboard')
}

export async function getCurrentUser(): Promise<AppwriteUser | null> {
  try {
    const user = await account.get()
    setSessionHint(true)
    return user
  } catch {
    setSessionHint(false)
    return null
  }
}

export async function signOut(): Promise<void> {
  setSessionHint(false)
  try {
    await account.deleteSession({ sessionId: 'current' })
  } finally {
    setSessionHint(false)
    window.location.assign('/auth')
  }
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
      case 'password_recently_used':
        return 'Please choose a different password.'
      case 'user_password_mismatch':
        return 'Passwords do not match.'
      case 'rate_limit_exceeded':
        return 'Too many attempts. Please wait a moment and try again.'
      default:
        if (appwriteErr.message) return appwriteErr.message
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred. Please try again.'
}
