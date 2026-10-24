import { useState, useEffect, useCallback } from 'react'
import type { UserSpace } from './types'
import {
  getSavedSpaces,
  saveSpace as saveSpaceToStorage,
  deleteSpace as deleteSpaceFromStorage,
  duplicateSpace as duplicateSpaceInStorage,
  SPACES_CHANGED_EVENT,
} from './spaces-storage'

export interface UseUserSpacesReturn {
  spaces: UserSpace[]
  saveSpace: (space: UserSpace) => UserSpace
  deleteSpace: (id: string) => void
  duplicateSpace: (id: string) => UserSpace | undefined
  refreshSpaces: () => void
}

export function useUserSpaces(): UseUserSpacesReturn {
  const [spaces, setSpaces] = useState<UserSpace[]>(() => getSavedSpaces())

  const refreshSpaces = useCallback(() => {
    setSpaces(getSavedSpaces())
  }, [])

  useEffect(() => {
    const handleCustomChange = () => {
      refreshSpaces()
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === null || e.key === 'sfy_user_spaces_v1') {
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
      return saved
    },
    [refreshSpaces],
  )

  const deleteSpace = useCallback(
    (id: string) => {
      deleteSpaceFromStorage(id)
      refreshSpaces()
    },
    [refreshSpaces],
  )

  const duplicateSpace = useCallback(
    (id: string) => {
      const duplicated = duplicateSpaceInStorage(id)
      refreshSpaces()
      return duplicated
    },
    [refreshSpaces],
  )

  return {
    spaces,
    saveSpace,
    deleteSpace,
    duplicateSpace,
    refreshSpaces,
  }
}
