import { useState, useCallback } from 'react'
import type {
  SpaceScene,
  SpaceMeta,
  LetterItem,
} from '@/features/create-space/model/scenes.types'
import {
  DEFAULT_SPACE_META,
  INITIAL_LETTERS_DATA,
} from '@/features/create-space/model/scenes.types'
import {
  SpaceSceneCollection,
  SpaceSceneEntity,
} from '@/features/create-space/model/domain'

export interface UseMultiSceneStateReturn {
  activeSceneId: string
  setActiveSceneId: (id: string) => void
  spaceMeta: SpaceMeta
  setSpaceMeta: React.Dispatch<React.SetStateAction<SpaceMeta>>
  scenes: SpaceScene[]
  setScenes: React.Dispatch<React.SetStateAction<SpaceScene[]>>
  selectedLetterId: string | null
  setSelectedLetterId: (id: string | null) => void
  openLetterId: string | null
  setOpenLetterId: (id: string | null) => void
  handleAddScene: (newScene: SpaceScene) => void
  handleDeleteScene: (sceneId: string) => void
  handleRenameScene: (sceneId: string, newTitle: string) => void
  handleUpdateScene: (
    sceneId: string,
    updates: { title?: string; subtitle?: string },
  ) => void
  handleDuplicateScene: (sceneId: string) => void
  handleMoveScene: (sceneId: string, direction: 'left' | 'right') => void
  handleUpdateLetter: (updatedLetter: LetterItem) => void
  handleAddLetter: () => void
  handleDuplicateLetter: (id: string) => void
  handleDeleteLetter: (id: string) => void
}

const INITIAL_SCENES: SpaceScene[] = [
  {
    id: 'scene-canvas',
    type: 'free-canvas',
    title: 'Memory Canvas',
    subtitle: 'Creative stage for keepsakes & moments',
    icon: 'Sparkles',
    order: 1,
    items: [],
  },
  {
    id: 'scene-letters',
    type: 'letters',
    title: 'Heartfelt Letters',
    subtitle: 'Read what I wrote for you',
    icon: 'Mail',
    order: 2,
    letters: [...INITIAL_LETTERS_DATA],
  },
]

export function useMultiSceneState(): UseMultiSceneStateReturn {
  const [activeSceneId, setActiveSceneId] = useState<string>('hub')
  const [spaceMeta, setSpaceMeta] = useState<SpaceMeta>(DEFAULT_SPACE_META)
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null)
  const [openLetterId, setOpenLetterId] = useState<string | null>(null)
  const [collection, setCollection] = useState<SpaceSceneCollection>(() =>
    SpaceSceneCollection.fromDTOs(INITIAL_SCENES),
  )

  const scenes = collection.toDTOs()

  const setScenes: React.Dispatch<React.SetStateAction<SpaceScene[]>> =
    useCallback((action) => {
      setCollection((prev) => {
        const nextDTOs =
          typeof action === 'function' ? action(prev.toDTOs()) : action
        return SpaceSceneCollection.fromDTOs(nextDTOs)
      })
    }, [])

  const handleAddScene = useCallback((newScene: SpaceScene) => {
    setCollection((prev) => {
      const next = prev.clone()
      next.add(SpaceSceneEntity.fromDTO(newScene))
      return next
    })
    setActiveSceneId(newScene.id)
  }, [])

  const handleDeleteScene = useCallback(
    (sceneId: string) => {
      setCollection((prev) => {
        const next = prev.clone()
        const removed = next.remove(sceneId)
        if (removed && activeSceneId === sceneId) {
          setActiveSceneId('hub')
        }
        return next
      })
    },
    [activeSceneId],
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

  const handleDuplicateScene = useCallback((sceneId: string) => {
    setCollection((prev) => {
      const next = prev.clone()
      const duplicated = next.duplicate(sceneId)
      if (duplicated) {
        setActiveSceneId(duplicated.id)
      }
      return next
    })
  }, [])

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
    handleUpdateLetter,
    handleAddLetter,
    handleDuplicateLetter,
    handleDeleteLetter,
  }
}
