import { Lock, Sparkles } from 'lucide-react'
import { cn, playSpatialSfx } from '@/shared/lib'

export type StudioScene = 'stage' | 'gate'

export interface StageBottomDockProps {
  activeScene: StudioScene
  onSelectScene: (scene: StudioScene) => void
  isProtectionEnabled: boolean
  className?: string
}

export function StageBottomDock({
  activeScene,
  onSelectScene,
  isProtectionEnabled,
  className,
}: StageBottomDockProps) {
  const handleSwitch = (scene: StudioScene) => {
    if (scene === activeScene) return
    playSpatialSfx('tactile-tap')
    onSelectScene(scene)
  }

  return (
    <div
      className={cn(
        'pointer-events-auto absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#17120F]/90 p-1 shadow-2xl backdrop-blur-md select-none',
        className,
      )}
    >
      {/* Scene 1: Lock Gate Entrance */}
      <button
        type="button"
        onClick={() => handleSwitch('gate')}
        className={cn(
          'flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-medium transition-all duration-200',
          activeScene === 'gate'
            ? 'bg-amber-400/20 text-amber-200 shadow-xs ring-1 ring-amber-400/50'
            : 'text-stone-400 hover:bg-white/5 hover:text-stone-200',
        )}
      >
        <Lock className="h-3.5 w-3.5" />
        <span>Entrance Vault</span>
        {isProtectionEnabled && (
          <span
            title="Passcode protection is enabled"
            className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-xs"
          />
        )}
      </button>

      {/* Divider */}
      <div className="h-3.5 w-px bg-white/15" />

      {/* Scene 2: Memory Canvas (Main Stage) */}
      <button
        type="button"
        onClick={() => handleSwitch('stage')}
        className={cn(
          'flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-medium transition-all duration-200',
          activeScene === 'stage'
            ? 'bg-amber-400/20 text-amber-200 shadow-xs ring-1 ring-amber-400/50'
            : 'text-stone-400 hover:bg-white/5 hover:text-stone-200',
        )}
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>Memory Canvas</span>
      </button>
    </div>
  )
}
