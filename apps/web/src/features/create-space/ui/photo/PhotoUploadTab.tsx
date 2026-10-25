import { useState, useRef } from 'react'
import { UploadCloud, CheckCircle2, Sparkles } from 'lucide-react'
import { compressImageFile } from '@/features/create-space/lib/image-compression'
import type { CompressedImageResult } from '@/features/create-space/lib/image-compression'
import { Button } from '@/shared/ui'
import { playSpatialSfx } from '@/shared/lib'

export interface PhotoUploadTabProps {
  onSelectPhoto: (photoUrl: string, file?: File) => void
}

export function PhotoUploadTab({ onSelectPhoto }: PhotoUploadTabProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewResult, setPreviewResult] =
    useState<CompressedImageResult | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPEG, PNG, WebP).')
      return
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('Image size must be under 15MB.')
      return
    }

    try {
      setIsProcessing(true)
      setErrorMsg(null)
      const result = await compressImageFile(file)
      setPreviewResult(result)
      setSelectedFile(file)
      playSpatialSfx('tactile-tap')
    } catch {
      setErrorMsg('Could not process this image. Please try another one.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) void handleProcessFile(file)
  }

  const handleConfirm = () => {
    if (!previewResult) return
    playSpatialSfx('camera-shutter')
    onSelectPhoto(previewResult.dataUrl, selectedFile ?? undefined)
  }

  const formatSize = (bytes: number) => {
    return bytes > 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(bytes / 1024)} KB`
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void handleProcessFile(file)
        }}
      />

      {!previewResult ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? 'border-amber-400 bg-amber-500/10'
              : 'border-[#443831] bg-[#1E1815] hover:border-amber-500/50 hover:bg-[#251E1A]'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-300">
            {isProcessing ? (
              <Sparkles className="h-6 w-6 animate-spin" />
            ) : (
              <UploadCloud className="h-6 w-6" />
            )}
          </div>
          <h4 className="font-heading mt-3 text-sm font-medium text-[#F3EAE1]">
            {isProcessing ? 'Optimizing photo...' : 'Upload from your device'}
          </h4>
          <p className="mt-1 text-xs text-[#A99B90]">
            Drag & drop here or click to browse (JPEG, PNG, WebP up to 15MB)
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-[#443831] bg-black/40">
            <img
              src={previewResult.dataUrl}
              alt="Preview"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#A99B90]">
            <span>
              Original: {formatSize(previewResult.originalSize)} → Optimized:{' '}
              <strong className="text-emerald-400">
                {formatSize(previewResult.compressedSize)}
              </strong>
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-amber-300 underline hover:text-amber-200"
            >
              Choose different file
            </button>
          </div>

          <Button
            type="button"
            variant="primary"
            onClick={handleConfirm}
            className="w-full gap-2 text-xs"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Use this Photo</span>
          </Button>
        </div>
      )}

      {errorMsg && (
        <p className="text-center text-xs text-rose-400">{errorMsg}</p>
      )}
    </div>
  )
}
