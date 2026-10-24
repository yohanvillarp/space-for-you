import type { LockBackgroundTheme } from '../model/lock.types'

export interface GateAtmosphereBackdropProps {
  theme?: LockBackgroundTheme
}

export function GateAtmosphereBackdrop({
  theme = 'midnight-sanctuary',
}: GateAtmosphereBackdropProps) {
  switch (theme) {
    case 'frosted-aurora':
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          {/* Winter slate deep backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#09111C] via-[#070D16] to-[#04080E]" />
          {/* Teal aurora glow ribbon */}
          <div className="absolute -top-1/4 -left-1/4 h-[700px] w-[900px] rounded-full bg-cyan-500/15 blur-[120px]" />
          <div className="absolute -right-1/4 -bottom-1/4 h-[600px] w-[800px] rounded-full bg-sky-600/12 blur-[100px]" />
          {/* Soft ice crystals */}
          <div className="absolute inset-0 bg-radial from-cyan-400/8 via-transparent to-black/70" />
        </div>
      )

    case 'velvet-ember':
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          {/* Deep dark terracotta & wine backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B0E09] via-[#1B0704] to-[#0D0302]" />
          {/* Warm ember furnace glow */}
          <div className="absolute top-1/3 left-1/4 h-[650px] w-[750px] rounded-full bg-[#A34835]/20 blur-[130px]" />
          <div className="absolute right-1/4 -bottom-1/4 h-[500px] w-[600px] rounded-full bg-amber-600/12 blur-[110px]" />
          {/* Warm ember vignette */}
          <div className="absolute inset-0 bg-radial from-[#CF7056]/8 via-black/40 to-black/85" />
        </div>
      )

    case 'cosmic-nebula':
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          {/* Deep celestial violet & amethyst */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#180A26] via-[#11061C] to-[#08020D]" />
          {/* Soft purple/pink nebula clouds */}
          <div className="absolute -top-1/3 right-1/4 h-[750px] w-[850px] rounded-full bg-purple-600/18 blur-[140px]" />
          <div className="absolute -bottom-1/4 left-1/3 h-[600px] w-[700px] rounded-full bg-pink-500/12 blur-[110px]" />
          {/* Starlight cosmic vignette */}
          <div className="absolute inset-0 bg-radial from-purple-400/8 via-transparent to-black/80" />
        </div>
      )

    case 'midnight-sanctuary':
    default:
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          {/* Obsidian darkness */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#120E0C] via-[#0A0706] to-[#050303]" />
          {/* Intimate amber core glow */}
          <div className="absolute top-1/2 left-1/2 h-[700px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/15 blur-[120px]" />
          {/* Deep obsidian vignette */}
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-black/45 to-black/90" />
        </div>
      )
  }
}
