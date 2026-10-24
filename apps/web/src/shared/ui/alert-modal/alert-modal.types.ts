import type { ReactNode } from 'react'

export type AlertModalType = 'danger' | 'warning' | 'info' | 'success'

export interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void | Promise<void>
  title: string
  description?: string | ReactNode
  confirmText?: string
  cancelText?: string
  type?: AlertModalType
  icon?: ReactNode
  isLoading?: boolean
  showCancel?: boolean
  closeOnBackdropClick?: boolean
  className?: string
}

export interface ConfirmOptions {
  title: string
  description?: string | ReactNode
  confirmText?: string
  cancelText?: string
  type?: AlertModalType
  icon?: ReactNode
  showCancel?: boolean
}
