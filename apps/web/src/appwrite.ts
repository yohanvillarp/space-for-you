import { Client } from 'appwrite'
import { ENV } from '@/shared/config'

export const APPWRITE_PROJECT_ID = ENV.APPWRITE_PROJECT_ID
export const APPWRITE_PROJECT_NAME = ENV.APPWRITE_PROJECT_NAME
export const APPWRITE_ENDPOINT = ENV.APPWRITE_ENDPOINT

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)

// Run client.ping() once when the app starts so the user can confirm the setup
if (typeof window !== 'undefined' && APPWRITE_PROJECT_ID) {
  client.ping()
}

export { client }
