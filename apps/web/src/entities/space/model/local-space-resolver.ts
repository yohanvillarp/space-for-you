import type { UserSpace } from './types'
import type { SpaceWithScenes } from '@/entities/space/api/types'
import { getSpaceById, getSavedSpaces } from './spaces-storage'
import {
  getSpaceStorageKeys,
  loadFromStorage,
  createInitialScenesForTemplate,
  SCENES_STORAGE_KEY,
} from '@/features/create-space/ui/editor/multi-scene-storage'
import type {
  SpaceScene,
  SpaceMeta,
} from '@/features/create-space/model/scenes.types'
import type { SpaceProtectionConfig } from '@/features/space-lock'
import { serializeProtectionTheme } from '@/features/space-lock'

/**
 * Resolves a space and its scenes from client-side `localStorage`.
 * Serves as an instant offline and local-development fallback when viewing
 * spaces created in the browser before or without Appwrite Cloud synchronization.
 *
 * @param slugOrId - Unique space identifier or slug alias.
 * @returns Complete SpaceWithScenes or `null` if not found in local memory.
 */
export function getLocalSpaceWithScenes(
  slugOrId: string,
): SpaceWithScenes | null {
  if (typeof window === 'undefined') return null

  const cleanId = slugOrId.trim()
  let space: UserSpace | undefined = getSpaceById(cleanId)

  if (!space) {
    const allSpaces = getSavedSpaces()
    space = allSpaces.find(
      (s) =>
        s.id === cleanId ||
        (s as unknown as { slug?: string }).slug === cleanId,
    )
  }

  if (!space) return null

  const keys = getSpaceStorageKeys(space.id, space.templateId)
  const defaultScenes = createInitialScenesForTemplate(space.templateId)
  let scenes = loadFromStorage<SpaceScene[]>(keys.scenesKey, defaultScenes)

  // Fallback to active scenes draft if scoped scenes key has not been populated
  if (!scenes || scenes.length === 0) {
    scenes = loadFromStorage<SpaceScene[]>(SCENES_STORAGE_KEY, defaultScenes)
  }

  const meta =
    loadFromStorage<SpaceMeta | null>(keys.metaKey, null) ??
    loadFromStorage<SpaceMeta | null>('sfy_space_meta_draft', null)

  const protection = loadFromStorage<SpaceProtectionConfig | null>(
    keys.protectionKey,
    null,
  )

  const protectionTheme = protection
    ? serializeProtectionTheme(protection)
    : undefined

  const resolvedPasscodeLength =
    protection?.passcodeLength ??
    (protection?.passcode ? protection.passcode.length : undefined)

  return {
    space,
    scenes,
    senderName: meta?.senderName || '',
    dedicationMessage: meta?.dedicationMessage || '',
    slug: space.id,
    passcodeHash: protection?.enabled ? protection.passcodeHash : undefined,
    passcodeSalt: protection?.enabled ? protection.passcodeSalt : undefined,
    passcodeHint: protection?.enabled ? protection.hint : undefined,
    protectionTheme,
    passcodeLength: resolvedPasscodeLength,
  }
}
