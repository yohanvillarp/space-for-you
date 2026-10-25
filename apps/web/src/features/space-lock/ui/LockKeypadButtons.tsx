import { Delete } from 'lucide-react'
import type { KeypadThemeStyle } from './keypad-styles'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface LockKeypadButtonsProps {
  style: KeypadThemeStyle
  isKeypadDisabled: boolean
  hasDigits: boolean
  onPressDigit: (key: string) => void
  onClear: () => void
  onDelete: () => void
}

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export function LockKeypadButtons({
  style,
  isKeypadDisabled,
  hasDigits,
  onPressDigit,
  onClear,
  onDelete,
}: LockKeypadButtonsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 pt-1">
      {DIGITS.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onPressDigit(key)}
          disabled={isKeypadDisabled}
          className={cn(
            'flex h-12 w-14 cursor-pointer items-center justify-center transition-all disabled:cursor-not-allowed disabled:opacity-40',
            style.button,
          )}
        >
          {key}
        </button>
      ))}

      <button
        type="button"
        onClick={() => {
          playSpatialSfx('tactile-tap')
          onClear()
        }}
        disabled={isKeypadDisabled || !hasDigits}
        className="flex h-12 w-14 cursor-pointer items-center justify-center rounded-xl font-sans text-xs text-stone-400 transition-colors hover:text-stone-200 disabled:opacity-30"
      >
        Clear
      </button>

      <button
        type="button"
        onClick={() => onPressDigit('0')}
        disabled={isKeypadDisabled}
        className={cn(
          'flex h-12 w-14 cursor-pointer items-center justify-center transition-all disabled:cursor-not-allowed disabled:opacity-40',
          style.button,
        )}
      >
        0
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={isKeypadDisabled || !hasDigits}
        title="Delete last digit"
        className="flex h-12 w-14 cursor-pointer items-center justify-center rounded-xl text-stone-400 transition-colors hover:text-stone-200 disabled:opacity-30"
      >
        <Delete className="h-4 w-4" />
      </button>
    </div>
  )
}
