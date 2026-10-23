import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { appwriteAccount } from '@/shared/api'
import type { AppwriteUser } from '@/shared/api'
import { ROUTES } from '@/shared/config'

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
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <div className="border-primary/30 border-t-primary h-8 w-8 animate-spin rounded-full border-2" />
        <p className="text-text-secondary font-sans text-sm">
          Verifying session...
        </p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children(user)}</>
}
