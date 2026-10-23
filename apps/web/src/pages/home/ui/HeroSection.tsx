import { Button } from '@/shared/ui'
import { SpacesWorkshop } from './SpacesWorkshop.tsx'

export function HeroSection() {
  return (
    <section className="py-10 sm:py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center">
        {/* Editorial Text Column */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-7 text-left">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-normal sm:font-medium tracking-tight text-text-primary leading-[1.12] max-w-md">
            A little space.
            <br />
            <span className="italic font-normal text-primary">Just for them.</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-md">
            Create a personal digital space that feels like someone you care about.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
            <Button variant="primary" size="lg" className="justify-center">
              Create a space
            </Button>
            <Button variant="outline" size="lg" className="justify-center">
              Explore examples
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
