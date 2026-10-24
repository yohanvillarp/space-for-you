import { Lock, Unlock } from 'lucide-react'
import { cn } from '@/shared/lib'

export interface VaultDisplayProps {
  isUnlocked: boolean
}

export function SnowySafeVault({ isUnlocked }: VaultDisplayProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Floating Snowflakes background accent */}
      <div className="pointer-events-none absolute -inset-10 overflow-hidden opacity-60 select-none">
        <span className="animate-float absolute top-2 left-6 text-xl">❄</span>
        <span className="animate-float absolute top-10 right-8 text-sm delay-300">
          ❅
        </span>
        <span className="animate-float absolute bottom-4 left-10 text-base delay-700">
          ❆
        </span>
        <span className="animate-float absolute right-6 bottom-8 text-lg delay-500">
          ❄
        </span>
      </div>

      {/* 3D Brushed Steel Safe Box */}
      <div
        className={cn(
          'relative flex h-52 w-52 flex-col items-center justify-center rounded-3xl border-4 shadow-2xl transition-all duration-700 select-none',
          'border-slate-400/40 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900',
          isUnlocked
            ? 'border-emerald-400/60 shadow-emerald-500/20'
            : 'ring-1 shadow-blue-900/30 ring-blue-300/20',
        )}
      >
        {/* Bolt rivets on corners */}
        <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-slate-400/60 shadow-xs" />
        <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-slate-400/60 shadow-xs" />
        <div className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-slate-400/60 shadow-xs" />
        <div className="absolute right-3 bottom-3 h-2 w-2 rounded-full bg-slate-400/60 shadow-xs" />

        {/* Rotary Combination Dial Wheel */}
        <div
          className={cn(
            'flex h-28 w-28 items-center justify-center rounded-full border-4 shadow-inner transition-transform duration-700',
            'border-slate-500 bg-gradient-to-tr from-slate-800 via-slate-600 to-slate-500',
            isUnlocked ? 'rotate-90 border-emerald-400' : 'rotate-0',
          )}
        >
          {/* Dial tick marks */}
          <div className="absolute inset-1 rounded-full border border-dashed border-slate-400/40" />

          {/* Center Hub */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-400 bg-slate-900 shadow-lg">
            {isUnlocked ? (
              <Unlock className="h-6 w-6 text-emerald-400 transition-transform duration-300" />
            ) : (
              <Lock className="h-6 w-6 text-blue-200 transition-transform duration-300" />
            )}
          </div>
        </div>

        {/* Steel Handle Bar */}
        <div
          className={cn(
            'absolute top-1/2 -right-3 h-16 w-3 -translate-y-1/2 rounded-r-md border border-slate-500 bg-gradient-to-r from-slate-700 to-slate-500 shadow-md transition-transform duration-500',
            isUnlocked && 'translate-x-3 rotate-12',
          )}
        />
      </div>
    </div>
  )
}
