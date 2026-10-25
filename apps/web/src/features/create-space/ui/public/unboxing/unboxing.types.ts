import type { SpaceTemplateId } from '@/entities/space'

export type UnboxingStage = 'sealed' | 'unwrapping' | 'blooming' | 'completed'

export interface TemplateUnboxingProps {
  recipientName: string
  senderName?: string
  spaceTitle: string
  dedicationMessage?: string
  accentColor: string
  stage: UnboxingStage
  onTriggerOpen: () => void
}

export interface UnboxingCeremonyProps {
  spaceId: string
  spaceTitle: string
  recipientName: string
  senderName?: string
  dedicationMessage?: string
  templateId: SpaceTemplateId
  accentColor?: string
  ambientGlow?: string
  hasAudioTrack?: boolean
  isPlayingAudio?: boolean
  onToggleAudio?: () => void
  onComplete: () => void
}
