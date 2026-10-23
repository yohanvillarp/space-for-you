import type { ComponentType } from 'react'
import type { SpaceTemplateId } from '@/entities/space'
import { BirthdayUniverse } from './birthday'
import { RomanticUniverse } from './romantic'
import { FriendshipUniverse } from './friendship'

export interface ThemeRegistryEntry {
  id: SpaceTemplateId
  title: string
  stageName: string
  mood: string
  accentColor: string
  component: ComponentType
  ambientGlow: string
}

export const THEME_REGISTRY: Record<SpaceTemplateId, ThemeRegistryEntry> = {
  birthday: {
    id: 'birthday',
    title: 'Birthday Celebration',
    stageName: 'Candlelit Celebration Table',
    mood: 'Candlelit cake, gold-foil birthday card & starlight dust',
    accentColor: '#D97706',
    component: BirthdayUniverse,
    ambientGlow: 'from-amber-500/25 via-amber-950/20 to-transparent',
  },
  anniversary: {
    id: 'anniversary',
    title: 'Romantic Journey',
    stageName: 'Love Letter Desk',
    mood: 'Wax-sealed parchment, rose petals & spinning vinyl turntable',
    accentColor: '#A34835',
    component: RomanticUniverse,
    ambientGlow: 'from-primary/30 via-rose-950/25 to-transparent',
  },
  friendship: {
    id: 'friendship',
    title: 'Lifelong Friendship',
    stageName: 'Memory Corkboard',
    mood: 'Cork bulletin board, airmail postcard & retro roadtrip cassette',
    accentColor: '#0D9488',
    component: FriendshipUniverse,
    ambientGlow: 'from-teal-500/25 via-teal-950/20 to-transparent',
  },
}
