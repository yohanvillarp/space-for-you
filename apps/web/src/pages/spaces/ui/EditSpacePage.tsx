import { Link, useParams } from 'react-router'
import { ProtectedRoute } from '@/features'
import { ROUTES } from '@/shared/config'
import { Container, Card, Button, Badge } from '@/shared/ui'
import { ArrowLeft, Settings } from 'lucide-react'

export function EditSpacePage() {
  const { id } = useParams<{ id: string }>()

  return (
    <ProtectedRoute>
      {() => (
        <div className="animate-fade-in py-8 sm:py-16">
          <Container className="max-w-3xl space-y-8">
            <Link
              to={ROUTES.DASHBOARD}
              className="group text-text-secondary hover:text-text-primary inline-flex items-center gap-2 font-sans text-xs transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="space-y-2">
              <Badge variant="outline" className="font-sans text-xs">
                Editor • Space #{id || '—'}
              </Badge>
              <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
                Edit Space
              </h1>
              <p className="text-text-secondary font-sans text-sm leading-relaxed">
                Add, reorder, and update memories, notes, and atmospheric
                styling.
              </p>
            </div>

            <Card className="border-border-base bg-bg-surface/60 space-y-4 border-2 border-dashed p-8 text-center sm:p-12">
              <div className="bg-secondary/30 text-text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-2xl">
                <Settings className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h2 className="font-heading text-text-primary text-xl font-medium">
                  Space Editor Canvas
                </h2>
                <p className="text-text-muted mx-auto max-w-sm font-sans text-xs sm:text-sm">
                  Block management, live previews, and privacy access controls
                  will be managed here.
                </p>
              </div>
              <div className="pt-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={ROUTES.DASHBOARD}>Return to Dashboard</Link>
                </Button>
              </div>
            </Card>
          </Container>
        </div>
      )}
    </ProtectedRoute>
  )
}
