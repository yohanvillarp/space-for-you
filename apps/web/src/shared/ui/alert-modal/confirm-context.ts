import { createContext } from 'react'
import type { ConfirmOptions } from './alert-modal.types'

export interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

export const ConfirmContext = createContext<ConfirmContextType | null>(null)
