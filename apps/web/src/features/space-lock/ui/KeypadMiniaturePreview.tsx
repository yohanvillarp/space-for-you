import type { LockKeypadTheme } from '../model/lock.types'

export interface KeypadMiniaturePreviewProps {
  theme: LockKeypadTheme
}

export function KeypadMiniaturePreview({ theme }: KeypadMiniaturePreviewProps) {
  switch (theme) {
    case 'vintage-typewriter':
      return (
        <div className="flex items-center gap-1.5 p-1 select-none">
          {['1', '2', '3'].map((d) => (
            <div
              key={d}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#8C6239] bg-[#221711] font-serif text-[11px] font-bold text-[#E8D7C3] shadow-md ring-1 ring-amber-600/30"
            >
              {d}
            </div>
          ))}
        </div>
      )
    case 'golden-luxury':
      return (
        <div className="flex items-center gap-1.5 p-1 select-none">
          {['1', '2', '3'].map((d) => (
            <div
              key={d}
              className="font-heading flex h-7 w-7 items-center justify-center rounded-lg border border-amber-400/80 bg-gradient-to-b from-[#2A1D15] to-[#17100B] text-[11px] font-bold text-amber-200 shadow-md shadow-amber-950/40"
            >
              {d}
            </div>
          ))}
        </div>
      )
    case 'celestial-crystal':
      return (
        <div className="flex items-center gap-1.5 p-1 select-none">
          {['1', '2', '3'].map((d) => (
            <div
              key={d}
              className="flex h-7 w-7 items-center justify-center rounded-xl border border-pink-400/50 bg-gradient-to-tr from-purple-950/80 to-pink-900/60 font-sans text-[11px] font-semibold text-pink-100 shadow-md shadow-pink-500/20"
            >
              {d}
            </div>
          ))}
        </div>
      )
    case 'clay-terracotta':
      return (
        <div className="flex items-center gap-1.5 p-1 select-none">
          {['1', '2', '3'].map((d) => (
            <div
              key={d}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#A34835] bg-gradient-to-b from-[#3D1A13] to-[#2B120D] font-mono text-[11px] font-bold text-[#EACABC] shadow-md"
            >
              {d}
            </div>
          ))}
        </div>
      )
    case 'classic':
    default:
      return (
        <div className="flex items-center gap-1.5 p-1 select-none">
          {['1', '2', '3'].map((d) => (
            <div
              key={d}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 font-mono text-[11px] font-medium text-stone-200 shadow-sm"
            >
              {d}
            </div>
          ))}
        </div>
      )
  }
}
