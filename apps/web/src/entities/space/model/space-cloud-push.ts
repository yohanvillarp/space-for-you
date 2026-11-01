import type { UserSpace } from './types'
import { clearPendingCloudSync } from './space-sync-engine'
import { getCurrentUser } from '@/shared/api'
import { saveSpaceToDatabase } from '@/entities/space/api'
import {
  getSpaceStorageKeys,
  loadFromStorage,
} from '@/features/create-space/ui/editor/multi-scene-storage'
import type {
  SpaceScene,
  SpaceMeta,
} from '@/features/create-space/model/scenes.types'

/**
 * Pushes a local space and its associated scenes/metadata to Appwrite Database.
 */
export async function pushSpaceWithLocalData(
  space: UserSpace,
  userId: string,
): Promise<void> {
  const keys = getSpaceStorageKeys(space.id, space.templateId)
  const scenes = loadFromStorage<SpaceScene[]>(keys.scenesKey, [])
  const meta = loadFromStorage<Partial<SpaceMeta>>(keys.metaKey, {})
  await saveSpaceToDatabase({
    space,
    scenes,
    userId,
    senderName: meta.senderName,
    dedicationMessage: meta.dedicationMessage,
  })
  clearPendingCloudSync(space.id)
}

/**
 * Asynchronously synchronizes a modified space to cloud storage in the background.
 */
export function syncSpaceToCloudAsync(space: UserSpace): void {
  getCurrentUser()
    .then(async (user) => {
      if (user) await pushSpaceWithLocalData(space, user.$id)
    })
    .catch(() => {})
}
