import { Container, Card, Badge } from '@/shared/ui'

export function ExamplesPage() {
  return (
    <div className="animate-fade-in py-12 sm:py-20">
      <Container className="max-w-5xl space-y-10">
        <div className="space-y-3 text-center">
          <Badge variant="accent" className="font-sans text-xs">
            Inspiration Gallery
          </Badge>
          <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Curated Spaces & Inspiration
          </h1>
          <p className="text-text-secondary mx-auto max-w-xl font-sans text-sm leading-relaxed sm:text-base">
            Discover how others have crafted heartfelt sanctuaries for
            anniversaries, birthdays, long-distance relationships, and everyday
            gratitude.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            'Anniversary Corner',
            'Long Distance Sanctuary',
            'Birthday Keepsake',
          ].map((title, idx) => (
            <Card
              key={title}
              className="border-border-base/70 bg-bg-surface/50 flex min-h-[220px] flex-col items-center justify-center space-y-4 border-2 border-dashed p-6 text-center"
            >
              <div className="bg-primary/10 text-primary font-heading flex h-10 w-10 items-center justify-center rounded-full font-medium">
                0{idx + 1}
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-text-primary text-lg font-medium">
                  {title}
                </h3>
                <p className="text-text-muted font-sans text-xs">
                  Sample space showcase coming soon.
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}
