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

export async function handleOAuthSuccess(): Promise<AppwriteUser | null> {
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

  const user = await account.get()
  setSessionHint(true)
  return user
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

export function clearLocalSpacesCacheOnSignOut(): void {
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
  } catch {
    // Session may already be expired or deleted on server
  } finally {
    setSessionHint(false)
    clearLocalSpacesCacheOnSignOut()
  }
}
