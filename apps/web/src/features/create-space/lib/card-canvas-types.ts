import type {
  QrStyleType,
  ShareFontFamily,
} from '@/features/create-space/ui/share/share-customizer.types'

export interface KeepsakeCardData {
  recipientName: string
  url: string
  accentColor: string
  cardBg?: string
  textColor?: string
  fontFamily?: ShareFontFamily
  qrStyle?: QrStyleType
  tapeColor?: 'rose' | 'gold' | 'sage'
  note?: string
}

export function isDarkColor(hex?: string): boolean {
  if (!hex || !hex.startsWith('#')) return false
  const r = parseInt(hex.slice(1, 3), 16) || 0
  const g = parseInt(hex.slice(3, 5), 16) || 0
  const b = parseInt(hex.slice(5, 7), 16) || 0
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

export function resolveCardFont(
  family: ShareFontFamily = 'editorial',
  size: number,
  weight = '400',
  isItalic = false,
): string {
  if (family === 'mono') {
    return `${weight} ${size}px ui-monospace, SFMono-Regular, Consolas, monospace`
  }
  if (family === 'modern') {
    return `${weight} ${size}px "DM Sans", system-ui, -apple-system, sans-serif`
  }
  if (family === 'script') {
    return `italic ${weight} ${size}px "Lora", Georgia, serif`
  }
  return `${isItalic ? 'italic ' : ''}${weight} ${size}px "Lora", Georgia, serif`
}
