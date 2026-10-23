import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id: customId,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = customId || generatedId

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-text-secondary block font-sans text-xs font-medium"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="text-text-muted pointer-events-none absolute left-3 flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'border-border-base bg-bg-surface text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-primary/20 w-full rounded-md border px-3 py-2 font-sans text-sm transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon ? 'pl-9' : undefined,
              rightIcon ? 'pr-9' : undefined,
              error
                ? 'border-error focus:border-error focus:ring-error/20'
                : undefined,
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <div className="text-text-muted absolute right-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-error font-sans text-xs font-medium">{error}</p>
        )}

        {!error && helperText && (
          <p className="text-text-muted font-sans text-xs">{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
