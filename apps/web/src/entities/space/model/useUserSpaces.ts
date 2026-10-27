import { useState, useEffect, useCallback, useRef } from 'react'
import type { UserSpace } from './types'
import {
  getSavedSpaces,
  saveSpace as saveSpaceToStorage,
  deleteSpace as deleteSpaceFromStorage,
  duplicateSpace as duplicateSpaceInStorage,
  clearAllLocalSpaces,
  SPACES_CHANGED_EVENT,
  SPACES_STORAGE_KEY,
} from './spaces-storage'
import {
  reconcileSpacesWithCloud,
  getPendingCloudSyncIds,
  markPendingCloudSync,
  clearPendingCloudSync,
  getPendingCloudDeleteIds,
  clearPendingCloudDelete,
  getLastSyncedUserId,
  setLastSyncedUserId,
} from './space-sync-engine'
import { getCurrentUser } from '@/shared/api'
import {
  fetchUserSpaces,
  deleteSpaceFromDatabase,
  saveSpaceToDatabase,
} from '@/entities/space/api'
import {
  getSpaceStorageKeys,
  loadFromStorage,
} from '@/features/create-space/ui/editor/multi-scene-storage'
import type {
  SpaceScene,
  SpaceMeta,
} from '@/features/create-space/model/scenes.types'

export interface UseUserSpacesReturn {
  spaces: UserSpace[]
  isLoading: boolean
  isCloudConnected: boolean
  saveSpace: (space: UserSpace) => UserSpace
  deleteSpace: (id: string) => void
  duplicateSpace: (
    id: string,
    customTitle?: string,
    customRecipient?: string,
  ) => UserSpace | undefined
  renameSpace: (
    id: string,
    newTitle: string,
    newRecipient?: string,
  ) => UserSpace | undefined
  archiveSpace: (id: string) => void
  restoreSpace: (id: string) => void
  refreshSpaces: () => void
}

async function pushSpaceWithLocalData(space: UserSpace, userId: string) {
  const keys = getSpaceStorageKeys(space.id, space.templateId)
  const scenes = loadFromStorage<SpaceScene[]>(keys.scenesKey, [])
  const meta = loadFromStorage<Partial<SpaceMeta>>(keys.metaKey, {})
  await saveSpaceToDatabase({
    space,
    scenes,
    userId,
    senderName: meta.senderName,
    dedicationMessage: meta.dedicationMessage,
  })
  clearPendingCloudSync(space.id)
}

function syncSpaceToCloudAsync(space: UserSpace): void {
  getCurrentUser()
    .then(async (user) => {
      if (user) await pushSpaceWithLocalData(space, user.$id)
    })
    .catch(() => {})
}

