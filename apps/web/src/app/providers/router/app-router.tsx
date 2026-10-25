import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/widgets/layout'
import {
  HomePage,
  NotFoundPage,
  AuthPage,
  AuthSuccessPage,
  AuthFailurePage,
  DashboardPage,
  ExamplesPage,
  HowItWorksPage,
  PrivacyPage,
  AttributionsPage,
  NewSpacePage,
  EditSpacePage,
  PublicSpacePage,
  SpaceStagePreviewPage,
  SpaceStudioPage,
} from '@/pages'
import { ROUTES } from '@/shared/config'

export const appRouter = createBrowserRouter([
  // Fullscreen Unified Spatial Studio
  {
    path: ROUTES.STUDIO,
    element: <SpaceStudioPage />,
  },
  // Backward compatibility: redirect /spaces/preview/:templateId to /spaces/studio?template=:templateId
  {
    path: ROUTES.STAGE_PREVIEW,
    element: <SpaceStagePreviewPage />,
  },
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
        path: ROUTES.EXAMPLES,
        element: <ExamplesPage />,
      },
      {
        path: ROUTES.HOW_IT_WORKS,
        element: <HowItWorksPage />,
      },
      {
        path: ROUTES.PRIVACY,
        element: <PrivacyPage />,
      },
      {
        path: ROUTES.ATTRIBUTIONS,
        element: <AttributionsPage />,
      },
      {
        path: ROUTES.NEW_SPACE,
        element: <NewSpacePage />,
      },
      {
        path: ROUTES.EDIT_SPACE,
        element: <EditSpacePage />,
      },
      {
        path: ROUTES.PUBLIC_SPACE,
        element: <PublicSpacePage />,
      },
      {
        path: '/spaces/:slug',
        element: <PublicSpacePage />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
])
