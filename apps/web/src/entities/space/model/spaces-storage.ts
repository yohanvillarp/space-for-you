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
import {
  PENDING_CLOUD_SYNC_KEY,
  clearPendingCloudSync,
  markPendingCloudSync,
} from './space-sync-engine'

export const SPACES_STORAGE_KEY = 'sfy_user_spaces_v1'
export const SPACES_CHANGED_EVENT = 'sfy:spaces_changed'

const LEGACY_SEED_SPACE_IDS = new Set([
  'space_sophia_birthday',
  'space_alex_anniversary',
])

function emitChangeEvent(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SPACES_CHANGED_EVENT))
  }
}

export function clearAllLocalSpaces(): void {
  if (typeof window === 'undefined') return
  try {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i)
      if (
        k &&
        (k === SPACES_STORAGE_KEY ||
          k === PENDING_CLOUD_SYNC_KEY ||
          k.startsWith('sfy_space_') ||
          k.startsWith('sfy_scenes_') ||
          k.startsWith('sfy_meta_') ||
          k.startsWith('sfy_active_scene_') ||
          k.startsWith('sfy_protection_'))
      ) {
        keysToRemove.push(k)
      }
    }
    for (const k of keysToRemove) localStorage.removeItem(k)
  } catch {
    // ignore
  }
  emitChangeEvent()
}

export function getSavedSpaces(): UserSpace[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(SPACES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const cleaned = (parsed as UserSpace[]).filter(
      (s) => s && typeof s.id === 'string' && !LEGACY_SEED_SPACE_IDS.has(s.id),
    )
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(cleaned))
    }
    return cleaned
  } catch {
    return []
  }
}

export function getSpaceById(id: string): UserSpace | undefined {
  return getSavedSpaces().find((s) => s.id === id)
}

export function saveSpace(space: UserSpace): UserSpace {
  const current = getSavedSpaces()
  const existingIndex = current.findIndex((s) => s.id === space.id)
  const spaceWithTimestamp: UserSpace = {
    ...space,
    updatedAt: new Date().toISOString(),
  }

  const updated =
    existingIndex >= 0
      ? current.map((item, idx) =>
          idx === existingIndex ? spaceWithTimestamp : item,
        )
      : [spaceWithTimestamp, ...current]

  try {
    localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // ignore quota errors
  }

  emitChangeEvent()
  return spaceWithTimestamp
}

export function purgeSpaceStorageKeys(id: string): void {
  try {
    const keys = getSpaceStorageKeys(id)
    localStorage.removeItem(keys.scenesKey)
    localStorage.removeItem(keys.metaKey)
    localStorage.removeItem(keys.activeSceneKey)
    localStorage.removeItem(keys.protectionKey)
    clearPendingCloudSync(id)
  } catch {
    // ignore
  }
}

export function deleteSpace(id: string): void {
  const updated = getSavedSpaces().filter((s) => s.id !== id)
  try {
    localStorage.setItem(SPACES_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // ignore
  }
  purgeSpaceStorageKeys(id)
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
  const sourceScenes = loadFromStorage<SpaceScene[]>(
    sourceKeys.scenesKey,
    createInitialScenesForTemplate(target.templateId),
  )

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
  const finalTitle = customTitle?.trim() || `${target.title} (Copy)`
  const finalRecipient = customRecipient?.trim() || target.recipientName
  saveToStorage(targetKeys.metaKey, {
    title: finalTitle,
    recipientName: finalRecipient,
    senderName: '',
    dedicationMessage: '',
  })

  const canvasScene = clonedScenes.find(
    (s): s is FreeCanvasScene => s.type === 'free-canvas',
  )
  markPendingCloudSync(newId)
  return saveSpace({
    ...target,
    id: newId,
    title: finalTitle,
    recipientName: finalRecipient,
    scenesCount: clonedScenes.length,
    artifactsCount: canvasScene?.items.length ?? target.artifactsCount,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

export function createNewSpace(
  templateId: SpaceTemplateId,
  title = 'My Dedicated Space',
  recipientName = 'Someone Special',
): UserSpace {
  const newId = `space_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  const initialScenes = createInitialScenesForTemplate(templateId)
  const targetKeys = getSpaceStorageKeys(newId)
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
  markPendingCloudSync(newId)
  return saveSpace({
    id: newId,
    title,
    recipientName,
    templateId,
    scenesCount: initialScenes.length,
    artifactsCount: canvasScene?.items.length ?? 4,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}