export function useUserSpaces(): UseUserSpacesReturn {
  const [spaces, setSpaces] = useState<UserSpace[]>(() => getSavedSpaces())
  const [isLoading, setIsLoading] = useState(false)
  const [isCloudConnected, setIsCloudConnected] = useState(false)
  const isSyncingRef = useRef(false)

  const refreshSpaces = useCallback(() => setSpaces(getSavedSpaces()), [])

  const syncWithCloud = useCallback(() => {
    if (isSyncingRef.current) return
    isSyncingRef.current = true

    getCurrentUser()
      .then(async (user) => {
        if (!user) {
          setIsCloudConnected(false)
          clearAllLocalSpaces()
          setLastSyncedUserId(null)
          setSpaces([])
          return
        }

        const previousUserId = getLastSyncedUserId()
        if (previousUserId && previousUserId !== user.$id) clearAllLocalSpaces()
        setLastSyncedUserId(user.$id)
        setIsCloudConnected(true)
        setIsLoading(true)

        try {
          const cloudSpaces = await fetchUserSpaces(user.$id)
          const reconciled = reconcileSpacesWithCloud(
            getSavedSpaces(),
            cloudSpaces,
            getPendingCloudSyncIds(),
            getPendingCloudDeleteIds(),
          )
          setSpaces(reconciled)
          try {
            localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(reconciled))
          } catch {
            // ignore quota
          }

          for (const delId of getPendingCloudDeleteIds()) {
            try {
              await deleteSpaceFromDatabase(delId)
              clearPendingCloudDelete(delId)
            } catch {
              // retry on next sync
            }
          }

          const activePendingIds = getPendingCloudSyncIds()
          for (const item of reconciled) {
            if (activePendingIds.has(item.id)) {
              try {
                await pushSpaceWithLocalData(item, user.$id)
              } catch {
                // retry on next sync
              }
            }
          }
        } catch {
          // Keep local spaces if network is temporarily unreachable
        } finally {
          setIsLoading(false)
        }
      })
      .catch(() => setIsCloudConnected(false))
      .finally(() => {
        isSyncingRef.current = false
      })
  }, [])

  useEffect(() => {
    syncWithCloud()
    const onVis = () => {
      if (document.visibilityState === 'visible') syncWithCloud()
    }
    window.addEventListener('focus', syncWithCloud)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      window.removeEventListener('focus', syncWithCloud)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [syncWithCloud])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === SPACES_STORAGE_KEY) refreshSpaces()
    }
    window.addEventListener(SPACES_CHANGED_EVENT, refreshSpaces)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(SPACES_CHANGED_EVENT, refreshSpaces)
      window.removeEventListener('storage', onStorage)
    }
  }, [refreshSpaces])

  const saveSpace = useCallback(
    (space: UserSpace) => {
      markPendingCloudSync(space.id)
      const saved = saveSpaceToStorage(space)
      refreshSpaces()
      syncSpaceToCloudAsync(saved)
      return saved
    },
    [refreshSpaces],
  )

  const deleteSpace = useCallback(
    (id: string) => {
      deleteSpaceFromStorage(id)
      refreshSpaces()
      deleteSpaceFromDatabase(id)
        .then(() => clearPendingCloudDelete(id))
        .catch(() => {})
    },
    [refreshSpaces],
  )

  const duplicateSpace = useCallback(
    (id: string, customTitle?: string, customRecipient?: string) => {
      const dup = duplicateSpaceInStorage(id, customTitle, customRecipient)
      refreshSpaces()
      if (dup) syncSpaceToCloudAsync(dup)
      return dup
    },
    [refreshSpaces],
  )

  const archiveSpace = useCallback(
    (id: string) => {
      const target = getSavedSpaces().find((s) => s.id === id)
      if (target) saveSpace({ ...target, status: 'archived' })
    },
    [saveSpace],
  )

  const restoreSpace = useCallback(
    (id: string) => {
      const target = getSavedSpaces().find((s) => s.id === id)
      if (target) saveSpace({ ...target, status: 'draft' })
    },
    [saveSpace],
  )

  const renameSpace = useCallback(
    (id: string, newTitle: string, newRecipient?: string) => {
      const target = getSavedSpaces().find((s) => s.id === id)
      if (!target) return undefined
      const updated: UserSpace = {
        ...target,
        title: newTitle.trim() || target.title,
        recipientName: newRecipient?.trim() || target.recipientName,
      }
      try {
        const metaRaw = localStorage.getItem(`sfy_meta_${id}`)
        if (metaRaw) {
          const parsed = JSON.parse(metaRaw)
          localStorage.setItem(
            `sfy_meta_${id}`,
            JSON.stringify({
              ...parsed,
              title: updated.title,
              recipientName: updated.recipientName,
            }),
          )
        }
      } catch {
        // ignore
      }
      return saveSpace(updated)
    },
    [saveSpace],
  )

  return {
    spaces,
    isLoading,
    isCloudConnected,
    saveSpace,
    deleteSpace,
    duplicateSpace,
    renameSpace,
    archiveSpace,
    restoreSpace,
    refreshSpaces,
  }
}
