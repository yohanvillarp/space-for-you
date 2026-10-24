import { ID } from 'appwrite'
import { storage } from '@/shared/api'
import { compressImageFile } from './image-compression'

export const SPACE_PHOTOS_BUCKET_ID =
  (import.meta.env.VITE_APPWRITE_PHOTOS_BUCKET_ID as string) || 'space-photos'

/**
 * Uploads a single compressed keepsake photo to Appwrite Storage when saving the space.
 * Gracefully falls back to optimized WebP DataURL if storage bucket is not configured.
 */
export async function uploadKeepsakePhoto(file: File): Promise<string> {
  const compressed = await compressImageFile(file, 1200, 0.82)

  try {
    const fileToUpload = new File(
      [compressed.blob],
      `${Date.now()}-photo.webp`,
      {
        type: 'image/webp',
      },
    )

    const response = await storage.createFile(
      SPACE_PHOTOS_BUCKET_ID,
      ID.unique(),
      fileToUpload,
    )

    return storage.getFileView(SPACE_PHOTOS_BUCKET_ID, response.$id).toString()
  } catch (err) {
    // If Appwrite Storage is unavailable or bucket not yet created, return compressed DataURL
    console.warn(
      'Appwrite Storage upload fallback: using client-compressed WebP DataURL',
      err,
    )
    return compressed.dataUrl
  }
}

/**
 * Uploads all pending local photo files in parallel before space document commit.
 * Maps itemId -> permanentCloudUrl.
 */
export async function uploadAllPendingPhotos(
  pendingPhotos: Map<string, File>,
): Promise<Map<string, string>> {
  const results = new Map<string, string>()

  const entries = Array.from(pendingPhotos.entries())
  await Promise.all(
    entries.map(async ([itemId, file]) => {
      try {
        const permanentUrl = await uploadKeepsakePhoto(file)
        results.set(itemId, permanentUrl)
      } catch (err) {
        console.error(`Failed to upload photo for item ${itemId}:`, err)
      }
    }),
  )

  return results
}
