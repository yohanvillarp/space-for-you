import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'

/**
 * Maximum custom uploaded photos per space (stored in Appwrite Storage).
 */
export const MAX_UPLOADED_PHOTOS = 3

/**
 * Maximum total photos per space (combining web catalog and uploaded photos).
 */
export const MAX_TOTAL_PHOTOS = 6

/** Backward compatibility alias */
export const MAX_STAGE_PHOTOS = MAX_TOTAL_PHOTOS

/**
 * Determines whether an image URL represents a user-uploaded file that requires cloud storage.
 */
export function isUploadedPhoto(url?: string | null): boolean {
  if (!url) return false
  return (
    url.startsWith('blob:') ||
    url.startsWith('data:') ||
    url.includes('/storage/buckets/space-photos')
  )
}

/**
 * Counts how many items on the stage represent user-uploaded files.
 */
export function countUploadedPhotos(items: readonly SpatialItem[]): number {
  return items.filter((item) => isUploadedPhoto(item.data?.photoUrl)).length
}

/**
 * Counts how many items on the stage represent photos or polaroids.
 */
export function countTotalPhotos(items: readonly SpatialItem[]): number {
  return items.filter(
    (item) => item.type === 'polaroid' || Boolean(item.data?.photoUrl),
  ).length
}

/** Backward compatibility alias */
export const countStagePhotos = countTotalPhotos

/**
 * Checks whether an additional user file upload is allowed.
 */
export function canUploadMorePhotos(items: readonly SpatialItem[]): boolean {
  return countUploadedPhotos(items) < MAX_UPLOADED_PHOTOS
}

/**
 * Checks whether an additional photo/polaroid can be added to the stage.
 */
export function canAddStagePhoto(items: readonly SpatialItem[]): boolean {
  return countTotalPhotos(items) < MAX_TOTAL_PHOTOS
}

/**
 * Returns true if the stage has already reached the maximum total photo limit.
 */
export function hasReachedPhotoLimit(items: readonly SpatialItem[]): boolean {
  return countTotalPhotos(items) >= MAX_TOTAL_PHOTOS
}
