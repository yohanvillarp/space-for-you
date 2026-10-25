import { Globe, CalendarClock, FileEdit, Archive, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib'

export type DashboardFilterId =
  'all' | 'published' | 'scheduled' | 'draft' | 'archived'

export interface DashboardFiltersProps {
  activeFilter: DashboardFilterId
  onSelectFilter: (filter: DashboardFilterId) => void
  counts: {
    all: number
    published: number
    scheduled: number
    draft: number
    archived: number
  }
}

interface DashboardFilterTab {
  id: DashboardFilterId
  label: string
  count: number
  icon: LucideIcon
}

export function DashboardFilters({
  activeFilter,
  onSelectFilter,
  counts,
}: DashboardFiltersProps) {
  const tabs: DashboardFilterTab[] = [
    {
      id: 'all',
      label: 'All Spaces',
      count: counts.all,
      icon: Sparkles,
    },
    {
      id: 'published',
      label: 'Live',
      count: counts.published,
      icon: Globe,
    },
    {
      id: 'scheduled',
      label: 'Scheduled',
      count: counts.scheduled,
      icon: CalendarClock,
    },
    {
      id: 'draft',
      label: 'Drafts',
      count: counts.draft,
      icon: FileEdit,
    },
  ]

  if (counts.archived > 0 || activeFilter === 'archived') {
    tabs.push({
      id: 'archived',
      label: 'Archived',
      count: counts.archived,
      icon: Archive,
    })
  }

  return (
    <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto border-b border-white/10 pb-2 text-xs">
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.id
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectFilter(tab.id)}
            className={cn(
              'group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 font-sans font-medium transition-all select-none',
              isActive
                ? 'border-amber-400/40 bg-amber-400/15 text-amber-200 shadow-xs'
                : 'border-transparent text-stone-400 hover:border-white/10 hover:bg-white/5 hover:text-stone-200',
            )}
          >
            <Icon
              className={cn(
                'h-3.5 w-3.5 transition-colors',
                isActive
                  ? 'text-amber-300'
                  : 'text-stone-500 group-hover:text-stone-300',
              )}
            />
            <span>{tab.label}</span>
            <span
              className={cn(
                'py-0.2 rounded-full px-1.5 font-mono text-[10px]',
                isActive
                  ? 'bg-amber-400/25 text-amber-100'
                  : 'bg-white/10 text-stone-400',
              )}
            >
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
