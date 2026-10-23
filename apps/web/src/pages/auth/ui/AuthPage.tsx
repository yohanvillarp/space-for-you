import { useState } from 'react'
import { Link } from 'react-router'
import {
  Sparkles,
  ShieldCheck,
  Palette,
  Lock,
  Heart,
  Music,
  MapPin,
  ArrowLeft,
} from 'lucide-react'
import { PublicOnlyRoute, GoogleSignInButton, EmailAuthForm } from '@/features'
import type { AuthMode } from '@/features'
import { Card, Container, Badge, Logo } from '@/shared/ui'
import { Logomark } from '@/shared/ui/logo'
import { ROUTES } from '@/shared/config'

const CURRENT_YEAR = new Date().getFullYear()

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signin')

  return (
    <PublicOnlyRoute>
      <div className="flex min-h-screen flex-col justify-between px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Distraction-Free Bar */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between pb-4">
          <Link
            to={ROUTES.HOME}
            className="group text-text-secondary hover:text-text-primary inline-flex items-center gap-2 font-sans text-xs font-medium transition-colors sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>
        </div>

        {/* Main 2-Column Responsive Body */}
        <Container className="mx-auto my-auto w-full max-w-6xl py-4 sm:py-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center xl:gap-16">
            {/* Left Column: Intimate Showcase (Desktop) */}
            <div className="animate-fade-in hidden space-y-8 lg:col-span-6 lg:block xl:col-span-7">
              {/* Brand Identity & Tagline */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2.5">
                  <Logo markSize={36} textClassName="text-2xl font-medium" />
                  <Badge variant="accent" className="font-sans text-[11px]">
                    Private & Personal
                  </Badge>
                </div>

                <h1 className="font-heading text-text-primary text-3xl leading-tight font-medium tracking-tight xl:text-4xl">
                  A personal sanctuary. Created just for them.
                </h1>
                <p className="text-text-secondary max-w-lg font-sans text-sm leading-relaxed xl:text-base">
                  Craft an intimate space to hold letters, photographs, music,
                  and quiet memories that outlast social feeds.
                </p>
              </div>

              {/* Miniature Space Preview Card */}
              <div className="group relative max-w-lg">
                {/* Ambient glow */}
                <div className="from-primary/15 via-accent/15 to-arcilla/25 absolute -inset-1.5 rounded-2xl bg-gradient-to-r opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="border-border-base bg-bg-surface/90 relative rounded-2xl border p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                  {/* Space mini header */}
                  <div className="border-border-subtle flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary font-heading flex h-10 w-10 items-center justify-center rounded-full text-base font-medium">
                        S
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="font-heading text-text-primary text-sm font-semibold">
                            For Sophia — Our Little Corner
                          </h2>
                          <Heart className="fill-primary text-primary h-3.5 w-3.5" />
                        </div>
                        <p className="text-text-muted font-sans text-xs">
                          Curated with care • Since 2022
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      Private Space
                    </Badge>
                  </div>

                  {/* Letter snippet */}
                  <div className="py-4">
                    <p className="font-heading text-text-secondary text-xs leading-relaxed italic xl:text-sm">
                      “Some memories don’t belong on public feeds, but in the
                      quiet warmth of those who lived them. This little space is
                      just for you.”
                    </p>
                  </div>

                  {/* Tactile memory pills */}
                  <div className="border-border-subtle flex flex-wrap items-center gap-2 border-t pt-2">
                    <span className="bg-bg-subtle text-text-secondary inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px]">
                      <Music className="text-primary h-3 w-3" /> Our favorite
                      song
                    </span>
                    <span className="bg-bg-subtle text-text-secondary inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px]">
                      <MapPin className="text-accent h-3 w-3" /> Paris & Lima
                    </span>
                    <span className="bg-bg-subtle text-text-secondary inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px]">
                      <Sparkles className="text-primary h-3 w-3" /> 12 saved
                      letters
                    </span>
                  </div>
                </div>
              </div>

              {/* Three Value Pillars (Zero Dev Jargon) */}
              <div className="grid max-w-lg grid-cols-3 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="text-text-primary flex items-center gap-1.5 font-sans text-xs font-semibold">
                    <Lock className="text-primary h-3.5 w-3.5" /> Total Privacy
                  </div>
                  <p className="text-text-muted font-sans text-[11px] leading-snug">
                    Only you and your chosen person have access.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="text-text-primary flex items-center gap-1.5 font-sans text-xs font-semibold">
                    <Palette className="text-accent h-3.5 w-3.5" /> Artisan
                    Touch
                  </div>
                  <p className="text-text-muted font-sans text-[11px] leading-snug">
                    Handcrafted to feel calm and enduring.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="text-text-primary flex items-center gap-1.5 font-sans text-xs font-semibold">
                    <ShieldCheck className="text-primary h-3.5 w-3.5" />{' '}
                    End-to-End
                  </div>
                  <p className="text-text-muted font-sans text-[11px] leading-snug">
                    No feeds, no ads, no public algorithms.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Authentication Form Card */}
            <div className="animate-slide-up mx-auto w-full max-w-md sm:max-w-lg lg:col-span-6 lg:max-w-none xl:col-span-5">
              {/* Mobile-only brand logo */}
              <div className="mb-6 flex justify-center lg:hidden">
                <Logo markSize={32} />
              </div>

              <Card className="border-border-base/80 p-6 shadow-md backdrop-blur-xs sm:p-8 xl:p-10">
                <div className="space-y-6 text-center">
                  {/* Brand mark badge with subtle micro-hover */}
                  <div className="group relative mx-auto inline-flex items-center justify-center">
                    <div className="bg-primary/20 absolute -inset-1 rounded-2xl opacity-50 blur-md transition-opacity group-hover:opacity-100" />
                    <div className="bg-primary/10 text-primary relative flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105">
                      <Logomark className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Dynamic Headings */}
                  <div className="space-y-1.5">
                    <h2 className="font-heading text-text-primary text-2xl font-medium tracking-tight sm:text-3xl">
                      {mode === 'signup' ? 'Create your space' : 'Welcome back'}
                    </h2>
                    <p className="text-text-secondary mx-auto max-w-xs font-sans text-xs leading-relaxed sm:text-sm">
                      {mode === 'signup'
                        ? 'Sign up to design an intimate digital space for someone special.'
                        : 'Sign in to continue cultivating your personal spaces.'}
                    </p>
                  </div>

                  {/* Quick Google OAuth Option */}
                  <div className="pt-1">
                    <GoogleSignInButton />
                  </div>

                  {/* Editorial Divider */}
                  <div className="relative my-4 flex items-center justify-center">
                    <div className="border-border-base/70 w-full border-t" />
                    <span className="bg-bg-surface text-text-muted shrink-0 px-3 font-sans text-xs">
                      or with your email
                    </span>
                  </div>

                  {/* Email & Password Authentication Form */}
                  <EmailAuthForm initialMode={mode} onModeChange={setMode} />

                  {/* Clean privacy reassurance (No dev jargon) */}
                  <p className="text-text-muted border-border-base/50 border-t pt-4 font-sans text-[11px] leading-relaxed">
                    Your personal spaces and memories are always private and
                    encrypted.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>

        {/* Minimal Bottom Bar */}
        <div className="text-text-muted mx-auto w-full max-w-6xl py-2 text-center font-sans text-xs">
          <span>
            &copy; {CURRENT_YEAR} Space For You. All spaces are private.
          </span>
        </div>
      </div>
    </PublicOnlyRoute>
  )
}
