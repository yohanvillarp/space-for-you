import type { SpaceTemplateId } from '@/entities/space'

export interface SceneCardThemeConfig {
  accentColor: string
  canvasBg: string
  canvasBorder: string
  lettersBg: string
  lettersBorder: string
  tapeStyle: string
  sealStyle: string
  sealIconColor: string
  badgeStyle: string
  flapBorder: string
}

export const SCENE_CARD_THEMES: Record<SpaceTemplateId, SceneCardThemeConfig> =
  {
    birthday: {
      accentColor: '#D97706',
      canvasBg: 'bg-[#1E1713]/95',
      canvasBorder: 'border-amber-500/25 hover:border-amber-400/60',
      lettersBg: 'bg-[#221A15]/95',
      lettersBorder: 'border-amber-500/25 hover:border-amber-400/60',
      tapeStyle: 'bg-amber-400/25 border-amber-300/40 text-amber-200',
      sealStyle:
        'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 border-amber-300/50 shadow-lg shadow-amber-950/50',
      sealIconColor: '#FEF3C7',
      badgeStyle: 'border-amber-400/30 bg-amber-950/40 text-amber-200',
      flapBorder: 'border-amber-500/20',
    },
    anniversary: {
      accentColor: '#A34835',
      canvasBg: 'bg-[#1D1414]/95',
      canvasBorder: 'border-rose-900/35 hover:border-rose-500/50',
      lettersBg: 'bg-[#201515]/95',
      lettersBorder: 'border-rose-900/35 hover:border-rose-500/50',
      tapeStyle: 'bg-rose-900/35 border-rose-400/30 text-rose-200',
      sealStyle:
        'bg-gradient-to-br from-rose-700 via-rose-800 to-red-950 border-rose-400/40 shadow-lg shadow-red-950/60',
      sealIconColor: '#FFE4E6',
      badgeStyle: 'border-rose-500/30 bg-rose-950/50 text-rose-200',
      flapBorder: 'border-rose-700/25',
    },
    friendship: {
      accentColor: '#0D9488',
      canvasBg: 'bg-[#131A19]/95',
      canvasBorder: 'border-teal-700/30 hover:border-teal-400/50',
      lettersBg: 'bg-[#141C1B]/95',
      lettersBorder: 'border-teal-700/30 hover:border-teal-400/50',
      tapeStyle: 'bg-teal-500/25 border-teal-300/40 text-teal-200',
      sealStyle:
        'bg-gradient-to-br from-teal-600 via-teal-700 to-teal-950 border-teal-300/40 shadow-lg shadow-teal-950/50',
      sealIconColor: '#CCFBF1',
      badgeStyle: 'border-teal-500/30 bg-teal-950/50 text-teal-200',
      flapBorder: 'border-teal-600/25',
    },
  }
