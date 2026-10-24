import { Plus } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface AddLetterCardProps {
  onAddLetter: () => void
  accentColor?: string
  className?: string
}

export function AddLetterCard({ onAddLetter, className }: AddLetterCardProps) {
  const handleClick = () => {
    playSpatialSfx('tactile-tap')
    onAddLetter()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'group relative flex cursor-pointer flex-col items-center transition-all duration-300 select-none hover:-translate-y-1.5 focus:outline-hidden',
        className,
      )}
    >
      {/* Dashed Envelope-proportioned Card */}
      <div className="relative flex h-36 w-52 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-[#3B302A] bg-[#181310]/60 p-4 text-center transition-all duration-300 group-hover:border-amber-400/60 group-hover:bg-[#201A16] group-hover:shadow-xl sm:h-40 sm:w-60">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#3B302A] bg-[#221B17] text-stone-400 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-400/50 group-hover:text-amber-300">
          <Plus className="h-5 w-5" />
        </div>
      </div>

      {/* Label Below Matching LetterEnvelope */}
      <div className="mt-3 max-w-[200px] space-y-0.5 text-center sm:max-w-[230px]">
        <h4 className="font-heading text-sm font-semibold tracking-tight text-stone-300 transition-colors group-hover:text-amber-200">
          Add New Letter
        </h4>
        <p className="font-sans text-[11px] text-stone-500 transition-colors group-hover:text-stone-400">
          Fold a heartfelt note
        </p>
      </div>
    </button>
  )
}
