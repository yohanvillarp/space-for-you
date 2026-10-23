import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@/shared/lib'
import { appRouter } from './router'

export function AppProviders() {
  return (
    <ThemeProvider defaultTheme="system">
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  )
}
