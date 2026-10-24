import type { Models } from 'appwrite'
import type { UserSpace, SpaceTemplateId } from '@/entities/space/model/types'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'
import type { AppwriteSpaceDocument, AppwriteSceneDocument } from './types'

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
  }
}

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

export function generateSpaceSlug(
  title: string,
  recipientName: string,
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

  const randomHash = Math.random().toString(36).substring(2, 6)
  return `${cleanRecipient}-${cleanTitle}-${randomHash}`
}
