import type { UserSpace, SpaceTemplateId } from './types'

export const SPACES_STORAGE_KEY = 'sfy_user_spaces_v1'
export const SPACES_CHANGED_EVENT = 'sfy:spaces_changed'

const SEED_SPACES: UserSpace[] = [
  {
    id: 'space_sophia_birthday',
    title: "Sophia's 25th Birthday Celebration",
    recipientName: 'Sophia',
    templateId: 'birthday',
    scenesCount: 3,
    artifactsCount: 8,
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
    artifactsCount: 5,
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
  } catch {
    // ignore
  }
  emitChangeEvent()
}

export function duplicateSpace(id: string): UserSpace | undefined {
  const target = getSpaceById(id)
  if (!target) return undefined

  const duplicated: UserSpace = {
    ...target,
    id: `space_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: `${target.title} (Copy)`,
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
  const newSpace: UserSpace = {
    id: `space_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title,
    recipientName,
    templateId,
    scenesCount: 1,
    artifactsCount: 4,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return saveSpace(newSpace)
}
