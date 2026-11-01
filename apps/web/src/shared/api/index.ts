export { apiClient } from './client.ts'
export type { RequestOptions } from './client.ts'

export {
  client,
  client as appwriteClient,
  account,
  account as appwriteAccount,
  databases,
  databases as appwriteDatabases,
  storage,
  storage as appwriteStorage,
  functions,
  functions as appwriteFunctions,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_NAME,
  ID,
  Query,
  Permission,
  Role,
  signInWithGoogle,
  handleOAuthSuccess,
  getCurrentUser,
  signOut,
  hasSessionHint,
  setSessionHint,
  clearLocalSpacesCacheOnSignOut,
} from './appwrite.ts'
export type { AppwriteUser, EmailAuthCredentials } from './appwrite.ts'

export {
  signInWithEmail,
  signUpWithEmail,
  formatAuthError,
  isUserAlreadyExistsError,
  sendEmailVerification,
  verifyEmail,
  sendPasswordRecovery,
  resetPassword,
  getSafeAuthReturnPath,
} from './auth-api.ts'
export type { SignUpResult } from './auth-api.ts'
