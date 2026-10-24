export type SpaceTemplateId = 'birthday' | 'anniversary' | 'friendship'

export interface SpaceTemplate {
  id: SpaceTemplateId
  title: string
  subtitle: string
  category: string
  description: string
  badge: string
  accentColor: string
  cardBgGlow: string
  sampleRecipient: string
  sampleNote: string
  features: string[]
  tags: string[]
}

export interface SpaceDraft {
  templateId: SpaceTemplateId
  recipientName: string
  spaceTitle: string
  message?: string
  scheduledDate?: string
}

export interface UserSpace {
  id: string
  title: string
  recipientName: string
  templateId: SpaceTemplateId
  scenesCount: number
  artifactsCount: number
  updatedAt: string
  createdAt: string
  status: 'draft' | 'ready' | 'published'
  isProtected?: boolean
  description?: string
}

export type CreationStep = 'template' | 'details' | 'preview'
