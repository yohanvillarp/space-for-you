import { Container } from '@/shared/ui'
import { usePageSeo } from '@/shared/lib'
import { PublicOnlyRoute } from '@/features'
import { HeroSection } from './HeroSection.tsx'
import { HomeSanctuaryPillars } from './HomeSanctuaryPillars.tsx'

export function HomePage() {
  usePageSeo({
    canonicalPath: '/',
  })

  return (
    <PublicOnlyRoute>
      <section className="flex flex-1 flex-col justify-center">
        <Container className="divide-border-base/50 divide-y">
          <HeroSection />
          <HomeSanctuaryPillars />
        </Container>
      </section>
    </PublicOnlyRoute>
  )
}
