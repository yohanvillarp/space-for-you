import { useState } from 'react'
import { X, Check, PenLine } from 'lucide-react'
import type {
  SpatialItem,
  SpatialItemData,
} from '@/features/create-space/model/spatial-stage.types'
import {
  getItemDisplayName,
  getItemFormType,
} from '@/features/create-space/model/spatial-item-capabilities'
import { Button } from '@/shared/ui'
import { playSpatialSfx } from '@/shared/lib'
import { TicketInspectorFields } from './sub-forms/TicketInspectorFields'
import { HerbariumInspectorFields } from './sub-forms/HerbariumInspectorFields'
import { SensoryInspectorFields } from './sub-forms/SensoryInspectorFields'
import { StandardInspectorFields } from './sub-forms/StandardInspectorFields'

export interface EditItemTextModalProps {
  isOpen: boolean
  item: SpatialItem | null
  onClose: () => void
  onSave: (id: string, updates: Partial<SpatialItemData>) => void
}

interface FormProps {
  item: SpatialItem
  onClose: () => void
  onSave: (id: string, updates: Partial<SpatialItemData>) => void
}

function EditItemTextForm({ item, onClose, onSave }: FormProps) {
  const formType = getItemFormType(item.type)
  const [title, setTitle] = useState(item.data.title || '')
  const [text, setText] = useState(item.data.text || '')
  const [caption, setCaption] = useState(item.data.caption || '')
  const [date, setDate] = useState(item.data.date || '')
  const [subtitle, setSubtitle] = useState(
    item.data.subtitle || item.data.artist || '',
  )
  const [from, setFrom] = useState(item.data.ticketFrom || 'First Day')
  const [destination, setDestination] = useState(
    item.data.ticketDestination || 'Forever',
  )
  const [specimen, setSpecimen] = useState<
    NonNullable<SpatialItemData['herbariumFlower']>
  >(item.data.herbariumFlower || 'lavender')

  const handleSave = () => {
    playSpatialSfx('tactile-tap')
    const updates: Partial<SpatialItemData> = {}

    if (formType === 'ticket') {
      updates.ticketFrom = from.trim()
      updates.ticketDestination = destination.trim()
      updates.title = title.trim() || 'Passage Ticket'
      updates.date = date.trim()
    } else if (formType === 'herbarium') {
      updates.herbariumFlower = specimen
      updates.caption = caption.trim()
      if (title.trim()) updates.title = title.trim()
    } else if (formType === 'sensory-secret' || formType === 'sensory-memo') {
      if (title.trim()) updates.title = title.trim()
      if (caption.trim()) updates.caption = caption.trim()
      if (text.trim()) updates.text = text.trim()
    } else if (formType === 'polaroid') {
      updates.caption = caption.trim()
      updates.date = date.trim()
    } else if (formType === 'sticky-note') {
      updates.text = text.trim()
      if (title.trim()) updates.title = title.trim()
    } else if (formType === 'audio') {
      updates.title = title.trim()
      if (item.type === 'cassette-tape') {
        updates.subtitle = subtitle.trim()
      } else {
        updates.artist = subtitle.trim()
      }
    } else {
      if (title.trim()) updates.title = title.trim()
      if (text.trim()) updates.text = text.trim()
    }

    onSave(item.id, updates)
    onClose()
  }

  const typeName = getItemDisplayName(item.type, item.label)

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#17120F] p-6 text-[#FAF6F0] shadow-2xl">
      <div className="flex items-start justify-between pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300">
            <PenLine className="h-4 w-4" />
          </div>
          <div>
            <h2
              id="edit-item-text-title"
              className="font-heading text-lg font-medium text-stone-100"
            >
              Edit {typeName}
            </h2>
            <p className="font-sans text-xs text-stone-400">
              Personalize details and words for your recipient
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="cursor-pointer rounded-full p-1.5 text-stone-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
        className="space-y-4 pt-1"
      >
        {formType === 'ticket' && (
          <TicketInspectorFields
            from={from}
            destination={destination}
            title={title}
            date={date}
            onChangeFrom={setFrom}
            onChangeDestination={setDestination}
            onChangeTitle={setTitle}
            onChangeDate={setDate}
          />
        )}

        {formType === 'herbarium' && (
          <HerbariumInspectorFields
            specimen={specimen}
            caption={caption}
            title={title}
            onChangeSpecimen={setSpecimen}
            onChangeCaption={setCaption}
            onChangeTitle={setTitle}
          />
        )}

        {(formType === 'sensory-secret' || formType === 'sensory-memo') && (
          <SensoryInspectorFields
            itemType={item.type}
            title={title}
            caption={caption}
            text={text}
            onChangeTitle={setTitle}
            onChangeCaption={setCaption}
            onChangeText={setText}
          />
        )}

        {(formType === 'card-or-letter' ||
          formType === 'sticky-note' ||
          formType === 'polaroid' ||
          formType === 'audio') && (
          <StandardInspectorFields
            formType={formType}
            title={title}
            subtitle={subtitle}
            caption={caption}
            date={date}
            text={text}
            onChangeTitle={setTitle}
            onChangeSubtitle={setSubtitle}
            onChangeCaption={setCaption}
            onChangeDate={setDate}
            onChangeText={setText}
          />
        )}

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="border-white/15 bg-white/5 text-stone-300 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5 font-medium"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Apply Changes</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export function EditItemTextModal({
  isOpen,
  item,
  onClose,
  onSave,
}: EditItemTextModalProps) {
  if (!isOpen || !item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-item-text-title"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs select-none"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <EditItemTextForm
        key={item.id}
        item={item}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  )
}
