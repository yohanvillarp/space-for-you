export { apiClient } from './client.ts'
export type { RequestOptions } from './client.ts'

export {
  client,
  client as appwriteClient,
  account,
  account as appwriteAccount,
  storage,
  storage as appwriteStorage,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_NAME,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  formatAuthError,
  handleOAuthSuccess,
  getCurrentUser,
  signOut,
  hasSessionHint,
  setSessionHint,
} from './appwrite.ts'
export type { AppwriteUser, EmailAuthCredentials } from './appwrite.ts'
