import { ID, Permission, Role } from 'appwrite'
import { storage } from '@/shared/api'
import { ENV } from '@/shared/config/env'

export const SPACE_ASSETS_BUCKET_ID =
  (import.meta.env.VITE_APPWRITE_PHOTOS_BUCKET_ID as string) ||
  ENV.APPWRITE_PHOTOS_BUCKET_ID ||
  '6ade87be001700e5c95b'

/**
 * Uploads a recorded voice note audio blob to Appwrite Storage.
 * Falls back to Base64 DataURL on offline or network failure.
 */
export async function uploadVoiceNoteAudio(blob: Blob): Promise<string> {
  try {
    const ext = blob.type.includes('mp4')
      ? 'mp4'
      : blob.type.includes('ogg')
        ? 'ogg'
        : 'webm'
    const fileToUpload = new File([blob], `${Date.now()}-voicenote.${ext}`, {
      type: blob.type || 'audio/webm',
    })

    const response = await storage.createFile(
      SPACE_ASSETS_BUCKET_ID,
      ID.unique(),
      fileToUpload,
      [Permission.read(Role.any())],
    )

    return storage.getFileView(SPACE_ASSETS_BUCKET_ID, response.$id).toString()
  } catch (err) {
    console.warn('Appwrite Storage audio upload fallback: using DataURL', err)
    return await blobToDataUrl(blob)
  }
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve((reader.result as string) || '')
    reader.onerror = () => resolve(URL.createObjectURL(blob))
    reader.readAsDataURL(blob)
  })
}
