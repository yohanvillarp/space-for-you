import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { appwriteAccount, hasSessionHint, setSessionHint } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { GiftLoader } from '@/shared/ui'

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
      <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center">
        <GiftLoader
          label="Entering your sanctuary..."
          hint="Opening the doors to your digital workshop."
        />
      </div>
    )
  }

  return <>{children}</>
}
