import type { SpaceTemplateId } from '@/entities/space'

export interface SpatialStageAtmosphereProps {
  templateId: SpaceTemplateId
  isDragOver: boolean
  isEmpty: boolean
  isEditor?: boolean
}

export function SpatialStageAtmosphere({
  templateId,
  isDragOver,
  isEmpty,
  isEditor = false,
}: SpatialStageAtmosphereProps) {
  return (
    <>
      {/* Visual Drop Overlay Cue */}
      {isDragOver && (
        <div className="bg-primary/10 animate-fade-in pointer-events-none absolute inset-0 z-40 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-bg-surface/90 text-primary border-primary/30 font-heading rounded-2xl border px-6 py-3 text-sm font-medium shadow-xl">
            Drop element here to place on stage
          </div>
        </div>
      )}

      {/* Atmospheric Theme-Specific Background Accents */}
      {templateId === 'birthday' && (
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute top-8 left-12 animate-pulse text-sm text-amber-400 opacity-60">
            ✦
          </span>
          <span className="absolute top-20 right-20 text-base text-amber-300 opacity-70">
            ✧
          </span>
          <span className="absolute bottom-12 left-1/3 animate-pulse text-xs text-amber-500 opacity-50">
            ✦
          </span>
          <span className="absolute top-1/2 right-12 text-sm text-amber-200 opacity-60">
            ✧
          </span>
        </div>
      )}

      {templateId === 'anniversary' && (
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute top-10 right-16 rotate-45 text-base text-rose-500/35">
            ❧
          </span>
          <span className="absolute top-32 left-12 -rotate-12 text-xs text-rose-400/30">
            ❧
          </span>
          <span className="absolute bottom-16 left-24 rotate-90 text-sm text-rose-600/30">
            ❧
          </span>
          <span className="absolute right-28 bottom-12 rotate-30 text-xs text-rose-500/25">
            ❧
          </span>
        </div>
      )}

      {/* Empty State Cue - ONLY rendered in editor mode */}
      {isEditor && isEmpty && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-bg-surface/85 border-border-base max-w-sm rounded-2xl border p-6 shadow-xl backdrop-blur-md">
            <span className="text-3xl select-none">✨</span>
            <h4 className="font-heading text-text-primary mt-2 text-base font-medium">
              Your Stage is Empty
            </h4>
            <p className="text-text-secondary mt-1 font-sans text-xs">
              Drag elements from the sidebar or click &ldquo;Add to Stage&rdquo;
              to begin crafting your sanctuary.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
