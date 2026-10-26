import { Loader2, Sparkles, CloudUpload, ShieldCheck } from 'lucide-react'

export interface PublishProgressViewProps {
  step: 'uploading' | 'persisting'
  pendingPhotosCount?: number
  accentColor?: string
}

export function PublishProgressView({
  step,
  pendingPhotosCount = 0,
  accentColor = '#D97706',
}: PublishProgressViewProps) {
  const isUploading = step === 'uploading'

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8 text-center">
      {/* Animated Glowing Orb with Icon */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div
          className="absolute inset-0 animate-ping rounded-full opacity-20 blur-md"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md"
          style={{ backgroundColor: `${accentColor}33` }}
        >
          {isUploading ? (
            <CloudUpload className="h-8 w-8 animate-bounce text-amber-300" />
          ) : (
            <Sparkles className="h-8 w-8 animate-spin text-amber-300" />
          )}
        </div>
      </div>

      {/* Progress Information */}
      <div className="space-y-2">
        <h3 className="font-heading text-xl font-medium tracking-tight text-[#FAF6F0]">
          {isUploading ? 'Preserving Memories...' : 'Preparing Your Space...'}
        </h3>
        <p className="max-w-xs font-sans text-xs text-stone-400">
          {isUploading
            ? `Uploading ${pendingPhotosCount} keepsake photos to cloud storage with privacy protection.`
            : 'Setting up public recipient permissions, unique address, and music.'}
        </p>
      </div>

      {/* Ticking Status Steps */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-stone-300">
          <CloudUpload className="h-3.5 w-3.5 text-amber-400" />
          <span>Upload</span>
        </div>
        <span className="text-white/20">→</span>
        <div className="flex items-center gap-1.5 text-stone-300">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
          <span>Permissions</span>
        </div>
        <span className="text-white/20">→</span>
        <div className="flex items-center gap-1.5 text-stone-300">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-300" />
          <span>Publish</span>
        </div>
      </div>
    </div>
  )
}
