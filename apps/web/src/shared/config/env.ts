export const ENV = {
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL,
  APPWRITE_PROJECT_ID:
    import.meta.env.VITE_APPWRITE_PROJECT_ID ||
    import.meta.env.APPWRITE_PROJECT_ID ||
    '',
  APPWRITE_ENDPOINT:
    import.meta.env.VITE_APPWRITE_ENDPOINT ||
    import.meta.env.APPWRITE_ENDPOINT ||
    'https://nyc.cloud.appwrite.io/v1',
  APPWRITE_PROJECT_NAME:
    import.meta.env.VITE_APPWRITE_PROJECT_NAME ||
    import.meta.env.APPWRITE_PROJECT_NAME ||
    'space-for-you',
} as const
