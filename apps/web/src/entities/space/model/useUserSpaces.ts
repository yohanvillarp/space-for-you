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
import { getCurrentUser } from '@/shared/api'
import {
  fetchUserSpaces,
  deleteSpaceFromDatabase,
  saveSpaceToDatabase,
} from '@/entities/space/api'

/**
 * Return interface for the `useUserSpaces` hook.
 */
export interface UseUserSpacesReturn {
  /** Array of active spaces owned by or available to the user. */
  spaces: UserSpace[]
  /** Whether spaces are currently being fetched from Appwrite Databases. */
  isLoading: boolean
  /** Whether the user is authenticated and cloud sync is connected. */
  isCloudConnected: boolean
  /** Saves or updates a space, synchronizing to storage and cloud. */
  saveSpace: (space: UserSpace) => UserSpace
  /** Deletes a space by ID from local storage and Appwrite Databases. */
  deleteSpace: (id: string) => void
  /** Creates a clone of an existing space with optional custom title and recipient. */
  duplicateSpace: (
    id: string,
    customTitle?: string,
    customRecipient?: string,
  ) => UserSpace | undefined
  /** Renames a space with a new title and recipient. */
  renameSpace: (
    id: string,
    newTitle: string,
    newRecipient?: string,
  ) => UserSpace | undefined
  /** Re-reads spaces from local storage to sync UI state. */
  refreshSpaces: () => void
}

/**
 * Custom hook providing reactive access to user spaces with hybrid offline/cloud support.
 *
 * @remarks
 * 1. Instantly initializes with local storage data for zero layout shift (optimistic UI).
 * 2. On mount, detects Appwrite Auth session and fetches live spaces from `sfy_primary_db`.
 * 3. Listens to `StorageEvent` and internal `SPACES_CHANGED_EVENT` to synchronize across tabs.
 *
 * @returns State and mutation methods for user spaces.
 *
 * @example
 * ```tsx
 * const { spaces, isLoading, deleteSpace } = useUserSpaces()
 * ```
 */
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
          if (isMounted && cloudSpaces.length > 0) {
            setSpaces(cloudSpaces)
            try {
              localStorage.setItem(
                SPACES_STORAGE_KEY,
                JSON.stringify(cloudSpaces),
              )
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
    const handleCustomChange = () => {
      refreshSpaces()
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === null || e.key === SPACES_STORAGE_KEY) {
        refreshSpaces()
      }
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
        .catch(() => {
          // ignore
        })

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
    refreshSpaces,
  }
}
