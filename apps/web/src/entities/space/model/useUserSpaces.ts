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

export interface UseUserSpacesReturn {
  spaces: UserSpace[]
  isLoading: boolean
  isCloudConnected: boolean
  saveSpace: (space: UserSpace) => UserSpace
  deleteSpace: (id: string) => void
  duplicateSpace: (id: string) => UserSpace | undefined
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
    (id: string) => {
      const duplicated = duplicateSpaceInStorage(id)
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

  return {
    spaces,
    isLoading,
    isCloudConnected,
    saveSpace,
    deleteSpace,
    duplicateSpace,
    refreshSpaces,
  }
}
