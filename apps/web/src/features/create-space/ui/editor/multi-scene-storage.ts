import type {
  SpaceScene,
  SpaceMeta,
  LetterItem,
} from '@/features/create-space/model/scenes.types'
import {
  DEFAULT_SPACE_META,
  INITIAL_LETTERS_DATA,
} from '@/features/create-space/model/scenes.types'

export const SCENE_STORAGE_KEY = 'sfy_active_scene_id'
export const SCENES_STORAGE_KEY = 'sfy_scenes_draft'
export const META_STORAGE_KEY = 'sfy_space_meta_draft'

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

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage quota or permission errors
  }
}

export const INITIAL_SCENES: SpaceScene[] = [
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

export { DEFAULT_SPACE_META }
