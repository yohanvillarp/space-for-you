import type { UserSpace, SpaceTemplateId } from './types'
import {
  createInitialScenesForTemplate,
  getSpaceStorageKeys,
  loadFromStorage,
  saveToStorage,
} from '@/features/create-space/ui/editor/multi-scene-storage'
import type {
  SpaceScene,
  FreeCanvasScene,
} from '@/features/create-space/model/scenes.types'

export const SPACES_STORAGE_KEY = 'sfy_user_spaces_v1'
export const SPACES_CHANGED_EVENT = 'sfy:spaces_changed'

const SEED_SPACES: UserSpace[] = [
  {
    id: 'space_sophia_birthday',
    title: "Sophia's 25th Birthday Celebration",
    recipientName: 'Sophia',
    templateId: 'birthday',
    scenesCount: 2,
    artifactsCount: 5,
    status: 'ready',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    description:
      'Candlelit cake, memories, and handwritten letters for Sophia.',
  },
  {
    id: 'space_alex_anniversary',
    title: 'Four Years of Shared Sunlight',
    recipientName: 'Alexander',
    templateId: 'anniversary',
    scenesCount: 2,
    artifactsCount: 4,
    status: 'published',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    description: 'Love letters, vinyl melodies, and cherished photographs.',
  },
]

function emitChangeEvent(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SPACES_CHANGED_EVENT))
  }
}

export function getSavedSpaces(): UserSpace[] {
  if (typeof window === 'undefined') return SEED_SPACES
  try {
    const raw = localStorage.getItem(SPACES_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(SEED_SPACES))
      return SEED_SPACES
    }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed as UserSpace[]
    }
    return SEED_SPACES
  } catch {
    return SEED_SPACES
  }
}

export function getSpaceById(id: string): UserSpace | undefined {
  return getSavedSpaces().find((s) => s.id === id)
}

export function saveSpace(space: UserSpace): UserSpace {
  const current = getSavedSpaces()
  const existingIndex = current.findIndex((s) => s.id === space.id)
  let updated: UserSpace[]

  const spaceWithTimestamp: UserSpace = {
    ...space,
    updatedAt: new Date().toISOString(),
  }

  if (existingIndex >= 0) {
    updated = [...current]
    updated[existingIndex] = spaceWithTimestamp
  } else {
    updated = [spaceWithTimestamp, ...current]
  }

  try {
    localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // ignore quota errors
  }

  emitChangeEvent()
  return spaceWithTimestamp
}

export function deleteSpace(id: string): void {
  const current = getSavedSpaces()
  const updated = current.filter((s) => s.id !== id)
  try {
    localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(updated))
    const keys = getSpaceStorageKeys(id)
    localStorage.removeItem(keys.scenesKey)
    localStorage.removeItem(keys.metaKey)
    localStorage.removeItem(keys.activeSceneKey)
    localStorage.removeItem(keys.protectionKey)
  } catch {
    // ignore
  }
  emitChangeEvent()
}

export function duplicateSpace(
  id: string,
  customTitle?: string,
  customRecipient?: string,
): UserSpace | undefined {
  const target = getSpaceById(id)
  if (!target) return undefined

  const newId = `space_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  const sourceKeys = getSpaceStorageKeys(id)
  const targetKeys = getSpaceStorageKeys(newId)

  // Retrieve source scenes or fallback to template defaults
  const sourceScenes = loadFromStorage<SpaceScene[]>(
    sourceKeys.scenesKey,
    createInitialScenesForTemplate(target.templateId),
  )

  // Deep-clone scenes with new unique IDs to avoid collision
  const clonedScenes: SpaceScene[] = sourceScenes.map((scene, idx) => {
    const newSceneId = `scene_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`
    if (scene.type === 'free-canvas') {
      return {
        ...scene,
        id: newSceneId,
        items: scene.items.map((it) => ({
          ...it,
          id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        })),
      }
    }
    return {
      ...scene,
      id: newSceneId,
      letters: scene.letters.map((letItem) => ({
        ...letItem,
        id: `letter_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      })),
    }
  })

  saveToStorage(targetKeys.scenesKey, clonedScenes)

  // Clone metadata
  const metaRaw = localStorage.getItem(sourceKeys.metaKey)
  if (metaRaw) {
    try {
      const parsed = JSON.parse(metaRaw)
      localStorage.setItem(
        targetKeys.metaKey,
        JSON.stringify({
          ...parsed,
          title: customTitle?.trim() || `${target.title} (Copy)`,
          recipientName: customRecipient?.trim() || target.recipientName,
        }),
      )
    } catch {
      // ignore
    }
  }

  const protRaw = localStorage.getItem(sourceKeys.protectionKey)
  if (protRaw) {
    try {
      localStorage.setItem(targetKeys.protectionKey, protRaw)
    } catch {
      // ignore
    }
  }

  const canvasScene = clonedScenes.find(
    (s): s is FreeCanvasScene => s.type === 'free-canvas',
  )
  const artifactsCount = canvasScene?.items.length ?? target.artifactsCount

  const duplicated: UserSpace = {
    ...target,
    id: newId,
    title: customTitle?.trim() || `${target.title} (Copy)`,
    recipientName: customRecipient?.trim() || target.recipientName,
    scenesCount: clonedScenes.length,
    artifactsCount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return saveSpace(duplicated)
}

export function createNewSpace(
  templateId: SpaceTemplateId,
  title = 'My Sanctuary Space',
  recipientName = 'Someone Special',
): UserSpace {
  const newId = `space_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  const initialScenes = createInitialScenesForTemplate(templateId)
  const targetKeys = getSpaceStorageKeys(newId)

  // Initialize isolated scenes and meta for this specific spaceId
  saveToStorage(targetKeys.scenesKey, initialScenes)
  saveToStorage(targetKeys.metaKey, {
    title,
    recipientName,
    senderName: '',
    dedicationMessage: '',
    musicTrack: undefined,
  })

  const canvasScene = initialScenes.find(
    (s): s is FreeCanvasScene => s.type === 'free-canvas',
  )
  const artifactsCount = canvasScene?.items.length ?? 4

  const newSpace: UserSpace = {
    id: newId,
    title,
    recipientName,
    templateId,
    scenesCount: initialScenes.length,
    artifactsCount,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return saveSpace(newSpace)
}
