import { useState } from 'react'
import { Home, Search, X } from 'lucide-react'
import type {
  SpaceScene,
  SpaceMeta,
} from '@/features/create-space/model/scenes.types'
import { sceneTemplateRegistry } from '@/features/create-space/model/scene-templates.class'
import { SceneSpecimenCard } from '@/features/create-space/ui/hub/SceneSpecimenCard'
import { cn, getSearchShortcutLabel } from '@/shared/lib'

export interface SpaceGeneralSidebarProps {
  scenesCount: number
  onAddScene: (scene: SpaceScene) => void
  isCompact?: boolean
  className?: string
  // Backward compatibility props
  meta?: SpaceMeta
  scenes?: SpaceScene[]
  isProtectionEnabled?: boolean
  onChangeMeta?: (updates: Partial<SpaceMeta>) => void
  onOpenScene?: (sceneId: string) => void
  onOpenAddScene?: () => void
  onDeleteScene?: (sceneId: string) => void
  onOpenVault?: () => void
}

export function SpaceGeneralSidebar({
  scenesCount,
  onAddScene,
  scenes,
  onOpenAddScene,
  className,
}: SpaceGeneralSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const totalScenes = scenes?.length ?? scenesCount
  const availableTemplates = sceneTemplateRegistry.search(searchQuery)

  const handleAddSpecimen = (
    template: ReturnType<typeof sceneTemplateRegistry.getAll>[number],
  ) => {
    // Add scene instance without sound as requested
    const newScene = template.createInstance(totalScenes)
    if (onAddScene) {
      onAddScene(newScene)
    } else if (onOpenAddScene) {
      onOpenAddScene()
    }
  }

  return (
    <aside
      className={cn(
        'flex h-full w-full flex-col border-l border-[#3B302A] bg-[#16120F] text-[#F3EAE1] select-none',
        className,
      )}
    >
      {/* Sidebar Header: clean title without description or open badge */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#3B302A] bg-[#1A1411] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
            <Home className="h-4 w-4" />
          </div>
          <h3 className="font-heading text-xs font-semibold tracking-wide text-amber-200">
            Space Workshop
          </h3>
        </div>
      </div>

      {/* Search Header for Addable Scenes */}
      <div className="shrink-0 border-b border-[#3B302A]/80 bg-[#16120F] p-3">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-stone-400" />
          <input
            data-search-input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                if (searchQuery) setSearchQuery('')
                else e.currentTarget.blur()
              }
            }}
            placeholder="Search scenes..."
            aria-label="Search scenes"
            className="w-full rounded-xl border border-[#3B302A] bg-[#1E1815] py-1.5 pr-14 pl-8.5 font-sans text-xs text-[#FAF6F0] placeholder-stone-500 shadow-inner focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 focus:outline-none"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 flex h-4 w-4 cursor-pointer items-center justify-center text-stone-400 hover:text-stone-200"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-2.5 hidden items-center rounded border border-[#3B302A] bg-[#2A221E] px-1.5 py-0.5 font-sans text-[10px] text-[#A99B90] select-none sm:inline-flex">
              {getSearchShortcutLabel()}
            </kbd>
          )}
        </div>
      </div>

      {/* Main Specimen Grid Body */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="mb-2.5 flex items-center justify-between px-1">
          <span className="font-sans text-[11px] font-medium text-stone-400">
            Addable Scenes
          </span>
          <span className="font-sans text-[10px] text-stone-500">
            {availableTemplates.length}{' '}
            {availableTemplates.length === 1 ? 'type' : 'types'}
          </span>
        </div>

        {availableTemplates.length === 0 ? (
          <div className="flex h-36 flex-col items-center justify-center p-4 text-center">
            <span className="text-xl">🔍</span>
            <p className="font-heading mt-2 text-xs text-[#F3EAE1]">
              No scene types found
            </p>
            <p className="mt-0.5 font-sans text-[10px] text-stone-400">
              Try clearing your search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(115px,1fr))] gap-2">
            {availableTemplates.map((template) => (
              <SceneSpecimenCard
                key={template.type}
                template={template}
                onAdd={() => handleAddSpecimen(template)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Subtle Bottom Information */}
      <div className="shrink-0 border-t border-[#3B302A] bg-[#171310] px-3 py-2 text-center font-sans text-[10px] text-stone-400">
        Click a scene type to add it directly to this space
      </div>
    </aside>
  )
}
