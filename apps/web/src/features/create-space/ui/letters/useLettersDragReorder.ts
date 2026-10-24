import { useState } from 'react'
import { playSpatialSfx } from '@/shared/lib'

export interface UseLettersDragReorderOptions {
  onReorderLetters?: (fromIndex: number, toIndex: number) => void
  enabled?: boolean
}

export function useLettersDragReorder({
  onReorderLetters,
  enabled = true,
}: UseLettersDragReorderOptions) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (!enabled) return
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
    setDraggedIndex(index)
    playSpatialSfx('paper-rustle')
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    if (!enabled || draggedIndex === null) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (draggedIndex !== index && dragOverIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDragLeave = (_e: React.DragEvent, index: number) => {
    if (dragOverIndex === index) {
      setDragOverIndex(null)
    }
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (!enabled || draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }
    playSpatialSfx('tactile-tap')
    onReorderLetters?.(draggedIndex, targetIndex)
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  return {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  }
}
