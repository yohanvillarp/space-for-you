import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@/shared/lib'
import { ConfirmProvider } from '@/shared/ui'
import { SessionProvider } from '@/entities/session'
import { appRouter } from './router'

export function AppProviders() {
  return (
    <ThemeProvider defaultTheme="system">
      <ConfirmProvider>
        <SessionProvider>
          <RouterProvider router={appRouter} />
        </SessionProvider>
      </ConfirmProvider>
    </ThemeProvider>
  )
}
