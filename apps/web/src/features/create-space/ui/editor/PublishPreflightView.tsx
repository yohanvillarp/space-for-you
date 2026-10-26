import {
  CheckCircle2,
  AlertTriangle,
  Lock,
  CalendarClock,
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react'
import type { SanctuaryPublishValidation } from '@/features/create-space/lib/sanctuary-publish-validator'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib'

export interface PublishPreflightViewProps {
  validation: SanctuaryPublishValidation
  isPublishing: boolean
  onConfirm: () => void
  onClose: () => void
  onNavigateToScene?: (sceneId: string) => void
  accentColor?: string
}

export function PublishPreflightView({
  validation,
  isPublishing,
  onConfirm,
  onClose,
  onNavigateToScene,
  accentColor = '#D97706',
}: PublishPreflightViewProps) {
  const { isValid, issues, summary } = validation

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="space-y-1">
        <span className="font-heading text-xs tracking-wider text-amber-300/80 uppercase">
          Ready for Delivery
        </span>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#FAF6F0]">
          Publish Space
        </h2>
        <p className="font-sans text-xs text-stone-400">
          Review your gift before generating the public link for{' '}
          <strong className="text-amber-200">{summary.recipientName}</strong>.
        </p>
      </div>

      {/* Space Summary Pill Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <span className="font-sans text-[10px] text-stone-400 uppercase">
            Scenes
          </span>
          <p className="font-heading text-lg font-semibold text-[#FAF6F0]">
            {summary.totalScenes}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <span className="font-sans text-[10px] text-stone-400 uppercase">
            Memories
          </span>
          <div className="flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5 text-amber-400/80" />
            <p className="font-heading text-lg font-semibold text-[#FAF6F0]">
              {summary.totalPhotos}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <span className="font-sans text-[10px] text-stone-400 uppercase">
            Privacy
          </span>
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-amber-400/80" />
            <p className="font-sans text-xs font-medium text-stone-200">
              {summary.isProtected ? 'Passcode Locked' : 'Direct Link'}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <span className="font-sans text-[10px] text-stone-400 uppercase">
            Release
          </span>
          <div className="flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5 text-amber-400/80" />
            <p className="font-sans text-xs font-medium text-stone-200">
              {summary.hasSchedule ? 'Scheduled' : 'Immediate'}
            </p>
          </div>
        </div>
      </div>

      {/* Validation Checklist / Issues */}
      <div className="space-y-2">
        {issues.length > 0 ? (
          <div className="space-y-2 rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5">
            <span className="font-sans text-[11px] font-medium text-amber-200">
              Please review before taking flight:
            </span>
            <div className="space-y-2">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                    <div>
                      <strong className="text-amber-100">{issue.title}:</strong>{' '}
                      <span className="text-stone-300">{issue.message}</span>
                    </div>
                  </div>
                  {issue.suggestedSceneId && onNavigateToScene && (
                    <button
                      type="button"
                      onClick={() => onNavigateToScene(issue.suggestedSceneId!)}
                      className="shrink-0 font-sans text-[11px] font-medium text-amber-300 underline underline-offset-2 hover:text-amber-200"
                    >
                      Fix now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-3.5 py-2.5 text-xs text-emerald-200">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              Everything is in place. Your space is ready for{' '}
              {summary.recipientName}.
            </span>
          </div>
        )}
      </div>

      {/* Deferred Upload Info notice */}
      {summary.pendingPhotosCount > 0 && (
        <p className="font-sans text-[11px] text-stone-400 italic">
          ✨ {summary.pendingPhotosCount} personal photos will be safely
          compressed and stored in the cloud.
        </p>
      )}

      {/* Modal Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-white/15 bg-white/5 text-stone-300 hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={!isValid || isPublishing}
          onClick={onConfirm}
          style={isValid ? { backgroundColor: accentColor } : undefined}
          className={cn(
            'flex items-center gap-2 font-medium text-[#1A120B]',
            !isValid && 'cursor-not-allowed opacity-50',
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span>Publish Space</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
