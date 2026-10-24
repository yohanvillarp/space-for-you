import type {
  LetterFontStyle,
  LetterTextAlign,
  LetterFontSize,
} from '@/features/create-space/model/scenes.types'

export interface FontStyleOption {
  id: LetterFontStyle
  name: string
  sample: string
  className: string
}

export const FONT_STYLE_OPTIONS: FontStyleOption[] = [
  {
    id: 'serif',
    name: 'Editorial Serif',
    sample: 'Ag',
    className: 'font-serif font-medium',
  },
  {
    id: 'handwriting',
    name: 'Handwritten Script',
    sample: 'Ag',
    className: 'font-serif italic tracking-wide',
  },
  {
    id: 'sans',
    name: 'Clean Modern',
    sample: 'Ag',
    className: 'font-sans font-medium',
  },
  {
    id: 'mono',
    name: 'Typewriter',
    sample: 'Ag',
    className: 'font-mono font-medium',
  },
]

export const TEXT_ALIGN_OPTIONS: { id: LetterTextAlign; label: string }[] = [
  { id: 'left', label: 'Left' },
  { id: 'center', label: 'Center' },
  { id: 'justify', label: 'Justified' },
]

export const FONT_SIZE_OPTIONS: { id: LetterFontSize; label: string }[] = [
  { id: 'sm', label: 'Compact' },
  { id: 'base', label: 'Normal' },
  { id: 'lg', label: 'Elegant' },
]

export const TITLE_PRESETS: string[] = [
  'A quiet promise for your days ahead',
  'The moments I treasure most',
  'Words I never want to leave unsaid',
  'To the one who makes everything brighter',
  'A reminder of how deeply you are loved',
]

export const MESSAGE_SNIPPETS: { label: string; text: string }[] = [
  {
    label: 'Gentle opening',
    text: 'I wanted to write these words down so you could return to them whenever you need a quiet reminder of how much you mean to me.',
  },
  {
    label: 'Gratitude',
    text: 'Thank you for your warmth, your gentleness, and the way you make the world feel softer and kinder just by being in it.',
  },
  {
    label: 'Quiet promise',
    text: 'No matter what changes or where our paths lead, my love and appreciation for you remain unwavering and unconditional.',
  },
  {
    label: 'Closing blessing',
    text: 'May your days be filled with peaceful moments, gentle laughter, and the certainty that you are deeply cherished.',
  },
]

export const SIGNATURE_PRESETS: string[] = [
  'With all my love and devotion,',
  'Always by your side,',
  'Forever your safe harbor,',
  'With gentle affection,',
]
