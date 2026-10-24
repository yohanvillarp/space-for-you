import type {
  LetterFontStyle,
  LetterTextAlign,
  LetterFontSize,
} from '@/features/create-space/model/scenes.types'

export interface FontStyleOption {
  id: LetterFontStyle
  name: string
  mood: string
  sample: string
  className: string
}

export const FONT_STYLE_OPTIONS: FontStyleOption[] = [
  {
    id: 'serif',
    name: 'Editorial Serif',
    mood: 'Timeless & Editorial',
    sample: 'Ag',
    className: 'font-serif font-medium',
  },
  {
    id: 'handwriting',
    name: 'Handwritten Script',
    mood: 'Intimate & Poetic',
    sample: 'Ag',
    className: 'font-serif italic tracking-wide',
  },
  {
    id: 'sans',
    name: 'Clean Modern',
    mood: 'Minimal & Crisp',
    sample: 'Ag',
    className: 'font-sans font-medium',
  },
  {
    id: 'mono',
    name: 'Typewriter',
    mood: 'Vintage Mechanical',
    sample: 'Ag',
    className: 'font-mono font-medium',
  },
]

export interface TextAlignOption {
  id: LetterTextAlign
  label: string
  desc: string
}

export const TEXT_ALIGN_OPTIONS: TextAlignOption[] = [
  { id: 'left', label: 'Left', desc: 'Natural margin' },
  { id: 'center', label: 'Center', desc: 'Poetic symmetry' },
  { id: 'justify', label: 'Justify', desc: 'Editorial block' },
]

export interface FontSizeOption {
  id: LetterFontSize
  label: string
  scale: string
  desc: string
}

export const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  { id: 'sm', label: 'Compact', scale: '14px', desc: 'Intimate' },
  { id: 'base', label: 'Normal', scale: '16px', desc: 'Balanced' },
  { id: 'lg', label: 'Elegant', scale: '18px', desc: 'Generous' },
]
