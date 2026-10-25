/**
 * @fileoverview Appwrite Database schema types and transfer objects for Spaces and Scenes.
 * Maps 1:1 to Appwrite Cloud collections `spaces` and `space_scenes`.
 */

import type { Models } from 'appwrite'
import type { SpaceTemplateId, UserSpace } from '@/entities/space/model/types'
import type { SpaceScene } from '@/features/create-space/model/scenes.types'

/**
 * Raw document model stored in the Appwrite `spaces` collection.
 * Enforces Document-Level Security where only the owner has write access,
 * and public unauthenticated users obtain read access once published.
 */
export interface AppwriteSpaceDocument extends Models.DefaultDocument {
  /** Display title of the digital sanctuary (e.g., "Sophia's 25th Birthday"). */
  title: string
  /** Name of the intended recipient. */
  recipientName: string
  /** Optional display name or nickname of the creator/sender. */
  senderName: string
  /** Selected aesthetic theme ('birthday' | 'anniversary' | 'friendship'). */
  templateId: SpaceTemplateId
  /** Publication lifecycle status. */
  status: 'draft' | 'ready' | 'published'
  /** Unique, human-friendly URL slug (e.g., "sophia-sanctuary-a81f"). */
  slug: string
  /** Optional long-form dedication message or greeting note. */
  dedicationMessage?: string
  /** Total count of scenes contained in this space. */
  scenesCount: number
  /** Total count of memories/artifacts placed across all scenes. */
  artifactsCount: number
  /** JSON-serialized theme customization (colors, fonts, QR code styling). */
  themeConfig?: string
  /** Whether the sanctuary requires a passcode or privacy gate to access. */
  isProtected?: boolean
  /** Owner user ID matching Appwrite Auth `$id`. */
  userId: string
}

/**
 * Raw document model stored in the Appwrite `space_scenes` collection.
 * Each document represents a room, letter desk, or diorama canvas in the space.
 */
export interface AppwriteSceneDocument extends Models.DefaultDocument {
  /** Foreign key pointing to the parent space document ID. */
  spaceId: string
  /** Zero-indexed sequential display order for navigation. */
  order: number
  /** Polymorphic scene discriminator. */
  type: 'free-canvas' | 'letters'
  /** Scene tab/portal title (e.g., "Heartfelt Letters", "Stage Diorama"). */
  title: string
  /** Optional subtitle or emotional prompt. */
  subtitle?: string
  /** Lucide icon identifier for UI tabs and buttons. */
  icon: string
  /** JSON-serialized array of SpatialItem[] or LetterItem[] objects. */
  payload: string
}

/**
 * Aggregated domain structure combining a space and its ordered scenes.
 */
export interface SpaceWithScenes {
  /** Domain representation of the space metadata. */
  space: UserSpace
  /** Ordered list of polymorphic scenes populated with items or letters. */
  scenes: SpaceScene[]
  /** Optional sender name. */
  senderName?: string
  /** Optional long-form dedication message. */
  dedicationMessage?: string
  /** Optional JSON-serialized theme customization string. */
  themeConfig?: string
  /** Resolved public slug for sharing. */
  slug?: string
}
