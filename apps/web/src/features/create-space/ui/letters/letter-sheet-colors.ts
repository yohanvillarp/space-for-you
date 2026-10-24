export interface SheetColorDef {
  id: string
  name: string
  description: string
  swatchBg: string
  cardBg: string
  borderColor: string
  textColor: string
}

export const SHEET_COLORS: SheetColorDef[] = [
  {
    id: 'ivory',
    name: 'Warm Ivory',
    description: 'Classic editorial stationery with soft warm grain',
    swatchBg: 'bg-[#FAF6F0] border-[#E6DCCF]',
    cardBg: 'bg-[#FAF6F0]',
    borderColor: 'border-[#E6DCCF]',
    textColor: 'text-[#302621]',
  },
  {
    id: 'white',
    name: 'Pure Linen',
    description: 'Crisp clean white parchment with minimalist clarity',
    swatchBg: 'bg-[#FFFFFF] border-stone-300',
    cardBg: 'bg-[#FFFFFF]',
    borderColor: 'border-stone-200',
    textColor: 'text-stone-900',
  },
  {
    id: 'parchment',
    name: 'Antique Kraft',
    description: 'Aged vintage parchment reminiscent of handwritten letters',
    swatchBg: 'bg-[#F4ECE1] border-[#DFCFC0]',
    cardBg: 'bg-[#F4ECE1]',
    borderColor: 'border-[#DFCFC0]',
    textColor: 'text-[#2C221D]',
  },
  {
    id: 'rose',
    name: 'Blush Velvet',
    description: 'Romantic soft pink hue for tender thoughts',
    swatchBg: 'bg-[#FFF1F2] border-[#FECDD3]',
    cardBg: 'bg-[#FFF1F2]',
    borderColor: 'border-[#FECDD3]',
    textColor: 'text-[#4C1D24]',
  },
  {
    id: 'amber',
    name: 'Candlelight Amber',
    description: 'Golden ambient tone for treasured warmth',
    swatchBg: 'bg-[#FEF3C7] border-[#FDE68A]',
    cardBg: 'bg-[#FEF3C7]',
    borderColor: 'border-[#FDE68A]',
    textColor: 'text-[#451A03]',
  },
  {
    id: 'sage',
    name: 'Botanical Sage',
    description: 'Calm earth green paper for peaceful heartfelt notes',
    swatchBg: 'bg-[#F0FDF4] border-[#DCFCE7]',
    cardBg: 'bg-[#F0FDF4]',
    borderColor: 'border-[#DCFCE7]',
    textColor: 'text-[#14532D]',
  },
]

export const PAPER_STYLES: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  ivory: {
    bg: 'bg-[#FAF6F0]',
    border: 'border-[#E6DCCF]',
    text: 'text-[#302621]',
  },
  white: {
    bg: 'bg-[#FFFFFF]',
    border: 'border-stone-200',
    text: 'text-stone-900',
  },
  parchment: {
    bg: 'bg-[#F4ECE1]',
    border: 'border-[#DFCFC0]',
    text: 'text-[#2C221D]',
  },
  rose: {
    bg: 'bg-[#FFF1F2]',
    border: 'border-[#FECDD3]',
    text: 'text-[#4C1D24]',
  },
  amber: {
    bg: 'bg-[#FEF3C7]',
    border: 'border-[#FDE68A]',
    text: 'text-[#451A03]',
  },
  sage: {
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#DCFCE7]',
    text: 'text-[#14532D]',
  },
}

export const DEFAULT_LETTER_BLOCKS: ('title' | 'photo' | 'text')[] = [
  'title',
  'photo',
  'text',
]
