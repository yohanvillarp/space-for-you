import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useSession } from '@/entities/session'
import { getSafeAuthReturnPath } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { GiftLoader } from '@/shared/ui'

interface PublicOnlyRouteProps {
  children: ReactNode
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { isAuthenticated, isLoading } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const returnPath = getSafeAuthReturnPath(ROUTES.DASHBOARD)
      navigate(returnPath, { replace: true })
    }
  }, [isLoading, isAuthenticated, navigate])

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center">
        <GiftLoader
          label="Opening your spaces..."
          hint="Opening your personalized spaces."
        />
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
}
