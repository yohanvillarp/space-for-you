/**
 * @fileoverview Domain models and types representing digital sanctuary spaces in Space For You.
 */

/**
 * Identifier for aesthetic templates curated for specific emotional occasions.
 */
export type SpaceTemplateId = 'birthday' | 'anniversary' | 'friendship'

/**
 * Visual and textual configuration for a curated space template.
 */
export interface SpaceTemplate {
  /** Unique template identifier. */
  id: SpaceTemplateId
  /** Editorial display title. */
  title: string
  /** Poetic subtitle. */
  subtitle: string
  /** Broad thematic category. */
  category: string
  /** Long-form description explaining the emotional feel. */
  description: string
  /** Visual badge text (e.g., "Celebratory", "Romantic"). */
  badge: string
  /** Primary accent color hex token. */
  accentColor: string
  /** Ambient background glow gradient CSS class. */
  cardBgGlow: string
  /** Suggested default recipient name. */
  sampleRecipient: string
  /** Suggested default dedication note. */
  sampleNote: string
  /** Highlighted feature bullets. */
  features: string[]
  /** Descriptive search tags. */
  tags: string[]
}

/**
 * Initial draft payload captured during the creation wizard.
 */
export interface SpaceDraft {
  /** Selected template identifier. */
  templateId: SpaceTemplateId
  /** Name of the person being gifted this space. */
  recipientName: string
  /** Title of the space sanctuary. */
  spaceTitle: string
  /** Initial heartfelt dedication message. */
  message?: string
  /** Optional date for milestone celebrations. */
  scheduledDate?: string
}

/**
 * Complete domain entity representing a user-created space.
 */
export interface UserSpace {
  /** Unique identifier (local ID or Appwrite document ID). */
  id: string
  /** Sanctuary title. */
  title: string
  /** Recipient name. */
  recipientName: string
  /** Associated theme template. */
  templateId: SpaceTemplateId
  /** Total count of scenes/rooms inside the space. */
  scenesCount: number
  /** Total count of memories, letters, and artifacts. */
  artifactsCount: number
  /** ISO timestamp of the last modification. */
  updatedAt: string
  /** ISO timestamp of space creation. */
  createdAt: string
  /**
   * Publication lifecycle:
   * - `draft`: Initial editing phase.
   * - `ready`: Prepared with all letters and artifacts placed.
   * - `published`: Shared with recipient (public read access enabled).
   */
  status: 'draft' | 'ready' | 'published'
  /** Whether the space is gated behind a privacy code. */
  isProtected?: boolean
  /** Short summary or dedication note. */
  description?: string
}

/**
 * Steps in the progressive space creation wizard.
 */
export type CreationStep = 'template' | 'details' | 'preview'
