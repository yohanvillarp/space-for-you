import type { SpatialItem } from '../model/spatial-stage.types'

/**
 * Strict maximum number of photos allowed per spatial space.
 */
export const MAX_STAGE_PHOTOS = 2

/**
 * Counts how many items on the stage represent photos or polaroids.
 */
export function countStagePhotos(items: readonly SpatialItem[]): number {
  return items.filter(
    (item) => item.type === 'polaroid' || Boolean(item.data?.photoUrl),
  ).length
}

/**
 * Checks whether an additional photo/polaroid can be added to the stage.
 */
export function canAddStagePhoto(items: readonly SpatialItem[]): boolean {
  return countStagePhotos(items) < MAX_STAGE_PHOTOS
}

/**
 * Returns true if the stage has already reached the maximum photo limit.
 */
export function hasReachedPhotoLimit(items: readonly SpatialItem[]): boolean {
  return countStagePhotos(items) >= MAX_STAGE_PHOTOS
}
