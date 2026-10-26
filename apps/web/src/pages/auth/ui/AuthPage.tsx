import type { AuthMode } from '@/features'
import { EmailAuthForm, GoogleSignInButton, PublicOnlyRoute } from '@/features'
import { ROUTES } from '@/shared/config'
import { usePageSeo } from '@/shared/lib'
import { Card, Container, Logo } from '@/shared/ui'
import { Logomark } from '@/shared/ui/logo'
import { ArrowLeft, Camera, Layers, Lock, Mail, Mic } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

const CURRENT_YEAR = new Date().getFullYear()

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signin')

  usePageSeo({
    title: mode === 'signup' ? 'Create Your Account' : 'Sign In',
    description:
      'Sign in or create an account to craft personalized interactive digital spaces with Polaroid canvases, voice recordings, and wax-sealed letters.',
    canonicalPath: '/auth',
  })

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
            {/* Left Column: Minimalist Space Preview (Desktop) */}
            <div className="animate-fade-in hidden space-y-8 lg:col-span-6 lg:block xl:col-span-7">
              <div className="space-y-3">
                <Logo markSize={36} textClassName="text-2xl font-medium" />

                <h1 className="font-heading text-text-primary max-w-lg text-3xl leading-tight font-medium tracking-tight xl:text-4xl">
                  A dedicated digital space. Created just for them.
                </h1>
                <p className="text-text-secondary max-w-md font-sans text-sm leading-relaxed xl:text-base">
                  Arrange dynamic objects on an interactive canvas, record
                  personal voice messages, seal letters, and share through a
                  private link or QR card.
                </p>
              </div>

              {/* Clean, Visual Miniature Space Card */}
              <div className="relative max-w-lg">
                <div className="from-primary/15 via-accent/10 to-arcilla/20 pointer-events-none absolute -inset-1.5 rounded-2xl bg-gradient-to-r opacity-70 blur-xl" />

                <div className="border-border-base bg-bg-surface/90 relative space-y-5 rounded-2xl border p-6 shadow-md backdrop-blur-sm">
                  {/* Minimal Header */}
                  <div className="border-border-subtle flex items-center justify-between border-b pb-3.5">
                    <div>
                      <h2 className="font-heading text-text-primary text-sm font-medium">
                        For Elena — Interactive Space
                      </h2>
                      <p className="text-text-muted font-sans text-xs">
                        2 scenes • Memory Canvas & Letters
                      </p>
                    </div>
                    <span className="text-text-muted inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-sans text-[11px]">
                      <Lock className="text-primary h-3 w-3" />
                      Passcode locked
                    </span>
                  </div>

                  {/* Visual Tabletop Trio (Polaroid + Voice Recording + Sealed Letter) */}
                  <div className="grid grid-cols-3 gap-3 py-1">
                    {/* Mini Polaroid */}
                    <div className="-rotate-2 rounded-xl border border-white/10 bg-[#FAF6F0] p-2 text-center shadow-md">
                      <div className="flex h-16 items-center justify-center rounded-md bg-gradient-to-tr from-amber-600/30 via-orange-500/20 to-amber-200/30">
                        <Camera className="h-5 w-5 text-stone-700" />
                      </div>
                      <p className="font-heading mt-1.5 truncate text-[10px] text-stone-700 italic">
                        October 14
                      </p>
                    </div>

                    {/* Mini Voice Recording Player */}
                    <div className="flex flex-col items-center justify-center rounded-xl border border-amber-500/20 bg-black/25 p-2 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300">
                        <Mic className="h-4 w-4" />
                      </div>
                      <div className="mt-2 flex items-end gap-0.5">
                        <span className="h-1.5 w-0.5 rounded-full bg-amber-400/70" />
                        <span className="h-3 w-0.5 rounded-full bg-amber-400" />
                        <span className="h-2 w-0.5 rounded-full bg-amber-400/80" />
                        <span className="h-3.5 w-0.5 rounded-full bg-amber-400" />
                        <span className="h-1.5 w-0.5 rounded-full bg-amber-400/70" />
                      </div>
                      <span className="text-text-muted mt-1 font-sans text-[10px]">
                        Voice note
                      </span>
                    </div>

                    {/* Mini Sealed Letter */}
                    <div className="flex rotate-2 flex-col items-center justify-center rounded-xl border border-rose-500/20 bg-[#241A16] p-2 text-center shadow-md">
                      <span className="bg-primary flex h-7 w-7 items-center justify-center rounded-full text-white shadow-inner">
                        <Mail className="h-3.5 w-3.5" />
                      </span>
                      <p className="font-heading mt-2 text-[10px] text-amber-100/90 italic">
                        Sealed Letter
                      </p>
                    </div>
                  </div>

                  {/* Concise Capabilities Footer */}
                  <div className="border-border-subtle flex flex-wrap items-center gap-2 border-t pt-3.5">
                    <span className="bg-bg-subtle text-text-secondary inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px]">
                      <Layers className="text-primary h-3 w-3" /> Dynamic
                      objects
                    </span>
                    <span className="bg-bg-subtle text-text-secondary inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px]">
                      <Mic className="h-3 w-3 text-amber-400" /> Voice
                      recordings
                    </span>
                    <span className="bg-bg-subtle text-text-secondary inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px]">
                      <Mail className="text-primary h-3 w-3" /> Wax-sealed
                      letters
                    </span>
                  </div>
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
                  {/* Brand mark */}
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
                        ? 'Sign up to design a personal digital space for someone special.'
                        : 'Sign in to continue crafting and managing your spaces.'}
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

                  {/* Clean privacy reassurance */}
                  <p className="text-text-muted border-border-base/50 border-t pt-4 font-sans text-[11px] leading-relaxed">
                    Your personal spaces and memories are always private.
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
