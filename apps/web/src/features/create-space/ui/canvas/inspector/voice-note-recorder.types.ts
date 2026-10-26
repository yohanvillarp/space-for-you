export interface VoiceNoteRecorderModalProps {
  isOpen: boolean
  onClose: () => void
  currentVoiceNotesCount: number
  initialLabel?: string
  onSaveVoiceNote: (url: string, duration: number, label: string) => void
}
