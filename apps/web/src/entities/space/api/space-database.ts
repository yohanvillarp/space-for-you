import { ID, Permission, Query, Role } from 'appwrite'
import { databases } from '@/shared/api'
import { ENV } from '@/shared/config'
import type { UserSpace } from '@/entities/space/model/types'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type { SpaceWithScenes, AppwriteSpaceDocument } from './types'
import {
  toUserSpace,
  toSpaceScene,
  generateSpaceSlug,
} from './space-converters'

const DB_ID = ENV.APPWRITE_DATABASE_ID
const SPACES_COLL = ENV.APPWRITE_SPACES_COLLECTION_ID
const SCENES_COLL = ENV.APPWRITE_SCENES_COLLECTION_ID

function buildPermissions(userId: string, isPublished: boolean) {
  const perms = [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ]
  if (isPublished) {
    perms.push(Permission.read(Role.any()))
  }
  return perms
}

export async function fetchUserSpaces(userId: string): Promise<UserSpace[]> {
  const res = await databases.listDocuments(DB_ID, SPACES_COLL, [
    Query.equal('userId', userId),
    Query.orderDesc('$updatedAt'),
  ])
  return res.documents.map(toUserSpace)
}

export async function fetchSpaceById(
  spaceId: string,
): Promise<SpaceWithScenes | null> {
  try {
    const doc = await databases.getDocument(DB_ID, SPACES_COLL, spaceId)
    const rawSpace = doc as unknown as AppwriteSpaceDocument
    const space = toUserSpace(doc)

    const scenesRes = await databases.listDocuments(DB_ID, SCENES_COLL, [
      Query.equal('spaceId', spaceId),
      Query.orderAsc('order'),
    ])

    const scenes = scenesRes.documents
      .map(toSpaceScene)
      .filter((s): s is SpaceScene => s !== null)

    return {
      space,
      scenes,
      senderName: rawSpace.senderName,
      dedicationMessage: rawSpace.dedicationMessage,
      themeConfig: rawSpace.themeConfig,
      slug: rawSpace.slug,
    }
  } catch {
    return null
  }
}

export async function fetchSpaceBySlug(
  slug: string,
): Promise<SpaceWithScenes | null> {
  try {
    const res = await databases.listDocuments(DB_ID, SPACES_COLL, [
      Query.equal('slug', slug),
      Query.limit(1),
    ])

    if (res.documents.length === 0) return null
    const doc = res.documents[0]
    return fetchSpaceById(doc.$id)
  } catch {
    return null
  }
}

export interface SaveSpaceParams {
  space: UserSpace
  scenes?: SpaceScene[]
  userId: string
  senderName?: string
  dedicationMessage?: string
  themeConfig?: string
  slug?: string
}

export async function saveSpaceToDatabase({
  space,
  scenes = [],
  userId,
  senderName = '',
  dedicationMessage = '',
  themeConfig = '',
  slug,
}: SaveSpaceParams): Promise<UserSpace> {
  const isPublished = space.status === 'published'
  const perms = buildPermissions(userId, isPublished)
  const resolvedSlug =
    slug || generateSpaceSlug(space.title, space.recipientName)

  const spacePayload = {
    title: space.title,
    recipientName: space.recipientName,
    senderName,
    templateId: space.templateId,
    status: space.status,
    slug: resolvedSlug,
    dedicationMessage,
    scenesCount: scenes.length > 0 ? scenes.length : space.scenesCount,
    artifactsCount: space.artifactsCount,
    themeConfig,
    isProtected: Boolean(space.isProtected),
    userId,
  }

  let savedDoc
  try {
    // Try updating existing
    savedDoc = await databases.updateDocument(
      DB_ID,
      SPACES_COLL,
      space.id,
      spacePayload,
      perms,
    )
  } catch {
    // Document does not exist or creation needed
    const docId =
      space.id.startsWith('space_') && space.id.length <= 36
        ? space.id
        : ID.unique()
    savedDoc = await databases.createDocument(
      DB_ID,
      SPACES_COLL,
      docId,
      spacePayload,
      perms,
    )
  }

  const spaceId = savedDoc.$id

  // Persist scenes if provided
  if (scenes.length > 0) {
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

  return toUserSpace(savedDoc)
}

export async function deleteSpaceFromDatabase(spaceId: string): Promise<void> {
  try {
    const scenes = await databases.listDocuments(DB_ID, SCENES_COLL, [
      Query.equal('spaceId', spaceId),
    ])
    for (const sc of scenes.documents) {
      try {
        await databases.deleteDocument(DB_ID, SCENES_COLL, sc.$id)
      } catch {
        // ignore individual scene delete errors
      }
    }
    await databases.deleteDocument(DB_ID, SPACES_COLL, spaceId)
  } catch {
    // ignore
  }
}
