import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { appwriteAccount } from '@/shared/api'
import type { AppwriteUser } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { GiftLoader } from '@/shared/ui'

interface ProtectedRouteProps {
  children: (user: AppwriteUser) => ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<AppwriteUser | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    async function checkAuth() {
      try {
        const currentUser = await appwriteAccount.get()
        if (isMounted) {
          setUser(currentUser)
          setIsChecking(false)
        }
      } catch {
        if (isMounted) {
          try {
            const current = window.location.pathname + window.location.search
            if (current && current !== ROUTES.AUTH) {
              sessionStorage.setItem('sfy_auth_return', current)
            }
          } catch {
            // ignore storage error
          }
          navigate(ROUTES.AUTH, { replace: true })
        }
      }
    }

    void checkAuth()

    return () => {
      isMounted = false
    }
  }, [navigate])

  if (isChecking) {
    return (
      <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center">
        <GiftLoader
          label="Opening your spaces..."
          hint="Gathering your spaces and cherished memories."
        />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children(user)}</>
}
