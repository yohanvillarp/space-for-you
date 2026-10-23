import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/widgets/layout'
import {
  HomePage,
  NotFoundPage,
  AuthPage,
  AuthSuccessPage,
  AuthFailurePage,
  DashboardPage,
} from '@/pages'
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
        path: ROUTES.AUTH,
        element: <AuthPage />,
      },
      {
        path: ROUTES.AUTH_SUCCESS,
        element: <AuthSuccessPage />,
      },
      {
        path: ROUTES.AUTH_FAILURE,
        element: <AuthFailurePage />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
])
