import { Container } from '@/shared/ui'
import { HeroSection } from './HeroSection.tsx'

export function HomePage() {
  return (
    <section className="flex-1 flex flex-col justify-center">
      <Container>
        <HeroSection />
      </Container>
    </section>
  )
}
