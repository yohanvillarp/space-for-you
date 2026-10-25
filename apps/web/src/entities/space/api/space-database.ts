/**
 * @fileoverview Data access layer for Spaces and Scenes in Appwrite Databases.
 * Enforces Document-Level Security (RBAC) and handles queries with compound indexes.
 */

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
import {
  saveScenesToDatabase,
  deleteSpaceScenes,
} from '@/entities/space/api/space-database-scenes'

const DB_ID = ENV.APPWRITE_DATABASE_ID
const SPACES_COLL = ENV.APPWRITE_SPACES_COLLECTION_ID
const SCENES_COLL = ENV.APPWRITE_SCENES_COLLECTION_ID

/**
 * Builds native Document-Level Security permissions for Appwrite.
 * Always grants full CRUD to the creator. If published, adds public read access.
 *
 * @param userId - Owner's Appwrite Auth account `$id`.
 * @param isPublished - Whether the space is published and publicly accessible.
 * @returns Array of Appwrite Permission descriptors.
 */
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

/**
 * Retrieves all spaces owned by the authenticated user, sorted by last updated.
 *
 * @param userId - Owner's Appwrite Auth account `$id`.
 * @returns Array of spaces belonging to the user.
 */
export async function fetchUserSpaces(userId: string): Promise<UserSpace[]> {
  const res = await databases.listDocuments(DB_ID, SPACES_COLL, [
    Query.equal('userId', userId),
    Query.orderDesc('$updatedAt'),
  ])
  return res.documents.map(toUserSpace)
}

/**
 * Retrieves a single space and all its associated scenes by space ID.
 *
 * @param spaceId - Unique document identifier in the `spaces` collection.
 * @returns The aggregated space and its scenes, or `null` if not found.
 */
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
      passcodeHash: rawSpace.passcodeHash,
      passcodeSalt: rawSpace.passcodeSalt,
      passcodeHint: rawSpace.passcodeHint,
      protectionTheme: rawSpace.protectionTheme,
    }
  } catch {
    return null
  }
}

/**
 * Resolves a space and its scenes by its public unique slug without requiring login.
 *
 * @param slug - Human-friendly URL slug (e.g., "sophia-sanctuary-a81f").
 * @returns The aggregated space with its scenes, or `null` if not found.
 */
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

/**
 * Parameters for creating or updating a space in Appwrite Databases.
 */
export interface SaveSpaceParams {
  /** Space metadata to save or update. */
  space: UserSpace
  /** Optional array of scenes (free-canvas items or heartfelt letters). */
  scenes?: SpaceScene[]
  /** Owner user ID matching Appwrite Auth `$id`. */
  userId: string
  /** Optional sender name. */
  senderName?: string
  /** Optional dedication message. */
  dedicationMessage?: string
  /** Optional JSON-serialized theme customization. */
  themeConfig?: string
  /** Optional slug override. */
  slug?: string
  passcodeHash?: string
  passcodeSalt?: string
  passcodeHint?: string
  protectionTheme?: string
}

/**
 * Saves a space and all its scenes to Appwrite Databases with Document-Level Security.
 * Performs idempotent update or creation of both space and scene documents.
 *
 * @param params - Save parameters containing space, scenes, and owner info.
 * @returns The persisted space model with updated timestamps.
 *
 * @remarks
 * This function persists the master space document and loops over scenes,
 * serializing polymorphic payloads (diorama canvas items or letters).
 *
 * @example
 * ```ts
 * const savedSpace = await saveSpaceToDatabase({
 *   space: currentSpace,
 *   scenes: currentScenes,
 *   userId: user.$id,
 * })
 * ```
 */
export async function saveSpaceToDatabase({
  space,
  scenes = [],
  userId,
  senderName = '',
  dedicationMessage = '',
  themeConfig = '',
  slug,
  passcodeHash,
  passcodeSalt,
  passcodeHint,
  protectionTheme,
}: SaveSpaceParams): Promise<UserSpace> {
  const isPublished = space.status === 'published' || space.status === 'ready'
  const perms = buildPermissions(userId, isPublished)
  const resolvedSlug =
    slug || generateSpaceSlug(space.title, space.recipientName)

  const spacePayload: Record<string, unknown> = {
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
  if (passcodeHash !== undefined) spacePayload.passcodeHash = passcodeHash
  if (passcodeSalt !== undefined) spacePayload.passcodeSalt = passcodeSalt
  if (passcodeHint !== undefined) spacePayload.passcodeHint = passcodeHint
  if (protectionTheme !== undefined)
    spacePayload.protectionTheme = protectionTheme

  let savedDoc
  try {
    savedDoc = await databases.updateDocument(
      DB_ID,
      SPACES_COLL,
      space.id,
      spacePayload,
      perms,
    )
  } catch {
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

  await saveScenesToDatabase(savedDoc.$id, scenes, perms)
  return toUserSpace(savedDoc)
}

/**
 * Deletes a space and all its related scene documents from Appwrite Databases.
 *
 * @param spaceId - Unique document ID of the space to delete.
 */
export async function deleteSpaceFromDatabase(spaceId: string): Promise<void> {
  try {
    await deleteSpaceScenes(spaceId)
    await databases.deleteDocument(DB_ID, SPACES_COLL, spaceId)
  } catch {
    // ignore
  }
}
