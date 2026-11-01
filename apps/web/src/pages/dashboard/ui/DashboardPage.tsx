import { ProtectedRoute } from '@/features'
import { DashboardView } from './DashboardView.tsx'

export function DashboardPage() {
  return (
    <ProtectedRoute>{(user) => <DashboardView user={user} />}</ProtectedRoute>
  )
}
