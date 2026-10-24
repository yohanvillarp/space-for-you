import { Lock, Unlock, Sparkles } from 'lucide-react'
import { cn } from '@/shared/lib'

export interface VaultDisplayProps {
  isUnlocked: boolean
}

export function CloudVault({ isUnlocked }: VaultDisplayProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Dreamy ambient glow clouds */}
      <div className="pointer-events-none absolute -inset-10 overflow-hidden opacity-70 select-none">
        <div className="absolute top-2 left-4 h-16 w-24 rounded-full bg-pink-400/20 blur-xl" />
        <div className="absolute top-8 right-6 h-20 w-28 rounded-full bg-purple-400/20 blur-xl" />
        <div className="absolute -bottom-2 left-8 h-16 w-32 rounded-full bg-amber-300/20 blur-xl" />
      </div>

      {/* Floating Cloud Vault Chest */}
      <div
        className={cn(
          'relative flex h-52 w-52 flex-col items-center justify-center rounded-3xl border-4 shadow-2xl transition-all duration-700 select-none',
          'border-pink-300/50 bg-gradient-to-b from-[#2E2038] via-[#22182B] to-[#17101E]',
          isUnlocked
            ? 'border-emerald-300/70 shadow-emerald-400/20'
            : 'ring-2 shadow-purple-900/40 ring-pink-300/20',
        )}
      >
        {/* Soft cloud puffs around borders */}
        <div className="absolute -top-3 -left-3 flex items-center gap-1 text-pink-300/80">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="absolute -right-2 -bottom-2 flex items-center gap-1 text-amber-300/80">
          <Sparkles className="h-4 w-4" />
        </div>

        {/* Luminous Star Lock Core */}
        <div
          className={cn(
            'flex h-28 w-28 items-center justify-center rounded-full border-4 shadow-inner transition-transform duration-700',
            'border-amber-300/70 bg-gradient-to-tr from-amber-500 via-pink-400 to-purple-400',
            isUnlocked ? 'scale-105 rotate-90 border-emerald-300' : 'rotate-0',
          )}
        >
          {/* Inner Golden Hub */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-200 bg-[#1D1226] shadow-lg">
            {isUnlocked ? (
              <Unlock className="h-6 w-6 text-emerald-300 transition-transform duration-300" />
            ) : (
              <Lock className="h-6 w-6 text-amber-200 transition-transform duration-300" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
