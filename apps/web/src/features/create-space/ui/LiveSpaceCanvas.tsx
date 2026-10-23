import type { SpaceTemplateId } from '@/entities/space'
import { THEME_REGISTRY } from '@/features/space-themes'
import { cn } from '@/shared/lib'

export interface LiveSpaceCanvasProps {
  templateId: SpaceTemplateId
  className?: string
}

export function LiveSpaceCanvas({
  templateId,
  className,
}: LiveSpaceCanvasProps) {
  const currentTheme = THEME_REGISTRY[templateId] ?? THEME_REGISTRY.birthday
  const ThemeUniverse = currentTheme.component

  return (
    <div className={cn('relative w-full', className)}>
      {/* Dynamic ambient backlight aura that radiates from the physical stage */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-6 rounded-3xl bg-radial opacity-80 blur-3xl transition-all duration-700',
          currentTheme.ambientGlow,
        )}
      />

      {/* The Physical Stage Setting with dynamic transition */}
      <div
        key={templateId}
        className="animate-fade-in relative rounded-3xl shadow-2xl transition-all duration-500"
      >
        <ThemeUniverse />
      </div>
    </div>
  )
}
