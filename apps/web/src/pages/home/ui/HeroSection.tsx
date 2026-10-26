import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui'
import { HeroVideoShowcase } from './HeroVideoShowcase.tsx'

export function HeroSection() {
  return (
    <section className="flex min-h-[calc(100dvh-65px)] flex-col justify-center py-8 sm:py-12">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        {/* Editorial Text Column */}
        <div className="space-y-6 text-left lg:col-span-5">
          <h1 className="font-heading text-text-primary max-w-md text-4xl leading-[1.12] font-normal tracking-tight sm:text-5xl sm:font-medium lg:text-[3.1rem] xl:text-[3.5rem]">
            A little space.
            <br />
            <span className="text-primary font-normal italic">
              Just for them.
            </span>
          </h1>

          <p className="text-text-secondary max-w-md font-sans text-sm leading-relaxed sm:text-base">
            Create a personal digital space with an interactive canvas, voice
            recordings, Polaroid photographs, wax-sealed letters, and a secret
            vault that opens only for them.
          </p>

          <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center">
            <Button
              asChild
              variant="primary"
              size="lg"
              className="justify-center gap-2"
            >
              <Link to={ROUTES.DASHBOARD}>
                <span>Create a space</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="justify-center"
            >
              <Link to={ROUTES.EXAMPLES}>Explore examples</Link>
            </Button>
          </div>
        </div>

        {/* YouTube Video Column */}
        <div className="lg:col-span-7">
          <HeroVideoShowcase />
        </div>
      </div>
    </section>
  )
}
