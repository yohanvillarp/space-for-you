import { Sparkles, Heart, Users, Check } from 'lucide-react'
import { THEME_REGISTRY } from '@/features/space-themes'
import type { SpaceTemplateId } from '@/entities/space'
import { Card } from '@/shared/ui'
import { cn } from '@/shared/lib'

export interface ThemeSelectorListProps {
  selectedTemplateId: SpaceTemplateId
  onSelectTemplate: (id: SpaceTemplateId) => void
  layout?: 'list' | 'grid'
}

const TEMPLATE_KEYS: SpaceTemplateId[] = [
  'birthday',
  'anniversary',
  'friendship',
]

export function ThemeSelectorList({
  selectedTemplateId,
  onSelectTemplate,
  layout = 'grid',
}: ThemeSelectorListProps) {
  const getIcon = (id: SpaceTemplateId) => {
    switch (id) {
      case 'birthday':
        return <Sparkles className="h-5 w-5 text-amber-500" />
      case 'anniversary':
        return <Heart className="text-primary h-5 w-5" />
      case 'friendship':
        return <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
      default:
        return <Sparkles className="text-primary h-5 w-5" />
    }
  }

  const isGrid = layout === 'grid'

  return (
    <div
      role="radiogroup"
      aria-label="Space theme selection"
      className={cn(
        isGrid ? 'grid grid-cols-1 gap-3 sm:grid-cols-3' : 'space-y-3',
      )}
    >
      {TEMPLATE_KEYS.map((key) => {
        const theme = THEME_REGISTRY[key]
        const isSelected = selectedTemplateId === key

        return (
          <Card
            key={key}
            tabIndex={0}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectTemplate(key)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                onSelectTemplate(key)
              }
            }}
            className={cn(
              'group focus-visible:ring-primary relative cursor-pointer border-2 transition-all duration-200 outline-none select-none focus-visible:ring-2',
              isGrid
                ? 'flex flex-col items-center justify-center p-4 text-center sm:p-5'
                : 'flex items-center justify-between p-4 sm:p-5',
              isSelected
                ? 'border-primary bg-bg-surface ring-primary/20 scale-[1.02] shadow-md ring-1'
                : 'border-border-base/60 bg-bg-surface/50 hover:border-border-base hover:bg-bg-surface hover:shadow-xs',
            )}
          >
            {isGrid ? (
              <>
                <div
                  className={cn(
                    'mb-2.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105',
                    isSelected
                      ? 'border-primary/40 bg-primary/10'
                      : 'border-border-base/50 bg-bg-subtle/80',
                  )}
                >
                  {getIcon(key)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <h3 className="font-heading text-text-primary text-sm font-medium tracking-tight">
                      {theme.title}
                    </h3>
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: theme.accentColor }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-heading text-primary text-[11px] font-medium italic">
                    {theme.stageName}
                  </p>
                </div>

                {isSelected && (
                  <div className="bg-primary text-text-inverse absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full shadow-xs">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-3.5 pr-3">
                  <div
                    className={cn(
                      'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105',
                      isSelected
                        ? 'border-primary/40 bg-primary/10'
                        : 'border-border-base/50 bg-bg-subtle/80',
                    )}
                  >
                    {getIcon(key)}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-text-primary text-base font-medium tracking-tight">
                        {theme.title}
                      </h3>
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: theme.accentColor }}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-heading text-primary text-xs font-medium italic">
                      {theme.stageName}
                    </p>
                    <p className="text-text-secondary font-sans text-[11px] leading-snug">
                      {theme.mood}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
                    isSelected
                      ? 'border-primary bg-primary text-text-inverse scale-105 shadow-xs'
                      : 'border-border-base/60 bg-bg-surface group-hover:border-primary/50',
                  )}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </>
            )}
          </Card>
        )
      })}
    </div>
  )
}
