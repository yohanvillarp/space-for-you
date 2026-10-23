import { Container } from '@/shared/ui'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border-base bg-bg-surface mt-auto py-6">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <p>&copy; {CURRENT_YEAR} Space For You. All rights reserved.</p>
      </Container>
    </footer>
  )
}
