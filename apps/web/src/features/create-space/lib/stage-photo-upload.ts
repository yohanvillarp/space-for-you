import { ID, Permission, Role } from 'appwrite'
import { storage } from '@/shared/api'
import { ENV } from '@/shared/config/env'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { compressImageFile } from '@/features/create-space/lib/image-compression'

export const SPACE_PHOTOS_BUCKET_ID =
  (import.meta.env.VITE_APPWRITE_PHOTOS_BUCKET_ID as string) ||
  ENV.APPWRITE_PHOTOS_BUCKET_ID ||
  '6ade87be001700e5c95b'

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
      [Permission.read(Role.any())],
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
 * Maps targetId -> permanentCloudUrl.
 */
export async function uploadAllPendingPhotos(
  pendingPhotos: Map<string, File>,
): Promise<Map<string, string>> {
  const results = new Map<string, string>()

  const entries = Array.from(pendingPhotos.entries())
  await Promise.all(
    entries.map(async ([targetId, file]) => {
      try {
        const permanentUrl = await uploadKeepsakePhoto(file)
        results.set(targetId, permanentUrl)
      } catch (err) {
        console.error(`Failed to upload photo for ${targetId}:`, err)
      }
    }),
  )

  return results
}

/**
 * Replaces pending photo IDs with permanent cloud URLs across all space scenes.
 */
export function applyUploadedUrlsToScenes(
  scenes: SpaceScene[],
  uploadedUrls: Map<string, string>,
): SpaceScene[] {
  if (uploadedUrls.size === 0) return scenes
  return scenes.map((scene) => {
    if (scene.type === 'free-canvas') {
      return {
        ...scene,
        items: scene.items.map((it) =>
          uploadedUrls.has(it.id)
            ? {
                ...it,
                data: { ...it.data, photoUrl: uploadedUrls.get(it.id)! },
              }
            : it,
        ),
      }
    }
    if (scene.type === 'letters') {
      return {
        ...scene,
        letters: scene.letters.map((letItem) =>
          uploadedUrls.has(letItem.id)
            ? { ...letItem, imageUrl: uploadedUrls.get(letItem.id)! }
            : letItem,
        ),
      }
    }
    return scene
  })
}
