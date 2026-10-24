import { useState } from 'react'
import { Globe, Upload, Trash2, Camera } from 'lucide-react'
import { PhotoWebTab, PhotoUploadTab } from '@/features/create-space/ui/photo'
import { cn, playSpatialSfx } from '@/shared/lib'

export interface LetterPhotoEnclosureTabProps {
  imageUrl?: string
  searchQuery?: string
  onAssignPhoto: (url: string) => void
  onRemovePhoto: () => void
}

export function LetterPhotoEnclosureTab({
  imageUrl,
  searchQuery: _searchQuery = '',
  onAssignPhoto,
  onRemovePhoto,
}: LetterPhotoEnclosureTabProps) {
  const [subTab, setSubTab] = useState<'web' | 'upload'>('web')

  const handleSelect = (url: string) => {
    playSpatialSfx('tactile-tap')
    onAssignPhoto(url)
  }

  const handleRemove = () => {
    playSpatialSfx('note-peel')
    onRemovePhoto()
  }

  return (
    <div className="space-y-3 p-1 font-sans text-xs">
      {/* Existing Enclosed Photo Overview */}
      {imageUrl ? (
        <div className="group relative flex items-center justify-between rounded-xl border border-amber-400/40 bg-[#1F1814] p-2.5 shadow-sm">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/20 bg-stone-900 shadow-sm">
              <img
                src={imageUrl}
                alt="Enclosed Keepsake"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="truncate">
              <p className="font-heading truncate text-xs font-semibold text-amber-100">
                Keepsake Photograph
              </p>
              <p className="font-sans text-[10px] text-stone-400">
                Folded inside this letter
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            title="Remove enclosed photograph"
            className="flex cursor-pointer items-center gap-1 rounded-lg border border-[#3B302A] bg-[#2A221E] px-2 py-1 text-[11px] text-rose-300 transition-colors hover:border-rose-400/60 hover:text-rose-200"
          >
            <Trash2 className="h-3 w-3" />
            <span>Remove</span>
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#3B302A] bg-[#171310] p-3 text-center">
          <Camera className="mx-auto h-5 w-5 text-amber-400/70" />
          <p className="font-heading mt-1 text-xs text-stone-200">
            No photograph enclosed
          </p>
          <p className="font-sans text-[10px] text-stone-500">
            Select a photo from web or upload one below to fold inside.
          </p>
        </div>
      )}

      {/* Sub-tab Switcher: Web Library vs File Upload */}
      <div className="grid grid-cols-2 gap-1 rounded-lg border border-[#3B302A] bg-[#211B18] p-0.5">
        <button
          type="button"
          onClick={() => setSubTab('web')}
          className={cn(
            'flex cursor-pointer items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all',
            subTab === 'web'
              ? 'border border-amber-500/40 bg-[#2A221E] text-amber-300 shadow-xs'
              : 'text-[#A99B90] hover:text-[#F3EAE1]',
          )}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Web Library</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('upload')}
          className={cn(
            'flex cursor-pointer items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all',
            subTab === 'upload'
              ? 'border border-amber-500/40 bg-[#2A221E] text-amber-300 shadow-xs'
              : 'text-[#A99B90] hover:text-[#F3EAE1]',
          )}
        >
          <Upload className="h-3.5 w-3.5" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="max-h-[360px] overflow-y-auto pr-1">
        {subTab === 'web' ? (
          <PhotoWebTab
            currentPhotoUrl={imageUrl}
            onSelectPhoto={handleSelect}
          />
        ) : (
          <PhotoUploadTab onSelectPhoto={(url) => handleSelect(url)} />
        )}
      </div>
    </div>
  )
}
