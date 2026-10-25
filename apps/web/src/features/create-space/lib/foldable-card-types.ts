import type {
  QrStyleType,
  ShareFontFamily,
} from '@/features/create-space/ui/share/share-customizer.types'

export type FoldablePaperSize = 'a4' | 'letter'

export interface FoldableCardData {
  recipientName: string
  senderName?: string
  note?: string
  url: string
  accentColor: string
  cardBg?: string
  textColor?: string
  fontFamily?: ShareFontFamily
  qrStyle?: QrStyleType
  tapeColor?: 'rose' | 'gold' | 'sage'
  paperSize?: FoldablePaperSize
  includeCutGuides?: boolean
  includeFoldLine?: boolean
  includeHandwrittenLines?: boolean
}

export const PAPER_DIMENSIONS: Record<
  FoldablePaperSize,
  { width: number; height: number; name: string }
> = {
  a4: { width: 3508, height: 2480, name: 'A4 (210 x 297 mm)' },
  letter: { width: 3300, height: 2550, name: 'US Letter (8.5 x 11")' },
}
