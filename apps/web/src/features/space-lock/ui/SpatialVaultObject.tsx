import { useRef, useState, useCallback, useEffect } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { LockVaultTheme } from '../model/lock.types'
import { SnowySafeVault } from './vaults/SnowySafeVault'
import { CloudVault } from './vaults/CloudVault'
import { VintageDiaryVault } from './vaults/VintageDiaryVault'
import { VelvetChestVault } from './vaults/VelvetChestVault'
import { RotationHandle } from '@/features/create-space/ui/canvas/RotationHandle'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface SpatialVaultObjectProps {
  vaultTheme: LockVaultTheme
  isUnlocked: boolean
  x: number
  y: number
  rotation: number
  isSelected: boolean
  isStudioPreview: boolean
  onSelect: () => void
  onUpdatePosition: (x: number, y: number) => void
  onSetRotation: (angle: number) => void
}

export function SpatialVaultObject({
  vaultTheme,
  isUnlocked,
  x,
  y,
  rotation,
  isSelected,
  isStudioPreview,
  onSelect,
  onUpdatePosition,
  onSetRotation,
}: SpatialVaultObjectProps) {
  const itemRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const dragRef = useRef<{
    startX: number
    startY: number
    itemStartX: number
    itemStartY: number
  } | null>(null)

  const handlePointerDown = useCallback(
    (e: ReactPointerEvent) => {
      if (!isStudioPreview) return
      // If clicking rotation handle, ignore drag
      if ((e.target as HTMLElement).closest('[role="slider"]')) return

      e.stopPropagation()
      onSelect()

      const sfx =
        vaultTheme === 'vintage-diary' ? 'paper-rustle' : 'tactile-tap'
      playSpatialSfx(sfx)

      setIsDragging(true)
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        itemStartX: x,
        itemStartY: y,
      }
    },
    [isStudioPreview, onSelect, vaultTheme, x, y],
  )

  useEffect(() => {
    if (!isDragging) return

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragRef.current || !itemRef.current) return
      const parent = itemRef.current.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const deltaXPercent =
        ((e.clientX - dragRef.current.startX) / rect.width) * 100
      const deltaYPercent =
        ((e.clientY - dragRef.current.startY) / rect.height) * 100

      const newX = Math.max(
        15,
        Math.min(
          85,
          Math.round((dragRef.current.itemStartX + deltaXPercent) * 10) / 10,
        ),
      )
      const newY = Math.max(
        15,
        Math.min(
          85,
          Math.round((dragRef.current.itemStartY + deltaYPercent) * 10) / 10,
        ),
      )

      onUpdatePosition(newX, newY)
    }

    const handlePointerUp = () => {
      setIsDragging(false)
      dragRef.current = null
      playSpatialSfx('pop-snap')
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isDragging, onUpdatePosition])

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

  return (
    <div
      ref={itemRef}
      onPointerDown={handlePointerDown}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      className={cn(
        'group absolute z-20 touch-none transition-shadow select-none',
        isStudioPreview
          ? isDragging
            ? 'cursor-grabbing'
            : 'cursor-grab'
          : 'cursor-default',
        isDragging && 'scale-105 opacity-90 shadow-2xl',
        isSelected &&
          isStudioPreview &&
          'rounded-3xl shadow-xl ring-2 ring-amber-400/80 ring-offset-2 ring-offset-black/60',
      )}
    >
      {/* 3D Vault Illustration */}
      <div className="relative p-2 transition-transform duration-300">
        {renderVaultGraphic()}
      </div>

      {/* Tactile Rotation Handle when selected in Studio mode */}
      {isSelected && isStudioPreview && (
        <RotationHandle
          itemId="vault-object"
          currentRotation={rotation}
          itemRef={itemRef}
          onSetRotation={(_id, angle) => onSetRotation(angle)}
        />
      )}
    </div>
  )
}
