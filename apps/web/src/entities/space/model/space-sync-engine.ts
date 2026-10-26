import type { UserSpace, SpaceTemplateId } from './types'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import { isSceneTimeLocked } from '@/features/create-space/lib/scene-schedule-utils'
import {
  getSpaceStorageKeys,
  loadFromStorage,
} from '@/features/create-space/ui/editor/multi-scene-storage'

export type SpaceDisplayStatus =
  'draft' | 'scheduled' | 'published' | 'archived'

export const PENDING_CLOUD_SYNC_KEY = 'sfy_pending_cloud_sync_v1'
export const ACTIVE_USER_ID_KEY = 'sfy_active_user_id_v1'

export function getPendingCloudSyncIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(PENDING_CLOUD_SYNC_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? new Set(parsed as string[]) : new Set()
  } catch {
    return new Set()
  }
}

export function markPendingCloudSync(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const next = getPendingCloudSyncIds()
    next.add(id)
    localStorage.setItem(PENDING_CLOUD_SYNC_KEY, JSON.stringify([...next]))
  } catch {
    // ignore
  }
}

export function clearPendingCloudSync(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const next = getPendingCloudSyncIds()
    if (next.delete(id)) {
      localStorage.setItem(PENDING_CLOUD_SYNC_KEY, JSON.stringify([...next]))
    }
  } catch {
    // ignore
  }
}

export function getLastSyncedUserId(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(ACTIVE_USER_ID_KEY)
  } catch {
    return null
  }
}

export function setLastSyncedUserId(userId: string | null): void {
  if (typeof window === 'undefined') return
  try {
    if (userId) localStorage.setItem(ACTIVE_USER_ID_KEY, userId)
    else localStorage.removeItem(ACTIVE_USER_ID_KEY)
  } catch {
    // ignore
  }
}

function purgeDeletedSpaceKeys(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const keys = getSpaceStorageKeys(id)
    localStorage.removeItem(keys.scenesKey)
    localStorage.removeItem(keys.metaKey)
    localStorage.removeItem(keys.activeSceneKey)
    localStorage.removeItem(keys.protectionKey)
  } catch {
    // ignore
  }
}

/**
 * Reconciles local spaces with authoritative cloud spaces for the authenticated user.
 * Spaces missing from the cloud that are not pending upload are purged locally.
 */
export function reconcileSpacesWithCloud(
  localSpaces: UserSpace[],
  cloudSpaces: UserSpace[],
  pendingIds: Set<string> = getPendingCloudSyncIds(),
): UserSpace[] {
  const cloudIds = new Set(cloudSpaces.map((s) => s.id))
  const retainedLocal: UserSpace[] = []

  for (const local of localSpaces) {
    if (cloudIds.has(local.id) || pendingIds.has(local.id)) {
      retainedLocal.push(local)
    } else {
      purgeDeletedSpaceKeys(local.id)
    }
  }

  return mergeSpaces(retainedLocal, cloudSpaces)
}

/**
 * Merges retained local and cloud spaces by freshest timestamp.
 */
export function mergeSpaces(
  localSpaces: UserSpace[],
  cloudSpaces: UserSpace[],
): UserSpace[] {
  const map = new Map<string, UserSpace>()

  for (const space of localSpaces) {
    map.set(space.id, space)
  }

  for (const cloud of cloudSpaces) {
    const local = map.get(cloud.id)
    if (!local) {
      map.set(cloud.id, cloud)
      continue
    }

    const localTime = new Date(
      local.updatedAt || local.createdAt || 0,
    ).getTime()
    const cloudTime = new Date(
      cloud.updatedAt || cloud.createdAt || 0,
    ).getTime()

    if (cloudTime >= localTime) {
      map.set(cloud.id, {
        ...local,
        ...cloud,
        status: cloud.status,
      })
    } else {
      map.set(cloud.id, {
        ...cloud,
        ...local,
        status: cloud.status === 'published' ? 'published' : local.status,
      })
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime()
    const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime()
    return timeB - timeA
  })
}

export function resolveSpaceDisplayStatus(
  space: UserSpace,
  scenes?: SpaceScene[],
): SpaceDisplayStatus {
  if (space.status === 'archived') {
    return 'archived'
  }
  if (space.status !== 'published') {
    return 'draft'
  }
  const resolvedScenes = scenes || loadSpaceScenes(space.id, space.templateId)
  return resolvedScenes.some((s) => isSceneTimeLocked(s))
    ? 'scheduled'
    : 'published'
}

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
