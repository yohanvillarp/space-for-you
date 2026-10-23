import type { ReactNode } from 'react'

export interface BaseProps {
  className?: string
}

export interface PropsWithChildrenOnly {
  children?: ReactNode
}

export interface PropsWithClassNameAndChildren extends BaseProps, PropsWithChildrenOnly {}
