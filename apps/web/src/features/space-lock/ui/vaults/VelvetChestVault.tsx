import { Lock, Unlock } from 'lucide-react'
import { cn } from '@/shared/lib'

export interface VaultDisplayProps {
  isUnlocked: boolean
}

export function VelvetChestVault({ isUnlocked }: VaultDisplayProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Terracotta Velvet Jewelry Box */}
      <div
        className={cn(
          'relative flex h-52 w-56 flex-col items-center justify-center rounded-3xl border-4 shadow-2xl transition-all duration-700 select-none',
          'border-[#A34835]/50 bg-gradient-to-b from-[#4A1D15] via-[#35140E] to-[#250E0A]',
          isUnlocked
            ? 'border-emerald-500/60 shadow-emerald-950/40'
            : 'ring-2 shadow-red-950/60 ring-[#CF7056]/30',
        )}
      >
        {/* Gold Trim Inlay */}
        <div className="absolute inset-2.5 rounded-2xl border border-amber-400/30" />

        {/* Top Velvet Lid Seam */}
        <div
          className={cn(
            'absolute -top-1 right-2 left-2 h-2 rounded-t-xl border-b border-amber-400/40 bg-gradient-to-r from-[#A34835] via-[#CF7056] to-[#A34835] transition-transform duration-500',
            isUnlocked && '-translate-y-3',
          )}
        />

        {/* Central Gold Clasp & Tumbler */}
        <div
          className={cn(
            'flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-amber-400/80 bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-0.5 shadow-xl transition-transform duration-500',
            isUnlocked && 'scale-105 rotate-6',
          )}
        >
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#250E0A] shadow-inner">
            {isUnlocked ? (
              <Unlock className="h-6 w-6 text-emerald-400" />
            ) : (
              <Lock className="h-6 w-6 text-amber-300" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
