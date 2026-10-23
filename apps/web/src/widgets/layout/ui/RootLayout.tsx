import { Outlet } from 'react-router'
import { Header } from './Header.tsx'
import { Footer } from './Footer.tsx'

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary">
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
