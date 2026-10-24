import type {
  LetterItem,
  EnvelopeColor,
  WaxSealType,
} from '@/features/create-space/model/scenes.types'
import { Heart, Star, Sun, Sparkles, Image as ImageIcon } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LetterEnvelopeProps {
  letter: LetterItem
  onOpen: (letter: LetterItem) => void
  onDoubleClick?: (letter: LetterItem) => void
  onContextMenu?: (e: React.MouseEvent) => void
  isSelected?: boolean
  className?: string
}

const ENVELOPE_STYLES: Record<
  EnvelopeColor,
  {
    body: string
    flap: string
    sealBg: string
    shadow: string
    textColor: string
  }
> = {
  rose: {
    body: 'bg-gradient-to-b from-rose-200 to-rose-300 dark:from-[#9B3D44] dark:to-[#7E2D33]',
    flap: 'border-t-rose-300/90 dark:border-t-[#9B3D44]',
    sealBg: 'bg-rose-500 text-white',
    shadow: 'shadow-rose-900/20',
    textColor: 'text-rose-900 dark:text-rose-100',
  },
  sky: {
    body: 'bg-gradient-to-b from-sky-200 to-sky-300 dark:from-[#2B547E] dark:to-[#1E3B5C]',
    flap: 'border-t-sky-300/90 dark:border-t-[#2B547E]',
    sealBg: 'bg-sky-500 text-white',
    shadow: 'shadow-sky-900/20',
    textColor: 'text-sky-900 dark:text-sky-100',
  },
  lavender: {
    body: 'bg-gradient-to-b from-purple-200 to-purple-300 dark:from-[#5E3B7A] dark:to-[#45275B]',
    flap: 'border-t-purple-300/90 dark:border-t-[#5E3B7A]',
    sealBg: 'bg-purple-500 text-white',
    shadow: 'shadow-purple-900/20',
    textColor: 'text-purple-900 dark:text-purple-100',
  },
  amber: {
    body: 'bg-gradient-to-b from-amber-200 to-amber-300 dark:from-[#8D6124] dark:to-[#6C4817]',
    flap: 'border-t-amber-300/90 dark:border-t-[#8D6124]',
    sealBg: 'bg-amber-500 text-black',
    shadow: 'shadow-amber-900/20',
    textColor: 'text-amber-950 dark:text-amber-100',
  },
  emerald: {
    body: 'bg-gradient-to-b from-emerald-200 to-emerald-300 dark:from-[#2D6650] dark:to-[#1E4737]',
    flap: 'border-t-emerald-300/90 dark:border-t-[#2D6650]',
    sealBg: 'bg-emerald-500 text-white',
    shadow: 'shadow-emerald-900/20',
    textColor: 'text-emerald-950 dark:text-emerald-100',
  },
}

export function LetterEnvelope({
  letter,
  onOpen,
  onDoubleClick,
  onContextMenu,
  isSelected = false,
  className,
}: LetterEnvelopeProps) {
  const style = ENVELOPE_STYLES[letter.envelopeColor] ?? ENVELOPE_STYLES.rose

  const renderSealIcon = (seal: WaxSealType) => {
    switch (seal) {
      case 'star':
        return <Star className="h-3.5 w-3.5 fill-current" />
      case 'sun':
        return <Sun className="h-3.5 w-3.5 stroke-[2.5]" />
      case 'sparkle':
        return <Sparkles className="h-3.5 w-3.5 fill-current" />
      case 'heart':
      default:
        return <Heart className="h-3.5 w-3.5 fill-current" />
    }
  }

  const handleClick = () => {
    playSpatialSfx('tactile-tap')
    onOpen(letter)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    playSpatialSfx('paper-rustle')
    onDoubleClick?.(letter)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={onContextMenu}
      className={cn(
        'group relative flex w-full max-w-[240px] cursor-pointer flex-col items-center transition-all duration-300 hover:-translate-y-1.5 focus:outline-hidden',
        className,
      )}
    >
      {/* 3D Envelope Body Container */}
      <div
        className={cn(
          'relative h-36 w-52 overflow-hidden rounded-2xl border border-white/20 shadow-xl transition-all duration-300 sm:h-40 sm:w-60',
          style.body,
          style.shadow,
          isSelected && 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black',
          'group-hover:shadow-2xl',
        )}
      >
        {/* Envelope Top Triangle Flap */}
        <div className="absolute inset-x-0 top-0 h-0 w-0 border-x-[104px] border-t-[72px] border-x-transparent border-t-white/30 sm:border-x-[120px] sm:border-t-[80px]" />

        {/* Embossed Wax Seal Badge Centered on Flap */}
        <div className="absolute top-[52px] left-1/2 z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg ring-2 ring-white/40 transition-transform duration-300 group-hover:scale-110 sm:top-[60px]">
          <div
            className={cn(
              'flex h-full w-full items-center justify-center rounded-full',
              style.sealBg,
            )}
          >
            {renderSealIcon(letter.waxSeal)}
          </div>
        </div>

        {/* Envelope Bottom Diagonal Folds */}
        <div className="absolute inset-x-0 bottom-0 h-0 w-0 border-x-[104px] border-b-[50px] border-x-transparent border-b-black/10 sm:border-x-[120px] sm:border-b-[56px]" />

        {/* Enclosed Photo Indicator Badge */}
        {letter.imageUrl && (
          <div
            className="absolute top-2.5 right-2.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/40 text-amber-200/90 shadow-xs backdrop-blur-xs"
            title="Contains enclosed keepsake photo"
          >
            <ImageIcon className="h-2.5 w-2.5" />
          </div>
        )}
      </div>

      {/* Letter Title Label Underneath */}
      <div className="mt-3 w-full max-w-[208px] px-2 text-center sm:max-w-[240px]">
        <p
          title={letter.title}
          className="font-heading truncate text-sm font-medium text-[#FAF6F0] transition-colors group-hover:text-amber-200"
        >
          {letter.title}
        </p>
        {letter.date && (
          <p
            title={letter.date}
            className="truncate font-sans text-[11px] text-stone-400"
          >
            {letter.date}
          </p>
        )}
      </div>
    </button>
  )
}
