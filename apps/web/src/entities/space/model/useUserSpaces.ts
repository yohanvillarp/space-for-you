import { useState, useEffect, useCallback } from 'react'
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
import type { SpaceScene } from '@/features/create-space/model/scenes.types'

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

function loadLocalScenesForSpace(space: UserSpace): SpaceScene[] {
  const keys = getSpaceStorageKeys(space.id, space.templateId)
  return loadFromStorage<SpaceScene[]>(keys.scenesKey, [])
}

function syncSpaceToCloudAsync(space: UserSpace): void {
  getCurrentUser()
    .then(async (user) => {
      if (user) {
        const scenes = loadLocalScenesForSpace(space)
        await saveSpaceToDatabase({ space, scenes, userId: user.$id })
        clearPendingCloudSync(space.id)
      }
    })
    .catch(() => {})
}

export function useUserSpaces(): UseUserSpacesReturn {
  const [spaces, setSpaces] = useState<UserSpace[]>(() => getSavedSpaces())
  const [isLoading, setIsLoading] = useState(false)
  const [isCloudConnected, setIsCloudConnected] = useState(false)

  const refreshSpaces = useCallback(() => {
    setSpaces(getSavedSpaces())
  }, [])

  const syncWithCloud = useCallback(() => {
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
        if (previousUserId && previousUserId !== user.$id) {
          clearAllLocalSpaces()
        }
        setLastSyncedUserId(user.$id)
        setIsCloudConnected(true)
        setIsLoading(true)

        try {
          const cloudSpaces = await fetchUserSpaces(user.$id)
          const pendingIds = getPendingCloudSyncIds()
          const reconciled = reconcileSpacesWithCloud(
            getSavedSpaces(),
            cloudSpaces,
            pendingIds,
          )

          setSpaces(reconciled)
          try {
            localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(reconciled))
          } catch {
            // ignore quota
          }

          const cloudIdSet = new Set(cloudSpaces.map((s) => s.id))
          for (const item of reconciled) {
            if (pendingIds.has(item.id) && !cloudIdSet.has(item.id)) {
              saveSpaceToDatabase({
                space: item,
                scenes: loadLocalScenesForSpace(item),
                userId: user.$id,
              })
                .then(() => clearPendingCloudSync(item.id))
                .catch(() => {})
            }
          }
        } catch {
          // Keep local spaces if network is temporarily unreachable
        } finally {
          setIsLoading(false)
        }
      })
      .catch(() => {
        setIsCloudConnected(false)
      })
  }, [])

  useEffect(() => {
    syncWithCloud()
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') syncWithCloud()
    }
    window.addEventListener('focus', syncWithCloud)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('focus', syncWithCloud)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [syncWithCloud])

  useEffect(() => {
    const handleCustomChange = () => refreshSpaces()
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === null || e.key === SPACES_STORAGE_KEY) refreshSpaces()
    }
    window.addEventListener(SPACES_CHANGED_EVENT, handleCustomChange)
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener(SPACES_CHANGED_EVENT, handleCustomChange)
      window.removeEventListener('storage', handleStorageChange)
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
      deleteSpaceFromDatabase(id).catch(() => {})
    },
    [refreshSpaces],
  )

  const duplicateSpace = useCallback(
    (id: string, customTitle?: string, customRecipient?: string) => {
      const duplicated = duplicateSpaceInStorage(
        id,
        customTitle,
        customRecipient,
      )
      refreshSpaces()
      if (duplicated) syncSpaceToCloudAsync(duplicated)
      return duplicated
    },
    [refreshSpaces],
  )

  const archiveSpace = useCallback(
    (id: string) => {
      const target = spaces.find((s) => s.id === id)
      if (target) saveSpace({ ...target, status: 'archived' })
    },
    [spaces, saveSpace],
  )

  const restoreSpace = useCallback(
    (id: string) => {
      const target = spaces.find((s) => s.id === id)
      if (target) saveSpace({ ...target, status: 'draft' })
    },
    [spaces, saveSpace],
  )

  const renameSpace = useCallback(
    (id: string, newTitle: string, newRecipient?: string) => {
      const target = spaces.find((s) => s.id === id)
      if (!target) return undefined
      const updated: UserSpace = {
        ...target,
        title: newTitle.trim() || target.title,
        recipientName: newRecipient?.trim() || target.recipientName,
      }
      try {
        const metaRaw = localStorage.getItem(`sfy_meta_${id}`)
        if (metaRaw) {
          localStorage.setItem(
            `sfy_meta_${id}`,
            JSON.stringify({
              ...JSON.parse(metaRaw),
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
    [spaces, saveSpace],
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
