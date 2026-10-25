/**
 * @fileoverview Types and storage helpers for multi-scene state management.
 */

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

/**
 * Interface returned by the `useMultiSceneState` hook.
 */
export interface UseMultiSceneStateReturn {
  /** Active scene identifier ('hub' | 'gate' | 'share' | custom scene id). */
  activeSceneId: string
  /** Switches the active scene viewport. */
  setActiveSceneId: (id: string) => void
  /** Space title, recipient, sender, and dedication message. */
  spaceMeta: SpaceMeta
  /** React state setter for space metadata. */
  setSpaceMeta: React.Dispatch<React.SetStateAction<SpaceMeta>>
  /** List of scenes contained in the space. */
  scenes: SpaceScene[]
  /** React state setter for the scenes array. */
  setScenes: React.Dispatch<React.SetStateAction<SpaceScene[]>>
  /** Selected letter ID in the letters desk. */
  selectedLetterId: string | null
  /** Updates the currently selected letter ID. */
  setSelectedLetterId: (id: string | null) => void
  /** Open letter ID displayed in reading modal mode. */
  openLetterId: string | null
  /** Updates open letter ID. */
  setOpenLetterId: (id: string | null) => void
  /** Appends a new scene to the space. */
  handleAddScene: (newScene: SpaceScene) => void
  /** Deletes a scene by ID. */
  handleDeleteScene: (sceneId: string) => void
  /** Renames a scene. */
  handleRenameScene: (sceneId: string, newTitle: string) => void
  /** Updates scene properties. */
  handleUpdateScene: (
    sceneId: string,
    updates: { title?: string; subtitle?: string },
  ) => void
  /** Duplicates an existing scene. */
  handleDuplicateScene: (sceneId: string) => void
  /** Moves a scene left or right in navigation. */
  handleMoveScene: (sceneId: string, direction: 'left' | 'right') => void
  /** Drag-and-drop reordering for scenes. */
  handleReorderScenes: (fromIndex: number, toIndex: number) => void
  /** Updates a letter's content, envelope color, or seal. */
  handleUpdateLetter: (updatedLetter: LetterItem) => void
  /** Adds a new letter to the letters scene. */
  handleAddLetter: () => void
  /** Duplicates a letter. */
  handleDuplicateLetter: (id: string) => void
  /** Deletes a letter. */
  handleDeleteLetter: (id: string) => void
  /** Drag-and-drop reordering for heartfelt letters. */
  handleReorderLetters: (
    fromIndex: number,
    toIndex: number,
    sceneId?: string,
  ) => void
}

/**
 * Loads a value safely from `localStorage` with fallback.
 */
export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/**
 * Saves a JSON-serializable value to `localStorage`.
 */
export function saveToStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

export const INITIAL_SCENES: SpaceScene[] = [
  {
    id: 'scene-letters',
    type: 'letters',
    title: 'Heartfelt Letters',
    subtitle: 'Envelopes sealed with care and memories',
    icon: 'Mail',
    order: 0,
    letters: INITIAL_LETTERS_DATA,
  },
]

export { DEFAULT_SPACE_META }
