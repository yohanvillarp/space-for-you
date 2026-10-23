import { Account, OAuthProvider } from 'appwrite'
import type { Models } from 'appwrite'
import {
  client,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_NAME,
} from '@/appwrite'

export { client, APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_PROJECT_NAME }

export const account = new Account(client)

export type AppwriteUser = Models.User<Models.Preferences>

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

export async function handleOAuthSuccess(): Promise<void> {
  const url = new URL(window.location.href)
  const secret = url.searchParams.get('secret')
  const userId = url.searchParams.get('userId')
  if (!secret || !userId) {
    throw new Error('Missing OAuth credentials')
  }
  await account.createSession({ userId, secret })
  window.location.assign('/dashboard')
}

export async function getCurrentUser(): Promise<AppwriteUser | null> {
  try {
    return await account.get()
  } catch {
    return null
  }
}

export async function signOut(): Promise<void> {
  await account.deleteSession({ sessionId: 'current' })
  window.location.assign('/auth')
}
