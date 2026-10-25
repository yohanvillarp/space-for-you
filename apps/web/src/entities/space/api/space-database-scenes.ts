/**
 * @fileoverview Subroutines for persisting and deleting scene documents in Appwrite Databases.
 * Implements differential sync to update existing scenes, create new ones, and prune duplicates.
 */

import { ID, Query } from 'appwrite'
import { databases } from '@/shared/api'
import { ENV } from '@/shared/config'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'

const DB_ID = ENV.APPWRITE_DATABASE_ID
const SCENES_COLL = ENV.APPWRITE_SCENES_COLLECTION_ID

/**
 * Persists scenes using differential syncing.
 * Updates matching documents, inserts newly added scenes, and cleans up orphans/duplicates.
 */
export async function saveScenesToDatabase(
  spaceId: string,
  scenes: SpaceScene[],
  perms: string[],
): Promise<void> {
  if (scenes.length === 0) return

  // 1. Fetch current scenes stored in the database for this space
  let existingDocs: Array<{ $id: string; type?: string; order?: number }> = []
  try {
    const res = await databases.listDocuments(DB_ID, SCENES_COLL, [
      Query.equal('spaceId', spaceId),
      Query.orderAsc('order'),
    ])
    existingDocs = res.documents
  } catch {
    existingDocs = []
  }

  const usedDocIds = new Set<string>()

  // 2. Upsert each scene differentially
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

    // Match existing doc: by direct ID, then by (type + order), then by (type)
    const match =
      existingDocs.find((d) => d.$id === scene.id) ||
      existingDocs.find(
        (d) =>
          !usedDocIds.has(d.$id) && d.type === scene.type && d.order === index,
      ) ||
      existingDocs.find((d) => !usedDocIds.has(d.$id) && d.type === scene.type)

    if (match) {
      usedDocIds.add(match.$id)
      try {
        await databases.updateDocument(
          DB_ID,
          SCENES_COLL,
          match.$id,
          scenePayload,
          perms,
        )
      } catch {
        const created = await databases.createDocument(
          DB_ID,
          SCENES_COLL,
          ID.unique(),
          scenePayload,
          perms,
        )
        usedDocIds.add(created.$id)
      }
    } else {
      const created = await databases.createDocument(
        DB_ID,
        SCENES_COLL,
        ID.unique(),
        scenePayload,
        perms,
      )
      usedDocIds.add(created.$id)
    }
  }

  // 3. Prune orphaned scenes and previous duplicate copies
  for (const existing of existingDocs) {
    if (!usedDocIds.has(existing.$id)) {
      try {
        await databases.deleteDocument(DB_ID, SCENES_COLL, existing.$id)
      } catch {
        // Ignore individual deletion errors
      }
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
