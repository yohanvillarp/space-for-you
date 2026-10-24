import { Link } from 'react-router'
import { ROUTES } from '@/shared/config'
import { Container } from '@/shared/ui'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-border-base bg-bg-surface mt-auto border-t py-6">
      <Container className="text-text-muted flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
        <p>&copy; {CURRENT_YEAR} Space For You. All rights reserved.</p>

        <nav className="flex items-center gap-6 font-sans">
          <Link
            to={ROUTES.EXAMPLES}
            className="hover:text-text-primary transition-colors"
          >
            Examples
          </Link>
          <Link
            to={ROUTES.HOW_IT_WORKS}
            className="hover:text-text-primary transition-colors"
          >
            How it works
          </Link>
          <Link
            to={ROUTES.PRIVACY}
            className="hover:text-text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            to={ROUTES.ATTRIBUTIONS}
            className="hover:text-text-primary transition-colors"
          >
            Attributions
          </Link>
        </nav>
      </Container>
    </footer>
  )
}
