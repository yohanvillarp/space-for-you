export { apiClient } from './client.ts'
export type { RequestOptions } from './client.ts'

export {
  client,
  client as appwriteClient,
  account,
  account as appwriteAccount,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_NAME,
  signInWithGoogle,
  handleOAuthSuccess,
  getCurrentUser,
  signOut,
} from './appwrite.ts'
export type { AppwriteUser } from './appwrite.ts'
