import {
  Camera,
  Music,
  Sparkles,
  Database,
  Type,
  ExternalLink,
  Heart,
} from 'lucide-react'
import { Container, Card, Badge } from '@/shared/ui'

interface AttributionResource {
  name: string
  role: string
  category: string
  description: string
  url: string
  icon: typeof Camera
  license: string
}

const ATTRIBUTIONS: AttributionResource[] = [
  {
    name: 'Pexels & Unsplash',
    role: 'Intimate Keepsake Photography',
    category: 'Photography API',
    description:
      'Warm, emotional imagery generously contributed by global creators under open commercial and editorial licenses for celebration backdrops.',
    url: 'https://www.pexels.com',
    icon: Camera,
    license: 'Free to use license',
  },
  {
    name: 'Apple iTunes Search API',
    role: 'Acoustic & Melodic Previews',
    category: 'Audio Service',
    description:
      'Ambient piano, music box melodies, and festive soundtrack previews powered by the Apple Music search and metadata catalog.',
    url: 'https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/',
    icon: Music,
    license: '30s promotional previews',
  },
  {
    name: 'Lucide & Iconify',
    role: 'Vector Stickers & Interface Iconography',
    category: 'Open Assets',
    description:
      'Clean interface icons and open-source festive vector illustrations curated from the vibrant open-source Lucide and Iconify communities.',
    url: 'https://lucide.dev',
    icon: Sparkles,
    license: 'ISC & MIT License',
  },
  {
    name: 'Appwrite Cloud',
    role: 'Secure Backend & Cloud Storage',
    category: 'Infrastructure',
    description:
      'Private authentication sessions and developer-tier object storage for safely preserving personal keepsakes and memory archives.',
    url: 'https://appwrite.io',
    icon: Database,
    license: 'Open-source platform',
  },
  {
    name: 'Google Fonts',
    role: 'Editorial Typography (Lora & DM Sans)',
    category: 'Typography',
    description:
      'Harmonious type design combining Lora for intimate, literary headings and DM Sans for clear, contemporary user interface text.',
    url: 'https://fonts.google.com',
    icon: Type,
    license: 'Open Font License (OFL)',
  },
]

export function AttributionsPage() {
  return (
    <div className="animate-fade-in py-12 sm:py-20">
      <Container className="max-w-5xl space-y-12">
        {/* Editorial Header */}
        <div className="space-y-4 text-center">
          <Badge variant="accent" className="font-sans text-xs">
            Open Web & Grateful Craft
          </Badge>
          <h1 className="font-heading text-text-primary text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Attributions & Open Resources
          </h1>
          <p className="text-text-secondary mx-auto max-w-xl font-sans text-sm leading-relaxed sm:text-base">
            Space for You is shaped by open-source tooling, royalty-free
            creative catalogs, and generous developer APIs. We warmly
            acknowledge and honor these digital foundations.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ATTRIBUTIONS.map((item) => {
            const Icon = item.icon
            return (
              <Card
                key={item.name}
                className="bg-bg-surface border-border-base/80 hover:border-accent/40 flex flex-col justify-between p-6 transition-all duration-200 sm:p-7"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-accent/10 text-accent flex h-10 w-10 items-center justify-center rounded-xl">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-text-muted font-sans text-[11px] font-medium tracking-wider uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-heading text-text-primary text-lg font-medium">
                      {item.name}
                    </h2>
                    <p className="text-accent font-sans text-xs font-medium">
                      {item.role}
                    </p>
                  </div>

                  <p className="text-text-secondary font-sans text-xs leading-relaxed sm:text-sm">
                    {item.description}
                  </p>
                </div>

                <div className="border-border-base/60 mt-6 flex items-center justify-between border-t pt-4">
                  <span className="text-text-muted font-sans text-[11px]">
                    {item.license}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover inline-flex items-center gap-1.5 font-sans text-xs font-medium transition-colors"
                  >
                    <span>Visit provider</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Closing Editorial Disclaimer */}
        <Card className="bg-bg-surface/60 border-border-base/70 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
            <div className="bg-accent/10 text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <Heart className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-text-primary text-sm font-medium">
                Intellectual Property & Creator Recognition
              </h3>
              <p className="text-text-muted font-sans text-xs leading-relaxed">
                All trademarks, product names, previews, and creative assets
                remain the exclusive property of their respective owners. Space
                for You is an independent sanctuary crafted with deep respect
                for the creative commons and open developer ecosystem.
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )
}
