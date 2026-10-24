import { useState, useCallback, useEffect } from 'react'
import type {
  SpaceScene,
  SpaceMeta,
  LetterItem,
} from '@/features/create-space/model/scenes.types'
import {
  SpaceSceneCollection,
  SpaceSceneEntity,
} from '@/features/create-space/model/domain'
import {
  SCENE_STORAGE_KEY,
  SCENES_STORAGE_KEY,
  META_STORAGE_KEY,
  INITIAL_SCENES,
  DEFAULT_SPACE_META,
  loadFromStorage,
  saveToStorage,
} from './multi-scene-storage'
import type { UseMultiSceneStateReturn } from './multi-scene-storage'

export type { UseMultiSceneStateReturn }

export function useMultiSceneState(
  initialSceneId?: string,
): UseMultiSceneStateReturn {
  const [collection, setCollection] = useState<SpaceSceneCollection>(() => {
    const saved = loadFromStorage<SpaceScene[]>(
      SCENES_STORAGE_KEY,
      INITIAL_SCENES,
    )
    return SpaceSceneCollection.fromDTOs(
      Array.isArray(saved) && saved.length > 0 ? saved : INITIAL_SCENES,
    )
  })

  const [spaceMeta, setSpaceMeta] = useState<SpaceMeta>(() =>
    loadFromStorage<SpaceMeta>(META_STORAGE_KEY, DEFAULT_SPACE_META),
  )

  const [activeSceneId, setActiveSceneIdState] = useState<string>(() => {
    if (
      initialSceneId === 'share' ||
      initialSceneId === 'hub' ||
      initialSceneId === 'gate'
    ) {
      return initialSceneId
    }
    const saved = loadFromStorage<string>(SCENE_STORAGE_KEY, 'hub')
    if (saved === 'hub' || saved === 'gate' || saved === 'share') return saved
    const savedScenes = loadFromStorage<SpaceScene[]>(
      SCENES_STORAGE_KEY,
      INITIAL_SCENES,
    )
    if (Array.isArray(savedScenes) && savedScenes.some((s) => s.id === saved)) {
      return saved
    }
    return 'hub'
  })

  const setActiveSceneId = useCallback((id: string) => {
    setActiveSceneIdState(id)
    saveToStorage(SCENE_STORAGE_KEY, id)
  }, [])

  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null)
  const [openLetterId, setOpenLetterId] = useState<string | null>(null)

  const scenes = collection.toDTOs()

  useEffect(() => {
    saveToStorage(SCENES_STORAGE_KEY, collection.toDTOs())
  }, [collection])

  useEffect(() => {
    saveToStorage(META_STORAGE_KEY, spaceMeta)
  }, [spaceMeta])

  const setScenes: React.Dispatch<React.SetStateAction<SpaceScene[]>> =
    useCallback((action) => {
      setCollection((prev) => {
        const nextDTOs =
          typeof action === 'function' ? action(prev.toDTOs()) : action
        return SpaceSceneCollection.fromDTOs(nextDTOs)
      })
    }, [])

  const handleAddScene = useCallback(
    (newScene: SpaceScene) => {
      setCollection((prev) => {
        const next = prev.clone()
        next.add(SpaceSceneEntity.fromDTO(newScene))
        return next
      })
      setActiveSceneId(newScene.id)
    },
    [setActiveSceneId],
  )

  const handleDeleteScene = useCallback(
    (sceneId: string) => {
      setCollection((prev) => {
        const next = prev.clone()
        next.remove(sceneId)
        return next
      })
      if (activeSceneId === sceneId) {
        setActiveSceneId('hub')
      }
    },
    [activeSceneId, setActiveSceneId],
  )

  const handleRenameScene = useCallback((sceneId: string, newTitle: string) => {
    setCollection((prev) => {
      const next = prev.clone()
      next.rename(sceneId, newTitle)
      return next
    })
  }, [])

  const handleUpdateScene = useCallback(
    (sceneId: string, updates: { title?: string; subtitle?: string }) => {
      setCollection((prev) => {
        const next = prev.clone()
        next.updateScene(sceneId, updates)
        return next
      })
    },
    [],
  )

  const handleDuplicateScene = useCallback(
    (sceneId: string) => {
      setCollection((prev) => {
        const next = prev.clone()
        const duplicated = next.duplicate(sceneId)
        if (duplicated) {
          setActiveSceneId(duplicated.id)
        }
        return next
      })
    },
    [setActiveSceneId],
  )

  const handleMoveScene = useCallback(
    (sceneId: string, direction: 'left' | 'right') => {
      setCollection((prev) => {
        const next = prev.clone()
        next.reorder(sceneId, direction)
        return next
      })
    },
    [],
  )

  const handleUpdateLetter = useCallback((updatedLetter: LetterItem) => {
    setCollection((prev) => {
      const next = prev.clone()
      next.updateLetter(updatedLetter)
      return next
    })
  }, [])

  const handleAddLetter = useCallback(() => {
    setCollection((prev) => {
      const next = prev.clone()
      const letter = next.addLetter()
      if (letter) {
        setSelectedLetterId(letter.id)
      }
      return next
    })
  }, [])

  const handleDeleteLetter = useCallback((id: string) => {
    setCollection((prev) => {
      const next = prev.clone()
      next.removeLetter(id)
      return next
    })
    setSelectedLetterId(null)
    setOpenLetterId((prev) => (prev === id ? null : prev))
  }, [])

  const handleDuplicateLetter = useCallback((id: string) => {
    setCollection((prev) => {
      const next = prev.clone()
      const duplicated = next.duplicateLetter(id)
      if (duplicated) {
        setSelectedLetterId(duplicated.id)
      }
      return next
    })
  }, [])

  const handleReorderScenes = useCallback(
    (fromIndex: number, toIndex: number) => {
      setCollection((prev) => {
        const next = prev.clone()
        next.reorderScenes(fromIndex, toIndex)
        return next
      })
    },
    [],
  )

  const handleReorderLetters = useCallback(
    (fromIndex: number, toIndex: number, sceneId?: string) => {
      setCollection((prev) => {
        const next = prev.clone()
        next.reorderLetters(fromIndex, toIndex, sceneId)
        return next
      })
    },
    [],
  )

  return {
    activeSceneId,
    setActiveSceneId,
    spaceMeta,
    setSpaceMeta,
    scenes,
    setScenes,
    selectedLetterId,
    setSelectedLetterId,
    openLetterId,
    setOpenLetterId,
    handleAddScene,
    handleDeleteScene,
    handleRenameScene,
    handleUpdateScene,
    handleDuplicateScene,
    handleMoveScene,
    handleReorderScenes,
    handleUpdateLetter,
    handleAddLetter,
    handleDuplicateLetter,
    handleDeleteLetter,
    handleReorderLetters,
  }
}
