export interface VoiceNoteReviewSectionProps {
  audioUrl: string
  label: string
  onChangeLabel: (val: string) => void
}

export function VoiceNoteReviewSection({
  audioUrl,
  label,
  onChangeLabel,
}: VoiceNoteReviewSectionProps) {
  return (
    <div className="animate-fade-in space-y-4 pt-2 text-left">
      <audio controls src={audioUrl} className="w-full rounded-xl bg-white/5" />
      <div>
        <label className="mb-1 block font-sans text-xs font-medium text-stone-300">
          Cassette Label:
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => onChangeLabel(e.target.value)}
          placeholder="e.g. For Carolina • Listen first"
          maxLength={40}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 font-sans text-xs text-white focus:border-[#CF7056] focus:outline-hidden"
        />
      </div>
    </div>
  )
}
