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
  APPWRITE_DATABASE_ID:
    import.meta.env.VITE_APPWRITE_DATABASE_ID ||
    import.meta.env.APPWRITE_DATABASE_ID ||
    'sfy_primary_db',
  APPWRITE_SPACES_COLLECTION_ID:
    import.meta.env.VITE_APPWRITE_SPACES_COLLECTION_ID ||
    import.meta.env.APPWRITE_SPACES_COLLECTION_ID ||
    'spaces',
  APPWRITE_SCENES_COLLECTION_ID:
    import.meta.env.VITE_APPWRITE_SCENES_COLLECTION_ID ||
    import.meta.env.APPWRITE_SCENES_COLLECTION_ID ||
    'space_scenes',
  APPWRITE_PHOTOS_BUCKET_ID:
    import.meta.env.VITE_APPWRITE_PHOTOS_BUCKET_ID ||
    import.meta.env.APPWRITE_PHOTOS_BUCKET_ID ||
    'space-photos',
  APPWRITE_FUNCTION_UNLOCK_SPACE_ID:
    import.meta.env.VITE_APPWRITE_FUNCTION_UNLOCK_SPACE_ID ||
    '6ade5950002e352b5179',
  APPWRITE_FUNCTION_VALIDATE_VOICE_QUOTA_ID:
    import.meta.env.VITE_APPWRITE_FUNCTION_VALIDATE_VOICE_QUOTA_ID ||
    '6ade5a36002b8f002ca9',
} as const
