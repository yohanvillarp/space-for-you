import { useState, useCallback, useEffect, useMemo } from 'react'
import type {
  SpaceScene,
  LetterItem,
} from '@/features/create-space/model/scenes.types'
import {
  SpaceSceneCollection,
  SpaceSceneEntity,
} from '@/features/create-space/model/domain'
import type { SpaceTemplateId } from '@/entities/space'
import {
  INITIAL_SCENES,
  loadFromStorage,
  saveToStorage,
  getSpaceStorageKeys,
  createInitialScenesForTemplate,
} from './multi-scene-storage'
import type { UseMultiSceneStateReturn } from './multi-scene-storage'
import { useSpaceMetaState } from './useSpaceMetaState'
import { INITIAL_LETTERS_DATA } from '@/features/create-space/model/scenes.types'

export type { UseMultiSceneStateReturn }

const LEGACY_SEED_IDS = new Set([
  'letter-1',
  'letter-2',
  'letter-3',
  'letter-4',
])

const sanitizeLegacyLetters = (scenes: SpaceScene[]): SpaceScene[] =>
  scenes.map((s) =>
    s.type === 'letters' &&
    s.letters.length === 4 &&
    s.letters.every((l) => LEGACY_SEED_IDS.has(l.id))
      ? { ...s, letters: INITIAL_LETTERS_DATA.map((item) => ({ ...item })) }
      : s,
  )

export function useMultiSceneState(
  initialSceneId?: string,
  spaceId?: string,
  templateId?: SpaceTemplateId,
): UseMultiSceneStateReturn {
  const keys = getSpaceStorageKeys(spaceId, templateId)
  const defaultScenes = templateId
    ? createInitialScenesForTemplate(templateId)
    : INITIAL_SCENES

  const [collection, setCollection] = useState<SpaceSceneCollection>(() => {
    const saved = loadFromStorage<SpaceScene[] | null>(keys.scenesKey, null)
    if (Array.isArray(saved) && saved.length > 0) {
      return SpaceSceneCollection.fromDTOs(sanitizeLegacyLetters(saved))
    }
    return SpaceSceneCollection.fromDTOs(defaultScenes)
  })

  const { spaceMeta, setSpaceMeta } = useSpaceMetaState(spaceId)

  const [activeSceneId, setActiveSceneIdState] = useState<string>(() => {
    if (
      initialSceneId === 'share' ||
      initialSceneId === 'hub' ||
      initialSceneId === 'gate'
    ) {
      return initialSceneId
    }
    const saved = loadFromStorage<string>(keys.activeSceneKey, 'hub')
    if (saved === 'hub' || saved === 'gate' || saved === 'share') return saved
    const savedScenes = loadFromStorage<SpaceScene[]>(
      keys.scenesKey,
      defaultScenes,
    )
    return Array.isArray(savedScenes) && savedScenes.some((s) => s.id === saved)
      ? saved
      : 'hub'
  })

  const setActiveSceneId = useCallback(
    (id: string) => {
      setActiveSceneIdState(id)
      saveToStorage(keys.activeSceneKey, id)
    },
    [keys.activeSceneKey],
  )

  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null)
  const [openLetterId, setOpenLetterId] = useState<string | null>(null)

  const scenes = useMemo(() => collection.toDTOs(), [collection])

  useEffect(() => {
    saveToStorage(keys.scenesKey, scenes)
  }, [scenes, keys.scenesKey])

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
