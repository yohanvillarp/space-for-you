import type { SpaceTemplateId } from '@/entities/space'

export type AudioSourceType = 'preset' | 'uploaded' | 'itunes'

export interface AudioTrack {
  id: string
  title: string
  artist: string
  url: string
  duration?: number // in seconds
  source: AudioSourceType
  coverUrl?: string
  albumArt?: string
  genre?: string
  templateId?: SpaceTemplateId
}

export interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isLoading: boolean
  hasError: boolean
}
