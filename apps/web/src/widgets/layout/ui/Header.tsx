import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import {
  Menu,
  X,
  Sparkles,
  BookOpen,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import { getCurrentUser } from '@/shared/api'
import { ROUTES, MAIN_NAV_ITEMS } from '@/shared/config'
import { Container, Button, Logo } from '@/shared/ui'
import { cn } from '@/shared/lib'

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Track auth state
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

  // Track scroll state for elevation & backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change during render
  const [prevPathname, setPrevPathname] = useState(location.pathname)
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const getNavIcon = (path: string) => {
    switch (path) {
      case ROUTES.EXAMPLES:
        return <Sparkles className="text-primary h-4 w-4" />
      case ROUTES.HOW_IT_WORKS:
        return <BookOpen className="text-accent h-4 w-4" />
      case ROUTES.PRIVACY:
        return <ShieldCheck className="text-primary h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'border-border-base/80 bg-bg-surface/90 border-b shadow-xs backdrop-blur-md'
          : 'border-border-base/40 bg-bg-surface/75 border-b backdrop-blur-sm',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Left Side: Brand Logo & Desktop Navigation */}
        <div className="flex items-center gap-8">
          <Logo />

          {/* Desktop Navigation Links with animated active pill indicator */}
          <nav className="bg-bg-subtle/50 border-border-base/40 hidden items-center gap-1.5 rounded-full border p-1 md:flex">
            {MAIN_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all duration-200 select-none',
                    isActive
                      ? 'bg-bg-surface text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface/60',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Side: Primary CTA & Mobile Hamburger Button */}
        <div className="flex items-center gap-3">
          {/* Desktop Sign In / Dashboard CTA */}
          {location.pathname !== ROUTES.AUTH &&
            location.pathname !== ROUTES.DASHBOARD && (
              <Button
                asChild
                variant="primary"
                size="sm"
                className="hidden shadow-xs transition-transform hover:scale-[1.02] active:scale-[0.98] sm:inline-flex"
              >
                <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH}>
                  {isAuthenticated ? 'Dashboard' : 'Sign in'}
                </Link>
              </Button>
            )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="text-text-secondary hover:text-text-primary hover:bg-bg-subtle border-border-base/40 focus-visible:ring-primary/30 relative flex h-10 w-10 items-center justify-center rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 md:hidden"
          >
            <div className="relative h-5 w-5">
              <span
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-all duration-200',
                  mobileMenuOpen
                    ? 'scale-100 rotate-90 opacity-100'
                    : 'pointer-events-none scale-75 rotate-0 opacity-0',
                )}
              >
                <X className="h-5 w-5" />
              </span>
              <span
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-all duration-200',
                  !mobileMenuOpen
                    ? 'scale-100 rotate-0 opacity-100'
                    : 'pointer-events-none scale-75 -rotate-90 opacity-0',
                )}
              >
                <Menu className="h-5 w-5" />
              </span>
            </div>
          </button>
        </div>
      </Container>

      {/* Mobile Animated Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="border-border-base/80 bg-bg-surface/95 animate-slide-down border-b shadow-lg backdrop-blur-xl md:hidden">
          <div className="space-y-4 px-4 py-5">
            {/* Mobile Nav Links */}
            <div className="space-y-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3.5 py-2.5 font-sans text-sm transition-all duration-200',
                      isActive
                        ? 'bg-bg-subtle text-text-primary font-medium shadow-xs'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle/50',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {getNavIcon(item.path)}
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Action Button */}
            {location.pathname !== ROUTES.AUTH &&
              location.pathname !== ROUTES.DASHBOARD && (
                <div className="border-border-subtle border-t pt-2">
                  <Button
                    asChild
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH}>
                      <span className="flex items-center gap-2">
                        {isAuthenticated ? 'Go to Dashboard' : 'Sign in'}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </div>
              )}
          </div>
        </div>
      )}
    </header>
  )
}
