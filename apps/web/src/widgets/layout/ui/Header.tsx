import { ThemeToggle } from '@/features'
import { Container } from '@/shared/ui'
import { Logo } from './Logo.tsx'

export function Header() {
  return (
    <header className="border-b border-border-base bg-bg-surface sticky top-0 z-40">
      <Container className="h-16 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-3">
          <ThemeToggle variant="segmented" size="sm" />
        </div>
      </Container>
    </header>
  )
}
