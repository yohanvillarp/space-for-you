export type QrStyleType = 'minimal' | 'vintage' | 'celestial' | 'stamp' | 'pill'
export type ShareFontFamily = 'editorial' | 'modern' | 'script' | 'mono'
export type ShareColorTarget = 'qr' | 'text' | 'card'

export interface ShareCardCustomization {
  qrStyle: QrStyleType
  qrColor: string
  cardBg: string
  textColor: string
  fontFamily: ShareFontFamily
  tapeColor: 'rose' | 'gold' | 'sage'
  customNote: string
}

export interface QrStyleOption {
  id: QrStyleType
  name: string
  description: string
  icon: string
  tags: string[]
}

export interface FontOption {
  id: ShareFontFamily
  name: string
  familyClass: string
  description: string
  sample: string
  tags: string[]
}

export interface ColorSwatch {
  name: string
  hex: string
  tags: string[]
}

export interface HarmonyPalette {
  name: string
  qrColor: string
  cardBg: string
  textColor: string
  tapeColor?: 'rose' | 'gold' | 'sage'
  description?: string
  tags: string[]
}

export {
  QR_STYLE_PRESETS,
  SHARE_FONT_OPTIONS,
  COLOR_SWATCHES,
  HARMONY_PALETTES,
} from '@/features/create-space/ui/share/share-customizer.constants'
