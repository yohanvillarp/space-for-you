import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { AlertModal } from './AlertModal'
import { ConfirmContext } from './confirm-context'
import type { ConfirmOptions } from './alert-modal.types'

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    options: ConfirmOptions
    resolve: ((value: boolean) => void) | null
  }>({
    isOpen: false,
    options: { title: '' },
    resolve: null,
  })

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        options,
        resolve,
      })
    })
  }, [])

  const handleClose = useCallback(() => {
    modalState.resolve?.(false)
    setModalState((prev) => ({ ...prev, isOpen: false, resolve: null }))
  }, [modalState])

  const handleConfirm = useCallback(() => {
    modalState.resolve?.(true)
    setModalState((prev) => ({ ...prev, isOpen: false, resolve: null }))
  }, [modalState])

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <AlertModal
        isOpen={modalState.isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={modalState.options.title}
        description={modalState.options.description}
        confirmText={modalState.options.confirmText}
        cancelText={modalState.options.cancelText}
        type={modalState.options.type}
        icon={modalState.options.icon}
        showCancel={modalState.options.showCancel}
      />
    </ConfirmContext.Provider>
  )
}
