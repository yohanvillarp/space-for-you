import { Plus, Sparkles, Mail } from 'lucide-react'
import type { SceneSpecimenTemplate } from '@/features/create-space/model/scene-templates.class'

export interface SceneSpecimenCardProps {
  template: SceneSpecimenTemplate
  onAdd: () => void
}

export function SceneSpecimenCard({ template, onAdd }: SceneSpecimenCardProps) {
  const renderIcon = () => {
    if (template.type === 'letters') {
      return <Mail className="h-6 w-6 text-rose-300" />
    }
    return <Sparkles className="h-6 w-6 text-amber-300" />
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onAdd}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onAdd()
        }
      }}
      title={`Add ${template.title} • ${template.description}`}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#3B302A] bg-[#211B18] transition-all duration-200 hover:border-amber-400/60 hover:bg-[#251F1C] hover:shadow-lg focus:ring-1 focus:ring-amber-400/50 focus:outline-none"
    >
      {/* Specimen Visual Preview Area */}
      <div className="relative flex h-20 w-full items-center justify-center overflow-hidden border-b border-[#3B302A]/50 bg-[#2A221E] p-2 transition-transform duration-200 group-hover:bg-[#2E2520]">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 shadow-inner transition-transform duration-200 group-hover:scale-105">
          {renderIcon()}
        </div>

        {/* Add Action Indicator Cue */}
        <div className="pointer-events-none absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-md border border-[#3B302A] bg-[#14110F]/80 text-amber-300 opacity-0 transition-opacity duration-180 group-hover:opacity-100">
          <Plus className="h-3 w-3 stroke-[2.5]" />
        </div>
      </div>

      {/* Asset Name Label Below Preview */}
      <div className="p-2 text-center">
        <p className="truncate font-sans text-[11px] font-medium text-[#F3EAE1]">
          {template.title}
        </p>
        <p className="mt-0.5 truncate font-sans text-[9px] tracking-wider text-stone-400 uppercase">
          {template.category}
        </p>
      </div>
    </div>
  )
}
