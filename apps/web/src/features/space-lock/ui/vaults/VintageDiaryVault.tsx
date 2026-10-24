import { Lock, Unlock } from 'lucide-react'
import { cn } from '@/shared/lib'

export interface VaultDisplayProps {
  isUnlocked: boolean
}

export function VintageDiaryVault({ isUnlocked }: VaultDisplayProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Leather Book / Diary Box */}
      <div
        className={cn(
          'relative flex h-56 w-48 flex-col items-center justify-center rounded-2xl border-4 shadow-2xl transition-all duration-700 select-none',
          'border-[#5C3D2E] bg-gradient-to-r from-[#2B1B15] via-[#38231B] to-[#2B1B15]',
          isUnlocked
            ? 'border-emerald-600/70 shadow-emerald-900/30'
            : 'ring-1 shadow-amber-950/50 ring-amber-600/20',
        )}
      >
        {/* Book Spine Details */}
        <div className="absolute top-0 bottom-0 left-3 w-1.5 border-r border-[#4A3024] bg-[#221510]" />

        {/* Embossed Corner Flourishes */}
        <div className="absolute top-2 right-2 text-xs text-amber-500/40">
          ❧
        </div>
        <div className="absolute right-2 bottom-2 rotate-90 text-xs text-amber-500/40">
          ❧
        </div>

        {/* Brass Lock Strap */}
        <div
          className={cn(
            'flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-600/80 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 shadow-inner transition-transform duration-500',
            isUnlocked && 'translate-x-3 rotate-12',
          )}
        >
          {/* Keyhole and Padlock Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/60 bg-[#1A100B] shadow-md">
            {isUnlocked ? (
              <Unlock className="h-5 w-5 text-emerald-400" />
            ) : (
              <Lock className="h-5 w-5 text-amber-300" />
            )}
          </div>
        </div>

        {/* Gold Ribbon Bookmark hanging below */}
        <div className="absolute -bottom-4 left-10 h-7 w-3 rounded-b-sm bg-gradient-to-b from-amber-600 to-amber-500 shadow-xs" />
      </div>
    </div>
  )
}
