import { Container } from '@/shared/ui'
import { PublicOnlyRoute } from '@/features'
import { HeroSection } from './HeroSection.tsx'

export function HomePage() {
  return (
    <PublicOnlyRoute>
      <section className="flex flex-1 flex-col justify-center">
        <Container>
          <HeroSection />
        </Container>
      </section>
    </PublicOnlyRoute>
  )
}
