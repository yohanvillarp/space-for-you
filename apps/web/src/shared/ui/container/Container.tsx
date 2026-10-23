import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}
