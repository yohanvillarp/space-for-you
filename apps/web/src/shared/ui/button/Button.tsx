import { isValidElement, cloneElement } from 'react'
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import { cn } from '@/shared/lib'

export type ButtonVariant =
  'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  children?: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm',
  accent: 'bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm',
  secondary: 'bg-bg-subtle text-text-primary hover:bg-border-subtle',
  outline: 'border border-border-base text-text-primary hover:bg-bg-subtle',
  ghost: 'text-text-primary hover:bg-bg-subtle',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-border-focus disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

export function Button({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const combinedClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if (asChild && isValidElement(children)) {
    const childElement = children as ReactElement<{ className?: string }>
    return cloneElement(childElement, {
      className: cn(combinedClassName, childElement.props.className),
      ...props,
    })
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}
