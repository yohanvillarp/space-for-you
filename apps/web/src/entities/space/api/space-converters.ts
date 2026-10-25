/**
 * @fileoverview Bidirectional converters between Appwrite Database documents and domain models.
 * Handles polymorphic payload deserialization and sanitized unique slug generation.
 */

import type { Models } from 'appwrite'
import type { UserSpace, SpaceTemplateId } from '@/entities/space/model/types'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type { AppwriteSpaceDocument, AppwriteSceneDocument } from './types'

/**
 * Transforms an Appwrite space document into a client domain `UserSpace`.
 *
 * @param doc - Raw Appwrite document from the `spaces` collection.
 * @returns Clean, typed `UserSpace` domain entity.
 */
export function toUserSpace(doc: Models.DefaultDocument): UserSpace {
  const d = doc as unknown as AppwriteSpaceDocument
  return {
    id: d.$id,
    title: d.title || 'Untitled Space',
    recipientName: d.recipientName || 'Someone Special',
    templateId: (d.templateId as SpaceTemplateId) || 'birthday',
    scenesCount: Number(d.scenesCount) || 1,
    artifactsCount: Number(d.artifactsCount) || 0,
    status: d.status || 'draft',
    createdAt: d.$createdAt,
    updatedAt: d.$updatedAt,
    isProtected: Boolean(d.isProtected),
    description: d.dedicationMessage || undefined,
    slug: d.slug || undefined,
  }
}

/**
 * Transforms an Appwrite scene document into a typed, polymorphic `SpaceScene`.
 * Safely parses the JSON payload into `items` or `letters` depending on `type`.
 *
 * @param doc - Raw Appwrite document from the `space_scenes` collection.
 * @returns Parsed `FreeCanvasScene`, `LettersScene`, or `null` if unrecognized.
 */
export function toSpaceScene(doc: Models.DefaultDocument): SpaceScene | null {
  const d = doc as unknown as AppwriteSceneDocument
  let parsedPayload: unknown = []
  try {
    parsedPayload = d.payload ? JSON.parse(d.payload) : []
  } catch {
    parsedPayload = []
  }

  const base = {
    id: d.$id,
    title: d.title,
    subtitle: d.subtitle || '',
    icon: d.icon || 'Sparkles',
    order: Number(d.order) || 0,
  }

  if (d.type === 'letters') {
    return {
      ...base,
      type: 'letters',
      letters: Array.isArray(parsedPayload) ? parsedPayload : [],
    }
  }

  if (d.type === 'free-canvas') {
    return {
      ...base,
      type: 'free-canvas',
      items: Array.isArray(parsedPayload) ? parsedPayload : [],
    }
  }

  return null
}

/**
 * Generates an URL-safe, human-readable unique slug for public sharing.
 * Deterministic: Reuses existing stable spaceId hash if provided so URLs stay constant.
 *
 * @param title - Space title (e.g., "Golden Memories").
 * @param recipientName - Recipient's name (e.g., "Sophia").
 * @param existingId - Optional space identifier to derive a stable hash.
 * @returns Sanitized slug string formatted as `[recipient]-[title]-[hash]`.
 */
export function generateSpaceSlug(
  title: string,
  recipientName: string,
  existingId?: string,
): string {
  const cleanTitle = (title || 'sanctuary')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 30)

  const cleanRecipient = (recipientName || 'special')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 20)

  let hash = ''
  if (existingId) {
    const parts = existingId.split('_')
    const lastPart = parts[parts.length - 1]
    hash = lastPart
      .slice(-5)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
  }
  if (!hash || hash.length < 3) {
    hash = Math.random().toString(36).substring(2, 6)
  }

  return `${cleanRecipient}-${cleanTitle}-${hash}`
}
