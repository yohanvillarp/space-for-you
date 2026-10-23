import { Link } from 'react-router'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui'
import { SpacesWorkshop } from './SpacesWorkshop.tsx'

export function HeroSection() {
  return (
    <section className="py-10 sm:py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
        {/* Editorial Text Column */}
        <div className="space-y-6 text-left sm:space-y-7 lg:col-span-5">
          <h1 className="font-heading text-text-primary max-w-md text-4xl leading-[1.12] font-normal tracking-tight sm:text-5xl sm:font-medium lg:text-[3.25rem] xl:text-[3.75rem]">
            A little space.
            <br />
            <span className="text-primary font-normal italic">
              Just for them.
            </span>
          </h1>

          <p className="text-text-secondary max-w-md font-sans text-base leading-relaxed sm:text-lg">
            Create a personal digital space that feels like someone you care
            about.
          </p>

          <div className="flex flex-col items-stretch gap-3.5 pt-1 sm:flex-row sm:items-center">
            <Button
              asChild
              variant="primary"
              size="lg"
              className="justify-center"
            >
              <Link to={ROUTES.DASHBOARD}>Create a space</Link>
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

        {/* Miniature Digital Spaces Composition Column */}
        <div className="lg:col-span-7">
          <SpacesWorkshop />
        </div>
      </div>
    </section>
  )
}
