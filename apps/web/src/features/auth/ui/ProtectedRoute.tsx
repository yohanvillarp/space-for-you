import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useSession } from '@/entities/session'
import type { AppwriteUser } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { GiftLoader } from '@/shared/ui'

interface ProtectedRouteProps {
  children: (user: AppwriteUser) => ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      try {
        const current = window.location.pathname + window.location.search
        if (current && current !== ROUTES.AUTH) {
          sessionStorage.setItem('sfy_auth_return', current)
        }
      } catch {
        // ignore storage access error
      }
      navigate(ROUTES.AUTH, { replace: true })
    }
  }, [isLoading, isAuthenticated, user, navigate])

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center">
        <GiftLoader
          label="Opening your spaces..."
          hint="Gathering your spaces and cherished memories."
        />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return <>{children(user)}</>
}
