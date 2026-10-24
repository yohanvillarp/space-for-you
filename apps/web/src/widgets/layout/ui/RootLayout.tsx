import { useEffect } from 'react'
import { Outlet, useLocation, ScrollRestoration } from 'react-router'
import { ROUTES } from '@/shared/config'
import { Header } from './Header'
import { Footer } from './Footer'

export function RootLayout() {
  const location = useLocation()

  // Reset scroll to top upon navigating to a new route
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  // Authenticated workspaces, creation flows, distraction-free auth, and public shared spaces
  // do not render the public marketing Header & Footer.
  const isStandaloneView =
    location.pathname === ROUTES.AUTH ||
    location.pathname === ROUTES.AUTH_SUCCESS ||
    location.pathname === ROUTES.AUTH_FAILURE ||
    location.pathname === ROUTES.DASHBOARD ||
    location.pathname.startsWith('/spaces') ||
    location.pathname.startsWith('/s/')

  if (isStandaloneView) {
    return (
      <div className="bg-bg-base text-text-primary flex min-h-screen flex-col">
        <ScrollRestoration />
        <Outlet />
      </div>
    )
  }

  return (
    <div className="bg-bg-base text-text-primary flex min-h-screen flex-col">
      <ScrollRestoration />
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
