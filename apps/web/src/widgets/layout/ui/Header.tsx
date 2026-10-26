import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import {
  Menu,
  X,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Heart,
  ArrowRight,
} from 'lucide-react'
import { getCurrentUser } from '@/shared/api'
import { ROUTES, MAIN_NAV_ITEMS } from '@/shared/config'
import { Container, Button, Logo } from '@/shared/ui'
import { cn } from '@/shared/lib'

const GITHUB_REPO_URL = 'https://github.com/yohanvillarp/space-for-you'

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('h-4 w-4 fill-current', className)}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    getCurrentUser()
      .then((user) => {
        if (isMounted) setIsAuthenticated(Boolean(user))
      })
      .catch(() => {})
    return () => {
      isMounted = false
    }
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [prevPathname, setPrevPathname] = useState(location.pathname)
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
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
      case ROUTES.ATTRIBUTIONS:
        return <Heart className="text-accent h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'border-border-base/80 bg-bg-surface/90 border-b shadow-sm backdrop-blur-xl'
          : 'border-border-base/40 bg-bg-surface/70 border-b backdrop-blur-md',
      )}
    >
      <Container className="relative flex h-16 items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex shrink-0 items-center">
          <Logo />
        </div>

        {/* Center: Balanced Glassmorphic Navigation Pill */}
        <nav
          aria-label="Primary navigation"
          className="border-border-base/60 bg-bg-subtle/60 absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border p-1 shadow-xs backdrop-blur-md md:flex"
        >
          {MAIN_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'relative rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all duration-200 select-none',
                  isActive
                    ? 'border-border-base/80 bg-bg-surface text-text-primary border shadow-xs'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface/40 border border-transparent',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: GitHub Link + Divider + Primary CTA & Mobile Toggle */}
        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Space For You on GitHub"
            title="GitHub Repository"
            className="text-text-secondary hover:text-text-primary hover:bg-bg-subtle border-border-base/50 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:border-white/20"
          >
            <GitHubMark />
          </a>

          {location.pathname !== ROUTES.AUTH &&
            location.pathname !== ROUTES.DASHBOARD && (
              <>
                <span
                  className="bg-border-base/60 hidden h-4 w-px sm:block"
                  aria-hidden="true"
                />
                <Button
                  asChild
                  variant="primary"
                  size="sm"
                  className="hidden rounded-full px-4 shadow-xs transition-transform hover:scale-[1.02] active:scale-[0.98] sm:inline-flex"
                >
                  <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH}>
                    {isAuthenticated ? 'Dashboard' : 'Sign in'}
                  </Link>
                </Button>
              </>
            )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="text-text-secondary hover:text-text-primary hover:bg-bg-subtle border-border-base/50 focus-visible:ring-primary/30 relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 md:hidden"
          >
            <div className="relative h-4.5 w-4.5">
              <span
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-all duration-200',
                  mobileMenuOpen
                    ? 'scale-100 rotate-90 opacity-100'
                    : 'pointer-events-none scale-75 rotate-0 opacity-0',
                )}
              >
                <X className="h-4.5 w-4.5" />
              </span>
              <span
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-all duration-200',
                  !mobileMenuOpen
                    ? 'scale-100 rotate-0 opacity-100'
                    : 'pointer-events-none scale-75 -rotate-90 opacity-0',
                )}
              >
                <Menu className="h-4.5 w-4.5" />
              </span>
            </div>
          </button>
        </div>
      </Container>

      {/* Mobile Animated Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="border-border-base/80 bg-bg-surface/95 animate-slide-down border-b shadow-lg backdrop-blur-xl md:hidden">
          <div className="space-y-4 px-4 py-5">
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
