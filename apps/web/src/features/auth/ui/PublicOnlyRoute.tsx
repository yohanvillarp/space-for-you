import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { appwriteAccount, hasSessionHint, setSessionHint } from '@/shared/api'
import { ROUTES } from '@/shared/config'

interface PublicOnlyRouteProps {
  children: ReactNode
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  // If the browser already knows an active session exists, start in checking state.
  // If no session hint exists, render immediately for guests without layout lag.
  const [isChecking, setIsChecking] = useState(() => hasSessionHint())
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    async function checkGuest() {
      try {
        await appwriteAccount.get()
        if (isMounted) {
          setSessionHint(true)
          navigate(ROUTES.DASHBOARD, { replace: true })
        }
      } catch {
        if (isMounted) {
          setSessionHint(false)
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
      <div className="animate-fade-in flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="border-primary/20 border-t-primary h-8 w-8 animate-spin rounded-full border-2" />
        <p className="font-heading text-text-secondary text-sm italic">
          Entering your sanctuary...
        </p>
      </div>
    )
  }

  return <>{children}</>
}
