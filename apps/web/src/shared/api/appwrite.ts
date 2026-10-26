import {
  Account,
  Databases,
  Functions,
  ID,
  OAuthProvider,
  Permission,
  Query,
  Role,
  Storage,
} from 'appwrite'
import type { Models } from 'appwrite'
import {
  client,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_NAME,
} from '@/appwrite'

export {
  client,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_NAME,
  ID,
  Query,
  Permission,
  Role,
}

export const account = new Account(client)
export const storage = new Storage(client)
export const databases = new Databases(client)
export const functions = new Functions(client)

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

  // Use createOAuth2Token so userId & secret are returned in callback URL,
  // bypassing Firefox/Safari third-party cookie blocking on localhost.
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

  if (secret && userId) {
    try {
      await account.createSession({ userId, secret })
    } catch {
      // Ignore if session was already established
    }
  }

  await account.get()
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

function clearLocalSpacesCacheOnSignOut(): void {
  try {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i)
      if (
        key &&
        (key === 'sfy_user_spaces_v1' ||
          key === 'sfy_pending_cloud_sync_v1' ||
          key === 'sfy_active_user_id_v1' ||
          key.startsWith('sfy_space_') ||
          key.startsWith('sfy_scenes_') ||
          key.startsWith('sfy_meta_') ||
          key.startsWith('sfy_active_scene_') ||
          key.startsWith('sfy_protection_'))
      ) {
        keysToRemove.push(key)
      }
    }
    for (const key of keysToRemove) {
      localStorage.removeItem(key)
    }
    sessionStorage.removeItem('sfy_active_creation_draft')
  } catch {
    // ignore storage errors
  }
}

export async function signOut(): Promise<void> {
  setSessionHint(false)
  clearLocalSpacesCacheOnSignOut()
  try {
    await account.deleteSession({ sessionId: 'current' })
  } finally {
    setSessionHint(false)
    clearLocalSpacesCacheOnSignOut()
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
