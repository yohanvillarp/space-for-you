import type { LockVaultTheme } from '@/features/space-lock/model/lock.types'
import { SnowySafeVault } from '@/features/space-lock/ui/vaults/SnowySafeVault'
import { CloudVault } from '@/features/space-lock/ui/vaults/CloudVault'
import { VintageDiaryVault } from '@/features/space-lock/ui/vaults/VintageDiaryVault'
import { VelvetChestVault } from '@/features/space-lock/ui/vaults/VelvetChestVault'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface SpatialVaultObjectProps {
  vaultTheme: LockVaultTheme
  isUnlocked: boolean
  className?: string
  onSelect?: () => void
}

export function SpatialVaultObject({
  vaultTheme,
  isUnlocked,
  className,
  onSelect,
}: SpatialVaultObjectProps) {
  const renderVaultGraphic = () => {
    switch (vaultTheme) {
      case 'cloud-vault':
        return <CloudVault isUnlocked={isUnlocked} />
      case 'vintage-diary':
        return <VintageDiaryVault isUnlocked={isUnlocked} />
      case 'velvet-chest':
        return <VelvetChestVault isUnlocked={isUnlocked} />
      case 'snowy-safe':
      default:
        return <SnowySafeVault isUnlocked={isUnlocked} />
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const sfx = vaultTheme === 'vintage-diary' ? 'paper-rustle' : 'tactile-tap'
    playSpatialSfx(sfx)
    onSelect?.()
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative flex cursor-pointer items-center justify-center transition-transform duration-300 select-none hover:scale-105 active:scale-95',
        className,
      )}
    >
      <div className="relative p-2 transition-transform duration-500">
        {renderVaultGraphic()}
      </div>
    </div>
  )
}
