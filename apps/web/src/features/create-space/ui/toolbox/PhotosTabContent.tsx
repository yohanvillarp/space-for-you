import { useState, useEffect } from 'react'
import {
  Camera,
  Globe,
  Upload,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react'
import { PhotoWebTab } from '@/features/create-space/ui/photo/PhotoWebTab'
import { PhotoUploadTab } from '@/features/create-space/ui/photo/PhotoUploadTab'
import {
  MAX_TOTAL_PHOTOS,
  MAX_UPLOADED_PHOTOS,
} from '@/features/create-space/lib/stage-photo-limit'
import { cn } from '@/shared/lib'

export interface PhotosTabContentProps {
  selectedItemName?: string
  currentPhotoUrl?: string
  photoCount: number
  uploadedPhotoCount?: number
  onAssignPhoto: (photoUrl: string, file?: File) => void
  onAddPolaroidWithPhoto?: (photoUrl: string, file?: File) => void
  isPolaroidSelected: boolean
}

export function PhotosTabContent({
  selectedItemName,
  photoCount,
  uploadedPhotoCount = 0,
  onAssignPhoto,
  onAddPolaroidWithPhoto,
  isPolaroidSelected,
}: PhotosTabContentProps) {
  const [subTab, setSubTab] = useState<'web' | 'upload'>('web')
  const [isPulsing, setIsPulsing] = useState(false)
  const [prevPolaroid, setPrevPolaroid] = useState(isPolaroidSelected)

  if (isPolaroidSelected !== prevPolaroid) {
    setPrevPolaroid(isPolaroidSelected)
    if (isPolaroidSelected) setIsPulsing(true)
  }

  useEffect(() => {
    if (isPulsing) {
      const timer = setTimeout(() => setIsPulsing(false), 2400)
      return () => clearTimeout(timer)
    }
  }, [isPulsing])

  const isTotalLimitReached = photoCount >= MAX_TOTAL_PHOTOS
  const isUploadLimitReached = uploadedPhotoCount >= MAX_UPLOADED_PHOTOS

  const handlePhotoSelect = (url: string, file?: File) => {
    setIsPulsing(true)

    if (isPolaroidSelected) {
      onAssignPhoto(url, file)
    } else if (!isTotalLimitReached && onAddPolaroidWithPhoto) {
      onAddPolaroidWithPhoto(url, file)
    }
  }

  return (
    <div
      className={cn(
        'space-y-3.5 rounded-2xl p-1 transition-all',
        isPulsing && 'animate-pulse-twice ring-2 ring-amber-400/90',
      )}
    >
      {/* Target Status Banner */}
      {isPolaroidSelected ? (
        <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
          <Camera className="h-4 w-4 shrink-0 text-amber-400" />
          <div className="truncate">
            <span className="font-semibold text-amber-300">Applying to: </span>
            <span className="font-heading italic">{selectedItemName}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-[#3B302A] bg-[#1E1815] px-3 py-2 text-xs">
          <div className="flex items-center gap-2 text-[#A99B90]">
            <ImageIcon className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {subTab === 'upload' ? 'Cloud Uploads' : 'Total Photos'}
            </span>
          </div>
          <span className="font-mono text-[11px] font-semibold text-amber-300">
            {subTab === 'upload'
              ? `${uploadedPhotoCount} / ${MAX_UPLOADED_PHOTOS} used`
              : `${photoCount} / ${MAX_TOTAL_PHOTOS} used`}
          </span>
        </div>
      )}

      {/* Limit Notice if Max Reached without Polaroid Selected */}
      {!isPolaroidSelected && isTotalLimitReached && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 text-xs text-rose-300">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
          <p className="text-[11px] leading-relaxed">
            Maximum {MAX_TOTAL_PHOTOS} photos reached for this space. Click an
            existing Polaroid on the canvas to swap its photograph.
          </p>
        </div>
      )}

      {/* Sub-tab Navigation */}
      <div className="grid grid-cols-2 gap-1 rounded-xl border border-[#3B302A] bg-[#211B18] p-1 font-sans text-xs">
        <button
          type="button"
          onClick={() => setSubTab('web')}
          className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all ${
            subTab === 'web'
              ? 'border border-amber-500/40 bg-[#2A221E] text-amber-300 shadow-xs'
              : 'text-[#A99B90] hover:text-[#F3EAE1]'
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Web Library</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('upload')}
          className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all ${
            subTab === 'upload'
              ? 'border border-amber-500/40 bg-[#2A221E] text-amber-300 shadow-xs'
              : 'text-[#A99B90] hover:text-[#F3EAE1]'
          }`}
        >
          <Upload className="h-3.5 w-3.5" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Active Tab Panel */}
      {subTab === 'web' ? (
        <PhotoWebTab
          onSelectPhoto={(url) => handlePhotoSelect(url)}
          isLimitReached={isTotalLimitReached && !isPolaroidSelected}
        />
      ) : (
        <PhotoUploadTab
          onSelectPhoto={(url, file) => handlePhotoSelect(url, file)}
          isUploadLimitReached={isUploadLimitReached}
          isPolaroidSelected={isPolaroidSelected}
        />
      )}
    </div>
  )
}
