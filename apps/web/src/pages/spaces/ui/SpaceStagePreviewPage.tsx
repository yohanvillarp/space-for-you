import { Navigate } from 'react-router'
import { ROUTES } from '@/shared/config'

export function SpaceStagePreviewPage() {
  return <Navigate to={ROUTES.DASHBOARD} replace />
}
