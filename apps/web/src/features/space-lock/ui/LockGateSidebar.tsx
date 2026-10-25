import { Lock, KeyRound, SlidersHorizontal } from 'lucide-react'
import type { SpaceProtectionConfig } from '@/features/space-lock/model/lock.types'
import { useLockGateToolbox } from '@/features/space-lock/model/useLockGateToolbox'
import { LockGateCollapsibleSection } from '@/features/space-lock/ui/sidebar/LockGateCollapsibleSection'
import { LockGateToolboxHeader } from '@/features/space-lock/ui/sidebar/LockGateToolboxHeader'
import { BackgroundAtmosphereGrid } from '@/features/space-lock/ui/sidebar/BackgroundAtmosphereGrid'
import { VaultObjectsGrid } from '@/features/space-lock/ui/sidebar/VaultObjectsGrid'
import { KeypadObjectsGrid } from '@/features/space-lock/ui/sidebar/KeypadObjectsGrid'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LockGateSidebarProps {
  config: SpaceProtectionConfig
  onChangeConfig: (updates: Partial<SpaceProtectionConfig>) => void
  isCompact?: boolean
  className?: string
}

export function LockGateSidebar({
  config,
  onChangeConfig,
  isCompact = false,
  className,
}: LockGateSidebarProps) {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredVaults,
    filteredKeypads,
    filteredAtmospheres,
    activePlaceholder,
  } = useLockGateToolbox()

  const handleToggle = () => {
    playSpatialSfx('tactile-tap')
    onChangeConfig({ enabled: !config.enabled })
  }

  return (
    <aside
      className={cn(
        'flex h-full w-full flex-col border-l border-[#3B302A] bg-[#16120F] text-[#F3EAE1] select-none',
        className,
      )}
    >
      {/* Sidebar Header without description or badges */}
      <div className="flex shrink-0 items-center border-b border-[#3B302A] bg-[#1A1411] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
            <KeyRound className="h-4 w-4" />
          </div>
          <h3 className="font-heading text-xs font-semibold tracking-wide text-amber-200">
            Entrance Vault
          </h3>
        </div>
      </div>

      {/* Main Settings Body */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4 font-sans text-xs">
        {/* Collapsible Passcode Settings Section */}
        <LockGateCollapsibleSection
          title="Passcode Settings"
          icon={SlidersHorizontal}
          defaultOpen={true}
        >
          {/* Require Passcode Toggle Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-100">
              Require Passcode
            </span>
            <button
              type="button"
              onClick={handleToggle}
              role="switch"
              aria-checked={config.enabled}
              className={cn(
                'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                config.enabled ? 'bg-amber-500' : 'bg-stone-700',
              )}
            >
              <span
                className={cn(
                  'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                  config.enabled ? 'translate-x-4' : 'translate-x-0',
                )}
              />
            </button>
          </div>

          {/* Passcode & Clue Inputs (when enabled) */}
          {config.enabled && (
            <>
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-medium text-amber-200">
                  Secret Passcode (PIN or word)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.passcode || ''}
                    maxLength={8}
                    onChange={(e) =>
                      onChangeConfig({ passcode: e.target.value })
                    }
                    placeholder="e.g. 1234 or LOVE"
                    className="w-full rounded-lg border border-[#4A3B32] bg-[#120E0C] px-3 py-2 font-mono text-xs tracking-wider text-amber-100 focus:border-amber-400 focus:outline-hidden"
                  />
                  <Lock className="absolute top-2.5 right-3 h-3.5 w-3.5 text-[#A99B90]" />
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-amber-200">
                    Secret Clue (Hint for Recipient)
                  </label>
                  <span className="font-mono text-[10px] text-stone-500">
                    {(config.hint || '').length}/80
                  </span>
                </div>
                <input
                  type="text"
                  value={config.hint || ''}
                  maxLength={80}
                  onChange={(e) => onChangeConfig({ hint: e.target.value })}
                  placeholder="e.g. The day we first met in Paris"
                  className="w-full rounded-lg border border-[#4A3B32] bg-[#120E0C] px-3 py-2 font-sans text-xs text-amber-100 placeholder:text-stone-600 focus:border-amber-400 focus:outline-hidden"
                />
              </div>
            </>
          )}
        </LockGateCollapsibleSection>

        {config.enabled && (
          <div className="animate-fade-in space-y-4">
            {/* Modular Search & Category Switcher Header */}
            <LockGateToolboxHeader
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={clearSearch}
              searchPlaceholder={activePlaceholder}
              isCompact={isCompact}
            />

            {/* Active Category Display */}
            {activeCategory === 'vaults' && (
              <VaultObjectsGrid
                currentTheme={config.vaultTheme}
                onSelectTheme={(vt) => onChangeConfig({ vaultTheme: vt })}
                items={filteredVaults}
                searchQuery={searchQuery}
              />
            )}

            {activeCategory === 'keypads' && (
              <KeypadObjectsGrid
                currentTheme={config.keypadTheme}
                onSelectTheme={(kt) => onChangeConfig({ keypadTheme: kt })}
                items={filteredKeypads}
                searchQuery={searchQuery}
              />
            )}

            {activeCategory === 'atmospheres' && (
              <BackgroundAtmosphereGrid
                currentTheme={config.backgroundTheme}
                onSelectTheme={(bg) => onChangeConfig({ backgroundTheme: bg })}
                items={filteredAtmospheres}
                searchQuery={searchQuery}
              />
            )}
          </div>
        )}
      </div>

      {/* Footer Info Note */}
      <div className="shrink-0 border-t border-[#3B302A] bg-[#171310] px-3 py-2 text-center font-sans text-[10px] text-[#A99B90]">
        <span>
          {config.enabled
            ? 'Visitors will solve this vault first before viewing your space'
            : 'Turn on passcode to protect this space for someone special'}
        </span>
      </div>
    </aside>
  )
}
