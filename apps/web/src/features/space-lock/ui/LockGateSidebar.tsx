import { Lock, KeyRound, Shield, ShieldCheck } from 'lucide-react'
import type {
  SpaceProtectionConfig,
  LockVaultTheme,
  LockKeypadTheme,
} from '../model/lock.types'
import {
  VAULT_THEMES_CATALOG,
  KEYPAD_THEMES_CATALOG,
} from '../model/lock.types'
import { VaultMiniaturePreview } from './VaultMiniaturePreview'
import { KeypadMiniaturePreview } from './KeypadMiniaturePreview'
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
  isCompact: _isCompact = false,
  className,
}: LockGateSidebarProps) {
  const handleToggle = () => {
    playSpatialSfx('tactile-tap')
    onChangeConfig({ enabled: !config.enabled })
  }

  const handleSelectTheme = (themeId: LockVaultTheme) => {
    playSpatialSfx('tactile-tap')
    onChangeConfig({ vaultTheme: themeId })
  }

  const handleSelectKeypad = (themeId: LockKeypadTheme) => {
    playSpatialSfx('tactile-tap')
    onChangeConfig({ keypadTheme: themeId })
  }

  return (
    <aside
      className={cn(
        'flex h-full w-full flex-col border-l border-[#3B302A] bg-[#16120F] text-[#F3EAE1] select-none',
        className,
      )}
    >
      {/* Sidebar Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#3B302A] bg-[#1A1411] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
            <KeyRound className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-heading text-xs font-semibold tracking-wide text-amber-200">
              Lock Gate Workshop
            </h3>
            <p className="font-sans text-[10px] text-[#A99B90]">
              Secret vault & passcode entrance
            </p>
          </div>
        </div>

        <div
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-sans text-[10px] font-medium',
            config.enabled
              ? 'border border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
              : 'border border-stone-600/40 bg-stone-700/20 text-stone-400',
          )}
        >
          {config.enabled ? (
            <>
              <ShieldCheck className="h-3 w-3" />
              <span>Protected</span>
            </>
          ) : (
            <>
              <Shield className="h-3 w-3" />
              <span>Open</span>
            </>
          )}
        </div>
      </div>

      {/* Main Settings Body */}
      <div className="flex-1 space-y-5 overflow-y-auto p-4 font-sans text-xs">
        {/* Toggle Protection Card */}
        <div className="space-y-2 rounded-xl border border-[#3B302A] bg-[#1E1815] p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-amber-100">
                Require Passcode
              </span>
              <p className="text-[11px] text-[#A99B90]">
                Gate your space with a secret combination
              </p>
            </div>
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
        </div>

        {config.enabled && (
          <div className="animate-fade-in space-y-4">
            {/* Passcode Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-amber-200">
                Secret Passcode (PIN or word)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={config.passcode}
                  maxLength={8}
                  onChange={(e) => onChangeConfig({ passcode: e.target.value })}
                  placeholder="e.g. 1234 or LOVE"
                  className="w-full rounded-lg border border-[#4A3B32] bg-[#120E0C] px-3 py-2 font-mono text-xs tracking-wider text-amber-100 focus:border-amber-400 focus:outline-hidden"
                />
                <Lock className="absolute top-2.5 right-3 h-3.5 w-3.5 text-[#A99B90]" />
              </div>
            </div>

            {/* Vault Objects Grid (Memory Canvas style) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-amber-200">
                  Entrance Vault Artifact
                </label>
                <span className="text-[10px] text-stone-400">4 objects</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {VAULT_THEMES_CATALOG.map((theme) => {
                  const isSelected = config.vaultTheme === theme.id
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleSelectTheme(theme.id)}
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
                      <div className="p-2">
                        <p className="truncate text-center font-sans text-[11px] font-medium text-[#F3EAE1]">
                          {theme.name}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Keypad Objects Grid */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-amber-200">
                  Keypad Objects
                </label>
                <span className="text-[10px] text-stone-400">5 styles</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {KEYPAD_THEMES_CATALOG.map((kp) => {
                  const isSelected = (config.keypadTheme || 'classic') === kp.id
                  return (
                    <button
                      key={kp.id}
                      type="button"
                      onClick={() => handleSelectKeypad(kp.id)}
                      className={cn(
                        'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border text-left transition-all duration-200',
                        isSelected
                          ? 'border-amber-400 bg-amber-500/15 shadow-lg ring-1 ring-amber-400/60'
                          : 'border-[#3B302A] bg-[#1E1815] hover:border-amber-400/50 hover:bg-[#251F1C]',
                      )}
                    >
                      <div className="relative flex h-14 w-full items-center justify-center overflow-hidden border-b border-[#3B302A]/50 bg-[#2A221E] p-1.5 transition-transform duration-200 group-hover:scale-105">
                        <KeypadMiniaturePreview theme={kp.id} />
                      </div>
                      <div className="p-1.5">
                        <p className="truncate text-center font-sans text-[11px] font-medium text-[#F3EAE1]">
                          {kp.name}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
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
