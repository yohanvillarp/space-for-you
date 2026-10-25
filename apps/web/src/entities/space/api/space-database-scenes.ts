/**
 * @fileoverview Subroutines for persisting and deleting scene documents in Appwrite Databases.
 */

import { ID, Query } from 'appwrite'
import { databases } from '@/shared/api'
import { ENV } from '@/shared/config'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'

const DB_ID = ENV.APPWRITE_DATABASE_ID
const SCENES_COLL = ENV.APPWRITE_SCENES_COLLECTION_ID

/**
 * Upserts all scenes for a given space in Appwrite Databases.
 */
export async function saveScenesToDatabase(
  spaceId: string,
  scenes: SpaceScene[],
  perms: string[],
): Promise<void> {
  if (scenes.length === 0) return

  for (let index = 0; index < scenes.length; index++) {
    const scene = scenes[index]
    const scenePayload = {
      spaceId,
      order: index,
      type: scene.type,
      title: scene.title,
      subtitle: scene.subtitle || '',
      icon: scene.icon || 'Sparkles',
      payload: JSON.stringify(
        scene.type === 'letters' ? scene.letters : scene.items,
      ),
    }

    try {
      await databases.updateDocument(
        DB_ID,
        SCENES_COLL,
        scene.id,
        scenePayload,
        perms,
      )
    } catch {
      const sceneDocId =
        scene.id.startsWith('scene_') && scene.id.length <= 36
          ? scene.id
          : ID.unique()
      await databases.createDocument(
        DB_ID,
        SCENES_COLL,
        sceneDocId,
        scenePayload,
        perms,
      )
    }
  }
}

/**
 * Deletes all scene documents associated with a parent space ID.
 */
export async function deleteSpaceScenes(spaceId: string): Promise<void> {
  const scenes = await databases.listDocuments(DB_ID, SCENES_COLL, [
    Query.equal('spaceId', spaceId),
  ])
  for (const sc of scenes.documents) {
    try {
      await databases.deleteDocument(DB_ID, SCENES_COLL, sc.$id)
    } catch {
      // ignore individual delete failure
    }
  }
}
