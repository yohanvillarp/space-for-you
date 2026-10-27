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
export const PENDING_CLOUD_DELETE_KEY = 'sfy_pending_cloud_delete_v1'
export const ACTIVE_USER_ID_KEY = 'sfy_active_user_id_v1'
const MAX_SYNCED_SPACES = 3

function readStringSet(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? new Set(parsed as string[]) : new Set()
  } catch {
    return new Set()
  }
}

function writeStringSet(key: string, set: Set<string>): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify([...set]))
  } catch {
    // ignore storage errors
  }
}

export function getPendingCloudSyncIds(): Set<string> {
  return readStringSet(PENDING_CLOUD_SYNC_KEY)
}

export function markPendingCloudSync(id: string): void {
  const next = getPendingCloudSyncIds()
  next.add(id)
  writeStringSet(PENDING_CLOUD_SYNC_KEY, next)
}

export function clearPendingCloudSync(id: string): void {
  const next = getPendingCloudSyncIds()
  if (next.delete(id)) writeStringSet(PENDING_CLOUD_SYNC_KEY, next)
}

export function getPendingCloudDeleteIds(): Set<string> {
  return readStringSet(PENDING_CLOUD_DELETE_KEY)
}

export function markPendingCloudDelete(id: string): void {
  clearPendingCloudSync(id)
  const next = getPendingCloudDeleteIds()
  next.add(id)
  writeStringSet(PENDING_CLOUD_DELETE_KEY, next)
}

export function clearPendingCloudDelete(id: string): void {
  const next = getPendingCloudDeleteIds()
  if (next.delete(id)) writeStringSet(PENDING_CLOUD_DELETE_KEY, next)
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
 * Filters pending deletions, purges deleted spaces, and caps total spaces to MAX_SYNCED_SPACES (3).
 */
export function reconcileSpacesWithCloud(
  localSpaces: UserSpace[],
  cloudSpaces: UserSpace[],
  pendingIds: Set<string> = getPendingCloudSyncIds(),
  pendingDeleteIds: Set<string> = getPendingCloudDeleteIds(),
): UserSpace[] {
  const cloudIdSet = new Set(cloudSpaces.map((s) => s.id))

  // Clean up delete queue for IDs already absent in cloud
  for (const delId of pendingDeleteIds) {
    if (!cloudIdSet.has(delId)) {
      clearPendingCloudDelete(delId)
    }
  }

  const activeCloudSpaces = cloudSpaces.filter(
    (s) => !pendingDeleteIds.has(s.id),
  )
  const activeCloudIds = new Set(activeCloudSpaces.map((s) => s.id))
  const retainedLocal: UserSpace[] = []

  for (const local of localSpaces) {
    if (pendingDeleteIds.has(local.id)) {
      purgeDeletedSpaceKeys(local.id)
      continue
    }
    if (activeCloudIds.has(local.id) || pendingIds.has(local.id)) {
      retainedLocal.push(local)
    } else {
      purgeDeletedSpaceKeys(local.id)
    }
  }

  const merged = mergeSpaces(retainedLocal, activeCloudSpaces, pendingIds)

  // Enforce strict maximum of 3 spaces (auto-pruning any excess duplicates)
  if (merged.length > MAX_SYNCED_SPACES) {
    const prioritized = [...merged].sort((a, b) => {
      const aPub = a.status === 'published' ? 1 : 0
      const bPub = b.status === 'published' ? 1 : 0
      if (bPub !== aPub) return bPub - aPub
      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime()
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime()
      return timeB - timeA
    })

    const kept = prioritized.slice(0, MAX_SYNCED_SPACES)
    const overflow = prioritized.slice(MAX_SYNCED_SPACES)

    for (const extra of overflow) {
      purgeDeletedSpaceKeys(extra.id)
      clearPendingCloudSync(extra.id)
      if (cloudIdSet.has(extra.id)) {
        markPendingCloudDelete(extra.id)
      }
    }

    return kept
  }

  return merged
}

/**
 * Merges retained local and cloud spaces.
 * Cloud is authoritative unless the space has unsaved local edits in `pendingIds`.
 */
export function mergeSpaces(
  localSpaces: UserSpace[],
  cloudSpaces: UserSpace[],
  pendingIds: Set<string> = getPendingCloudSyncIds(),
): UserSpace[] {
  const map = new Map<string, UserSpace>()

  for (const space of localSpaces) {
    map.set(space.id, space)
  }

  for (const cloud of cloudSpaces) {
    const local = map.get(cloud.id)
    if (!local || !pendingIds.has(cloud.id)) {
      map.set(cloud.id, local ? { ...local, ...cloud } : cloud)
      continue
    }

    const localTime = new Date(
      local.updatedAt || local.createdAt || 0,
    ).getTime()
    const cloudTime = new Date(
      cloud.updatedAt || cloud.createdAt || 0,
    ).getTime()

    if (cloudTime > localTime) {
      map.set(cloud.id, { ...local, ...cloud })
    } else {
      map.set(cloud.id, { ...cloud, ...local })
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
