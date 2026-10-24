import { Lock } from 'lucide-react'
import type { LockVaultTheme } from '../model/lock.types'

export interface VaultMiniaturePreviewProps {
  theme: LockVaultTheme
}

export function VaultMiniaturePreview({ theme }: VaultMiniaturePreviewProps) {
  switch (theme) {
    case 'cloud-vault':
      return (
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-pink-300/40 bg-gradient-to-b from-[#2E2038] to-[#17101E] shadow-md">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-300/60 bg-gradient-to-tr from-amber-400 to-pink-400 shadow-inner">
            <Lock className="h-3.5 w-3.5 text-amber-100" />
          </div>
          <span className="absolute -top-1 -right-1 text-xs">✨</span>
        </div>
      )
    case 'vintage-diary':
      return (
        <div className="relative flex h-14 w-12 items-center justify-center rounded-lg border-2 border-[#5C3D2E] bg-gradient-to-r from-[#2B1B15] to-[#38231B] shadow-md">
          <div className="absolute top-0 bottom-0 left-1 w-0.5 bg-[#221510]" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-amber-500/50 bg-[#1A100B]">
            <Lock className="h-3 w-3 text-amber-300" />
          </div>
          <div className="absolute -bottom-1 left-2 h-2.5 w-1 rounded-b-xs bg-amber-500" />
        </div>
      )
    case 'velvet-chest':
      return (
        <div className="relative flex h-13 w-15 items-center justify-center rounded-xl border-2 border-[#A34835]/50 bg-gradient-to-b from-[#4A1D15] to-[#250E0A] shadow-md">
          <div className="absolute inset-x-1 -top-0.5 h-1 rounded-t-sm bg-gradient-to-r from-[#A34835] to-[#CF7056]" />
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-amber-400/80 bg-gradient-to-tr from-amber-600 to-amber-200 p-0.5">
            <Lock className="h-3 w-3 text-[#250E0A]" />
          </div>
        </div>
      )
    case 'snowy-safe':
    default:
      return (
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-slate-400/50 bg-gradient-to-b from-slate-700 to-slate-900 shadow-md">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-400 bg-gradient-to-tr from-slate-800 to-slate-600 shadow-inner">
            <Lock className="h-3.5 w-3.5 text-blue-200" />
          </div>
          <span className="absolute -top-1 -right-1 text-xs">❄️</span>
        </div>
      )
  }
}
