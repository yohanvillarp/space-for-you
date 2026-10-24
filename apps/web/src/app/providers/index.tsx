import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@/shared/lib'
import { ConfirmProvider } from '@/shared/ui'
import { appRouter } from './router'

export function AppProviders() {
  return (
    <ThemeProvider defaultTheme="system">
      <ConfirmProvider>
        <RouterProvider router={appRouter} />
      </ConfirmProvider>
    </ThemeProvider>
  )
}
