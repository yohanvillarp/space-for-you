import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/widgets/layout'
import { HomePage, NotFoundPage } from '@/pages'
import { ROUTES } from '@/shared/config'

export const appRouter = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
])
