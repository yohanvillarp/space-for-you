import type { UserSpace, SpaceTemplateId } from './types'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { isSceneTimeLocked } from '@/features/create-space/lib/scene-schedule-utils'
import {
  getSpaceStorageKeys,
  loadFromStorage,
} from '@/features/create-space/ui/editor/multi-scene-storage'

export type SpaceDisplayStatus =
  'draft' | 'scheduled' | 'published' | 'archived'

/**
 * Merges local and cloud spaces non-destructively, preserving offline drafts
 * and incorporating remote updates with latest timestamps.
 */
export function mergeSpaces(
  localSpaces: UserSpace[],
  cloudSpaces: UserSpace[],
): UserSpace[] {
  const map = new Map<string, UserSpace>()

  // 1. Index local spaces first
  for (const space of localSpaces) {
    map.set(space.id, space)
  }

  // 2. Merge or insert cloud spaces
  for (const cloud of cloudSpaces) {
    const local = map.get(cloud.id)
    if (!local) {
      map.set(cloud.id, cloud)
      continue
    }

    // Compare timestamps to determine the freshest record
    const localTime = new Date(
      local.updatedAt || local.createdAt || 0,
    ).getTime()
    const cloudTime = new Date(
      cloud.updatedAt || cloud.createdAt || 0,
    ).getTime()

    // If cloud is published, prioritize the published state
    const isCloudPublished = cloud.status === 'published'
    const bestStatus = isCloudPublished ? 'published' : local.status

    if (cloudTime >= localTime) {
      map.set(cloud.id, {
        ...local,
        ...cloud,
        status: bestStatus,
      })
    } else {
      map.set(cloud.id, {
        ...cloud,
        ...local,
        status: bestStatus,
      })
    }
  }

  // 3. Sort by most recently updated
  return Array.from(map.values()).sort((a, b) => {
    const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime()
    const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime()
    return timeB - timeA
  })
}

/**
 * Resolves the visual status of a sanctuary, distinguishing between Draft,
 * Live, Scheduled (has scenes opening in the future), and Archived.
 */
export function resolveSpaceDisplayStatus(
  space: UserSpace,
  scenes?: SpaceScene[],
): SpaceDisplayStatus {
  if (space.status === 'archived') {
    return 'archived'
  }

  if (space.status === 'draft') {
    return 'draft'
  }

  // If status is published or ready, inspect scenes for time-locked schedules
  const resolvedScenes = scenes || loadSpaceScenes(space.id, space.templateId)
  const hasFutureSchedule = resolvedScenes.some((s) => isSceneTimeLocked(s))

  if (hasFutureSchedule) {
    return 'scheduled'
  }

  return 'published'
}

/**
 * Loads cached scenes from local storage for a given space ID to inspect release dates.
 */
function loadSpaceScenes(
  spaceId: string,
  templateId: SpaceTemplateId,
): SpaceScene[] {
  if (typeof window === 'undefined') return []
  try {
    const keys = getSpaceStorageKeys(spaceId, templateId)
    return loadFromStorage<SpaceScene[]>(keys.scenesKey, [])
  } catch {
    return []
  }
}
