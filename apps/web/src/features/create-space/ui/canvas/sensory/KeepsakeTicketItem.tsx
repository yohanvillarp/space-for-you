import { useState } from 'react'
import type { SpatialItem } from '@/features/create-space/model/spatial-stage.types'
import { playSpatialSfx, cn } from '@/shared/lib'

export interface KeepsakeTicketItemProps {
  item: SpatialItem
  onUpdateData?: (id: string, data: Partial<SpatialItem['data']>) => void
  isEditorMode?: boolean
}

export function KeepsakeTicketItem({
  item,
  onUpdateData,
  isEditorMode,
}: KeepsakeTicketItemProps) {
  const [localPunched, setLocalPunched] = useState(Boolean(item.data.isPunched))
  const isPunched =
    item.data.isPunched !== undefined ? item.data.isPunched : localPunched

  const handlePunch = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextPunched = !isPunched
    setLocalPunched(nextPunched)
    onUpdateData?.(item.id, { isPunched: nextPunched })
    playSpatialSfx('ticket-punch')
  }

  const origin = item.data.ticketFrom || 'Yesterday'
  const destination = item.data.ticketDestination || 'Always'

  return (
    <div
      onClick={handlePunch}
      role="button"
      tabIndex={0}
      title={
        isPunched
          ? 'Ticket punched • Valid for memory'
          : 'Click to punch ticket'
      }
      className={cn(
        'group relative flex flex-col items-center justify-center p-2 transition-transform duration-300 select-none',
        !isEditorMode && 'cursor-pointer hover:scale-105',
      )}
    >
      {/* Heavy Stock Cotton Kraft Board Ticket */}
      <div className="relative flex h-18 w-44 items-center justify-between overflow-hidden rounded-md border border-[#8C6D4F] bg-[#FAF4E8] p-2 shadow-xl dark:border-[#5C4530] dark:bg-[#2A231C]">
        {/* Scalloped Notches on Left & Right Sides */}
        <div className="absolute top-1/2 -left-2 h-4 w-4 -translate-y-1/2 rounded-full border border-[#8C6D4F] bg-[#0F0B09]" />
        <div className="absolute top-1/2 -right-2 h-4 w-4 -translate-y-1/2 rounded-full border border-[#8C6D4F] bg-[#0F0B09]" />

        {/* Main Ticket Left Segment */}
        <div className="flex flex-1 flex-col justify-between pr-3 pl-2">
          {/* Header & Seat Info */}
          <div className="flex items-center justify-between border-b border-stone-300/80 pb-0.5 dark:border-stone-700/80">
            <span className="font-serif text-[7px] tracking-wider text-amber-900/70 uppercase dark:text-amber-200/70">
              Passage No. 709
            </span>
            <span className="font-mono text-[7px] text-stone-500">
              FIRST CLASS
            </span>
          </div>

          {/* Route Stations */}
          <div className="my-1 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[6px] tracking-widest text-stone-400 uppercase">
                FROM
              </span>
              <span className="font-serif text-[9px] font-bold text-stone-800 dark:text-stone-200">
                {origin}
              </span>
            </div>

            <span className="text-[8px] text-amber-700 dark:text-amber-400">
              ➔
            </span>

            <div className="flex flex-col text-right">
              <span className="text-[6px] tracking-widest text-stone-400 uppercase">
                TO
              </span>
              <span className="font-serif text-[9px] font-bold text-stone-800 dark:text-stone-200">
                {destination}
              </span>
            </div>
          </div>

          {/* Barcode Mock */}
          <div className="flex h-1.5 w-24 gap-0.5 opacity-60">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-full bg-stone-800 dark:bg-stone-300',
                  i % 2 === 0 ? 'w-1' : 'w-0.5',
                )}
              />
            ))}
          </div>
        </div>

        {/* Perforated Divider Line */}
        <div className="h-full border-r border-dashed border-stone-400/80 dark:border-stone-600" />

        {/* Stub Right Segment with Punched Hole */}
        <div className="relative flex h-full w-10 flex-col items-center justify-center pl-2">
          {isPunched ? (
            /* Punched Heart/Star Hole */
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-dashed border-amber-800/60 bg-[#0F0B09] shadow-inner">
              <span className="text-[9px] text-rose-400">♥</span>
            </div>
          ) : (
            /* Unpunched Stamp circle */
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-amber-600/40 text-[7px] text-amber-700/60 dark:text-amber-400/60">
              VALID
            </div>
          )}
          <span className="mt-1 font-mono text-[5px] text-stone-400">
            PUNCH
          </span>
        </div>
      </div>

      <span className="mt-1 font-serif text-[10px] tracking-wide text-amber-200/80">
        {item.data.title || 'Journey Ticket'}
      </span>
    </div>
  )
}
