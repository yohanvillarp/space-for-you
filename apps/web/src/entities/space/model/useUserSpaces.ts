/**
 * @fileoverview Custom hook for querying and synchronizing user spaces across local and cloud tiers.
 * Integrates Appwrite Databases queries with optimistic local storage fallback.
 */

import { useState, useEffect, useCallback } from 'react'
import type { UserSpace } from './types'
import {
  getSavedSpaces,
  saveSpace as saveSpaceToStorage,
  deleteSpace as deleteSpaceFromStorage,
  duplicateSpace as duplicateSpaceInStorage,
  SPACES_CHANGED_EVENT,
  SPACES_STORAGE_KEY,
} from './spaces-storage'
import { mergeSpaces } from './space-sync-engine'
import { getCurrentUser } from '@/shared/api'
import {
  fetchUserSpaces,
  deleteSpaceFromDatabase,
  saveSpaceToDatabase,
} from '@/entities/space/api'

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

export function useUserSpaces(): UseUserSpacesReturn {
  const [spaces, setSpaces] = useState<UserSpace[]>(() => getSavedSpaces())
  const [isLoading, setIsLoading] = useState(false)
  const [isCloudConnected, setIsCloudConnected] = useState(false)

  const refreshSpaces = useCallback(() => {
    setSpaces(getSavedSpaces())
  }, [])

  // Sync with Appwrite Databases on mount if session exists
  useEffect(() => {
    let isMounted = true

    getCurrentUser()
      .then(async (user) => {
        if (!user || !isMounted) return
        setIsCloudConnected(true)
        setIsLoading(true)
        try {
          const cloudSpaces = await fetchUserSpaces(user.$id)
          if (isMounted) {
            const currentLocal = getSavedSpaces()
            const merged = mergeSpaces(currentLocal, cloudSpaces)
            setSpaces(merged)
            try {
              localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(merged))
            } catch {
              // ignore quota
            }
          }
        } catch {
          // Keep local spaces on error
        } finally {
          if (isMounted) setIsLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) setIsCloudConnected(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

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
      const saved = saveSpaceToStorage(space)
      refreshSpaces()

      getCurrentUser()
        .then(async (user) => {
          if (user) {
            await saveSpaceToDatabase({ space: saved, userId: user.$id })
          }
        })
        .catch(() => {})

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

      if (duplicated) {
        getCurrentUser()
          .then(async (user) => {
            if (user) {
              await saveSpaceToDatabase({ space: duplicated, userId: user.$id })
            }
          })
          .catch(() => {})
      }

      return duplicated
    },
    [refreshSpaces],
  )

  const archiveSpace = useCallback(
    (id: string) => {
      const target = spaces.find((s) => s.id === id)
      if (!target) return
      saveSpace({
        ...target,
        status: 'archived',
        updatedAt: new Date().toISOString(),
      })
    },
    [spaces, saveSpace],
  )

  const restoreSpace = useCallback(
    (id: string) => {
      const target = spaces.find((s) => s.id === id)
      if (!target) return
      saveSpace({
        ...target,
        status: 'draft',
        updatedAt: new Date().toISOString(),
      })
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
        updatedAt: new Date().toISOString(),
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
