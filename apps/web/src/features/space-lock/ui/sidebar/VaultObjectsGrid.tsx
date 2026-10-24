import type { LockVaultTheme } from '../../model/lock.types'
import { VAULT_THEMES_CATALOG } from '../../model/lock.types'
import { VaultMiniaturePreview } from '../VaultMiniaturePreview'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface VaultObjectsGridProps {
  currentTheme?: LockVaultTheme
  onSelectTheme: (themeId: LockVaultTheme) => void
}

export function VaultObjectsGrid({
  currentTheme = 'snowy-safe',
  onSelectTheme,
}: VaultObjectsGridProps) {
  return (
    <div className="space-y-2 pt-1">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium text-amber-200">
          Entrance Vault Artifact
        </label>
        <span className="text-[10px] text-stone-400">4 objects</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {VAULT_THEMES_CATALOG.map((theme) => {
          const isSelected = currentTheme === theme.id
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => {
                playSpatialSfx('tactile-tap')
                onSelectTheme(theme.id)
              }}
              className={cn(
                'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border text-left transition-all duration-200',
                isSelected
                  ? 'border-amber-400 bg-amber-500/15 shadow-lg ring-1 ring-amber-400/60'
                  : 'border-[#3B302A] bg-[#1E1815] hover:border-amber-400/50 hover:bg-[#251F1C]',
              )}
            >
              {/* Visual specimen preview area */}
              <div className="relative flex h-20 w-full items-center justify-center overflow-hidden border-b border-[#3B302A]/50 bg-[#2A221E] p-2 transition-transform duration-200 group-hover:scale-105">
                <VaultMiniaturePreview theme={theme.id} />
              </div>

              {/* Name below preview */}
              <div className="p-2 text-center">
                <p className="truncate font-sans text-[11px] font-medium text-[#F3EAE1]">
                  {theme.name}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
