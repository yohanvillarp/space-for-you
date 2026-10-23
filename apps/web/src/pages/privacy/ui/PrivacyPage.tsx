import { Container, Card, Badge } from '@/shared/ui'

export function PrivacyPage() {
  const commitments = [
    {
      title: 'No Public Feeds or Search Indexing',
      description:
        'Your spaces are never indexed on search engines or published to public discovery feeds without explicit permission.',
    },
    {
      title: 'Zero Tracking & Ad-Free Forever',
      description:
        'We do not sell personal data, display intrusive advertisements, or track user browsing behavior.',
    },
    {
      title: 'Encrypted Personal Keepsakes',
      description:
        'All memories, notes, and photos are encrypted and accessible only through your authenticated session or private link.',
    },
  ]

  return (
    <div className="animate-fade-in py-12 sm:py-20">
      <Container className="max-w-4xl space-y-12">
        <div className="space-y-3 text-center">
          <Badge variant="accent" className="font-sans text-xs">
            Our Promise
          </Badge>
          <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Privacy & The Sacred Space
          </h1>
          <p className="text-text-secondary mx-auto max-w-lg font-sans text-sm leading-relaxed sm:text-base">
            We believe some memories should remain strictly between the people
            who created them.
          </p>
        </div>

        <div className="space-y-4">
          {commitments.map((item) => (
            <Card
              key={item.title}
              className="bg-bg-surface border-border-base/80 p-6 sm:p-8"
            >
              <h2 className="font-heading text-text-primary mb-2 text-lg font-medium">
                {item.title}
              </h2>
              <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}
