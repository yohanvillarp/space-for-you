import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { appwriteAccount } from '@/shared/api'
import { ROUTES } from '@/shared/config'

interface PublicOnlyRouteProps {
  children: ReactNode
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const [isChecking, setIsChecking] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    async function checkGuest() {
      try {
        await appwriteAccount.get()
        if (isMounted) {
          navigate(ROUTES.DASHBOARD, { replace: true })
        }
      } catch {
        if (isMounted) {
          setIsChecking(false)
        }
      }
    }

    void checkGuest()

    return () => {
      isMounted = false
    }
  }, [navigate])

  if (isChecking) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <div className="border-primary/30 border-t-primary h-8 w-8 animate-spin rounded-full border-2" />
        <p className="text-text-secondary font-sans text-sm">
          Checking authentication...
        </p>
      </div>
    )
  }

  return <>{children}</>
}
