interface TicketInspectorFieldsProps {
  from: string
  destination: string
  title: string
  date: string
  onChangeFrom: (val: string) => void
  onChangeDestination: (val: string) => void
  onChangeTitle: (val: string) => void
  onChangeDate: (val: string) => void
}

export function TicketInspectorFields({
  from,
  destination,
  title,
  date,
  onChangeFrom,
  onChangeDestination,
  onChangeTitle,
  onChangeDate,
}: TicketInspectorFieldsProps) {
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <label
            htmlFor="ticket-from"
            className="font-sans text-xs font-medium text-amber-200/90"
          >
            Origin / From
          </label>
          <input
            id="ticket-from"
            type="text"
            value={from}
            onChange={(e) => onChangeFrom(e.target.value)}
            placeholder="e.g., First Day"
            maxLength={25}
            className="font-heading w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100 outline-none select-text focus:border-amber-400 focus:bg-white/10"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="ticket-destination"
            className="font-sans text-xs font-medium text-amber-200/90"
          >
            Destination / To
          </label>
          <input
            id="ticket-destination"
            type="text"
            value={destination}
            onChange={(e) => onChangeDestination(e.target.value)}
            placeholder="e.g., Forever"
            maxLength={25}
            className="font-heading w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100 outline-none select-text focus:border-amber-400 focus:bg-white/10"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="ticket-title"
          className="font-sans text-xs font-medium text-amber-200/90"
        >
          Passage Title / Class
        </label>
        <input
          id="ticket-title"
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="e.g., First Class Passage"
          maxLength={30}
          className="font-heading w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100 outline-none select-text focus:border-amber-400 focus:bg-white/10"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="ticket-date"
          className="font-sans text-xs font-medium text-amber-200/90"
        >
          Journey Date Tag
        </label>
        <input
          id="ticket-date"
          type="text"
          value={date}
          onChange={(e) => onChangeDate(e.target.value)}
          placeholder="e.g., Autumn 2026"
          maxLength={25}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-sans text-xs text-stone-200 outline-none select-text focus:border-amber-400 focus:bg-white/10"
        />
      </div>
    </div>
  )
}
