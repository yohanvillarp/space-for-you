import type { Models } from 'appwrite'
import type { SpaceTemplateId, UserSpace } from '@/entities/space/model/types'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'

export interface AppwriteSpaceDocument extends Models.DefaultDocument {
  title: string
  recipientName: string
  senderName: string
  templateId: SpaceTemplateId
  status: 'draft' | 'ready' | 'published'
  slug: string
  dedicationMessage?: string
  scenesCount: number
  artifactsCount: number
  themeConfig?: string
  isProtected?: boolean
  userId: string
}

export interface AppwriteSceneDocument extends Models.DefaultDocument {
  spaceId: string
  order: number
  type: 'free-canvas' | 'letters'
  title: string
  subtitle?: string
  icon: string
  payload: string
}

export interface SpaceWithScenes {
  space: UserSpace
  scenes: SpaceScene[]
  senderName?: string
  dedicationMessage?: string
  themeConfig?: string
  slug?: string
}
