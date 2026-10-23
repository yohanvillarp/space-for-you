import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ThemeToggle } from '@/features'
import { getCurrentUser } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { Container, Button } from '@/shared/ui'
import { Logo } from './Logo.tsx'

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let isMounted = true

    async function checkAuth() {
      const user = await getCurrentUser()
      if (isMounted) {
        setIsAuthenticated(Boolean(user))
      }
    }

    void checkAuth()

    return () => {
      isMounted = false
    }
  }, [location.pathname])

  return (
    <header className="border-border-base bg-bg-surface sticky top-0 z-40 border-b">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <div className="flex items-center gap-3">
          <ThemeToggle variant="segmented" size="sm" />

          {location.pathname !== ROUTES.AUTH &&
            location.pathname !== ROUTES.DASHBOARD && (
              <Button
                asChild
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH}>
                  {isAuthenticated ? 'Dashboard' : 'Sign in'}
                </Link>
              </Button>
            )}
        </div>
      </Container>
    </header>
  )
}
