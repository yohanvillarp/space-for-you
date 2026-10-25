import type { LockKeypadTheme } from '@/features/space-lock/model/lock.types'

export interface KeypadThemeStyle {
  button: string
  slotBase: string
  slotFilled: string
  sfx: 'tactile-tap' | 'cassette-click' | 'pop-snap' | 'pin-thud'
}

export const KEYPAD_STYLES: Record<LockKeypadTheme, KeypadThemeStyle> = {
  classic: {
    button:
      'rounded-xl border border-white/10 bg-white/5 font-mono text-base font-medium text-stone-200 shadow-sm hover:border-white/30 hover:bg-white/15 active:scale-95',
    slotBase: 'rounded-xl border-white/10 bg-black/40 text-stone-500',
    slotFilled: 'border-white/50 bg-white/20 text-white shadow-md',
    sfx: 'tactile-tap',
  },
  'vintage-typewriter': {
    button:
      'rounded-full border-2 border-[#8C6239] bg-[#221711] font-serif text-base font-bold text-[#E8D7C3] shadow-md ring-1 ring-amber-600/30 hover:border-amber-500 hover:bg-[#2C1E16] active:translate-y-0.5',
    slotBase:
      'rounded-full border-2 border-[#8C6239]/60 bg-[#160E0A] font-serif text-[#E8D7C3]',
    slotFilled: 'border-amber-500 bg-[#382317] text-amber-200 shadow-md',
    sfx: 'cassette-click',
  },
  'golden-luxury': {
    button:
      'rounded-xl border border-amber-400/80 bg-gradient-to-b from-[#2A1D15] via-[#20150F] to-[#17100B] font-heading text-base font-semibold text-amber-200 shadow-md hover:border-amber-300 hover:shadow-amber-900/40 active:scale-95',
    slotBase:
      'rounded-xl border border-amber-400/50 bg-[#1A120D] text-amber-300',
    slotFilled:
      'border-amber-300 bg-amber-500/25 text-amber-100 shadow-md shadow-amber-400/20',
    sfx: 'pop-snap',
  },
  'celestial-crystal': {
    button:
      'rounded-2xl border border-pink-400/40 bg-gradient-to-tr from-purple-950/60 to-pink-900/40 font-sans text-base font-semibold text-pink-100 shadow-md hover:border-pink-300 hover:shadow-pink-500/30 active:scale-95',
    slotBase:
      'rounded-2xl border border-pink-400/40 bg-purple-950/70 text-pink-300',
    slotFilled:
      'border-pink-300 bg-pink-500/30 text-white shadow-md shadow-pink-400/30',
    sfx: 'pop-snap',
  },
  'clay-terracotta': {
    button:
      'rounded-xl border-2 border-[#A34835]/70 bg-gradient-to-b from-[#3D1A13] to-[#2B120D] font-mono text-base font-bold text-[#EACABC] shadow-md hover:border-[#CF7056] active:scale-95',
    slotBase: 'rounded-xl border border-[#A34835] bg-[#1E0C08] text-[#CF7056]',
    slotFilled: 'border-[#CF7056] bg-[#A34835]/30 text-[#FAF6F0] shadow-md',
    sfx: 'pin-thud',
  },
}
