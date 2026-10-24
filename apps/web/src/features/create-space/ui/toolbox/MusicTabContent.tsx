import type { DragEvent } from 'react'
import { Play, Pause, Disc, Loader2, Check } from 'lucide-react'
import type { AudioTrack } from '@/entities/audio'
import { cn } from '@/shared/lib'

export interface MusicTabContentProps {
  tracks: AudioTrack[]
  isLoading: boolean
  previewTrackUrl?: string
  isPreviewPlaying: boolean
  assignedTrackId: string | null
  selectedItemName?: string
  currentTrackUrl?: string
  currentTrackTitle?: string
  onTogglePreview: (track: AudioTrack) => void
  onAssignTrack: (track: AudioTrack) => void
  onDragStart: (e: DragEvent<HTMLDivElement>, track: AudioTrack) => void
}

export function MusicTabContent({
  tracks,
  isLoading,
  previewTrackUrl,
  isPreviewPlaying,
  assignedTrackId,
  selectedItemName,
  currentTrackUrl,
  currentTrackTitle,
  onTogglePreview,
  onAssignTrack,
  onDragStart,
}: MusicTabContentProps) {
  if (isLoading) {
    return (
      <div className="flex h-44 flex-col items-center justify-center space-y-2 text-center font-sans text-xs text-[#A99B90]">
        <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
        <span className="text-[11px]">Searching songs & tracks...</span>
      </div>
    )
  }

  if (tracks.length === 0) {
    return (
      <div className="flex h-44 flex-col items-center justify-center p-4 text-center font-sans text-xs text-[#A99B90]">
        <p className="text-xs font-medium text-[#F3EAE1]">No songs found</p>
        <p className="mt-0.5 text-[10px]">
          Try searching for another artist or track name.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {selectedItemName && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 font-sans text-[11px] text-amber-300">
          <Disc className="h-3.5 w-3.5 shrink-0 animate-spin text-amber-400 [animation-duration:8s]" />
          <span className="truncate">
            Applying to: <strong>{selectedItemName}</strong>
          </span>
        </div>
      )}
      <div className="space-y-1.5">
        {tracks.map((track) => {
          const isPreviewingThis =
            previewTrackUrl === track.url && isPreviewPlaying
          const isJustAssigned = assignedTrackId === track.id
          const isCurrentTrack = currentTrackUrl
            ? track.url === currentTrackUrl
            : Boolean(currentTrackTitle) &&
              track.title.toLowerCase() === currentTrackTitle?.toLowerCase()

          return (
            <div
              key={track.id}
              draggable
              onDragStart={(e) => onDragStart(e, track)}
              title={`${track.title} by ${track.artist} • ${isCurrentTrack ? 'Currently in use' : 'Drag onto stage or click Use'}`}
              className={cn(
                'group relative flex cursor-grab items-center gap-2.5 rounded-xl border p-2 transition-all duration-200 active:cursor-grabbing',
                isCurrentTrack
                  ? 'border-amber-400/80 bg-[#2D221A] shadow-md ring-1 ring-amber-400/40'
                  : 'border-[#3B302A] bg-[#211B18] hover:border-[#CF7056]/60 hover:bg-[#261F1C]',
                isPreviewingThis &&
                  'border-amber-500/70 bg-[#29221C] ring-1 ring-amber-500/40',
              )}
            >
              {/* Left: Album cover / Vinyl Disc Icon with preview button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onTogglePreview(track)
                }}
                className="group/btn relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-[#3B302A] bg-[#171310] shadow-xs transition-transform hover:scale-105 active:scale-95"
                title={isPreviewingThis ? 'Pause preview' : 'Play preview'}
              >
                {track.albumArt || track.coverUrl ? (
                  <img
                    src={track.albumArt || track.coverUrl}
                    alt={track.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900">
                    <Disc
                      className={cn(
                        'h-5 w-5 text-stone-500',
                        (isPreviewingThis || isCurrentTrack) &&
                          'animate-spin text-amber-400 [animation-duration:4s]',
                      )}
                    />
                  </div>
                )}

                {/* Hover or Active Play/Pause Overlay */}
                <div
                  className={cn(
                    'absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity',
                    isPreviewingThis
                      ? 'opacity-100'
                      : 'opacity-0 group-hover/btn:opacity-100',
                  )}
                >
                  {isPreviewingThis ? (
                    <Pause className="h-4 w-4 text-amber-300 drop-shadow-xs" />
                  ) : (
                    <Play className="ml-0.5 h-4 w-4 text-white drop-shadow-xs" />
                  )}
                </div>
              </button>

              {/* Middle: Title, Artist, Equalizer bars */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p
                    className={cn(
                      'truncate font-sans text-xs font-medium',
                      isCurrentTrack
                        ? 'font-semibold text-amber-200'
                        : 'text-[#F3EAE1] group-hover:text-amber-300',
                    )}
                  >
                    {track.title}
                  </p>
                  {isPreviewingThis && (
                    <span className="flex h-2.5 shrink-0 items-end gap-0.5">
                      <span className="h-1.5 w-0.5 animate-pulse rounded-full bg-amber-400" />
                      <span className="h-2.5 w-0.5 animate-pulse rounded-full bg-amber-400 [animation-delay:150ms]" />
                      <span className="h-1 w-0.5 animate-pulse rounded-full bg-amber-400 [animation-delay:300ms]" />
                    </span>
                  )}
                </div>
                <p className="truncate font-sans text-[11px] text-[#A99B90]">
                  {track.artist}
                </p>
              </div>

              {/* Right: Use or In Use Button */}
              {isCurrentTrack ? (
                <div
                  className="flex h-7 shrink-0 items-center gap-1 rounded-lg border border-amber-400/60 bg-amber-400/20 px-2 font-sans text-[10px] font-semibold text-amber-300 shadow-xs"
                  title="This track is currently assigned to this player"
                >
                  <Check className="h-3 w-3 stroke-[2.5] text-amber-400" />
                  <span>In Use</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onAssignTrack(track)
                  }}
                  title="Set song to this player"
                  className={cn(
                    'flex h-7 shrink-0 cursor-pointer items-center gap-1 rounded-lg border px-2 font-sans text-[10px] font-medium transition-all active:scale-95',
                    isJustAssigned
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                      : 'border-[#3B302A] bg-[#1A1513] text-[#A99B90] hover:border-amber-400 hover:bg-amber-400 hover:text-[#14110F]',
                  )}
                >
                  {isJustAssigned ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Set!</span>
                    </>
                  ) : (
                    <span>Use</span>
                  )}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
