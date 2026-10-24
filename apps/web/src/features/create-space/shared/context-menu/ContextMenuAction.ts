import type { ReactNode } from 'react'

export type ContextMenuVariant = 'default' | 'danger' | 'accent'

export interface ContextMenuActionParams {
  id: string
  label: string
  icon: ReactNode
  handler: () => void
  disabled?: boolean
  variant?: ContextMenuVariant
}

/**
 * Encapsulates a single context menu action item using OOP.
 */
export class ContextMenuAction {
  public readonly id: string
  public readonly label: string
  public readonly icon: ReactNode
  public readonly handler: () => void
  public readonly disabled: boolean
  public readonly variant: ContextMenuVariant

  constructor(params: ContextMenuActionParams) {
    this.id = params.id
    this.label = params.label
    this.icon = params.icon
    this.handler = params.handler
    this.disabled = params.disabled ?? false
    this.variant = params.variant ?? 'default'
  }
}

/**
 * Encapsulates a grouped section of context menu actions with an optional header.
 */
export class ContextMenuSection {
  public readonly id: string
  public readonly actions: ContextMenuAction[]
  public readonly title?: string

  constructor(id: string, actions: ContextMenuAction[], title?: string) {
    this.id = id
    this.actions = actions
    this.title = title
  }
}
