import { useState, useCallback, useRef } from 'react'

export interface UndoRedoHistoryOptions {
  maxHistory?: number
}

export interface UseUndoRedoHistoryReturn<T> {
  state: T
  canUndo: boolean
  canRedo: boolean
  undo: () => T | null
  redo: () => T | null
  commit: (next: T | ((prev: T) => T)) => void
  updatePresent: (next: T | ((prev: T) => T)) => void
  startTransaction: () => void
  commitTransaction: (finalState?: T) => void
  resetHistory: (initialState: T) => void
}

/**
 * Lightweight, non-saturating Bounded Stack Undo/Redo Hook.
 * Default max history capacity: 25 steps (as specified).
 * In-memory execution: zero cloud calls, zero database writes.
 */
export function useUndoRedoHistory<T>(
  initialPresent: T,
  options?: UndoRedoHistoryOptions,
): UseUndoRedoHistoryReturn<T> {
  const maxHistory = options?.maxHistory ?? 25

  const [present, setPresent] = useState<T>(initialPresent)
  const [past, setPast] = useState<T[]>([])
  const [future, setFuture] = useState<T[]>([])

  const checkpointRef = useRef<T | null>(null)

  // Commit an atomic discrete action into history
  const commit = useCallback(
    (next: T | ((prev: T) => T)) => {
      setPresent((current) => {
        const nextVal =
          typeof next === 'function' ? (next as (prev: T) => T)(current) : next
        setPast((prevPast) => {
          const updated = [...prevPast, current]
          return updated.length > maxHistory
            ? updated.slice(updated.length - maxHistory)
            : updated
        })
        setFuture([])
        return nextVal
      })
    },
    [maxHistory],
  )

  // Live real-time updates without history pollution (used during 60 FPS drag)
  const updatePresent = useCallback((next: T | ((prev: T) => T)) => {
    setPresent((current) =>
      typeof next === 'function' ? (next as (prev: T) => T)(current) : next,
    )
  }, [])

  // Start gesture transaction (records checkpoint)
  const startTransaction = useCallback(() => {
    checkpointRef.current = present
  }, [present])

  // End gesture transaction (pushes single step only if state changed)
  const commitTransaction = useCallback(
    (finalState?: T) => {
      const checkpoint = checkpointRef.current
      checkpointRef.current = null
      if (checkpoint === null) return

      const target = finalState !== undefined ? finalState : present
      if (JSON.stringify(checkpoint) === JSON.stringify(target)) return

      setPast((prevPast) => {
        const updated = [...prevPast, checkpoint]
        return updated.length > maxHistory
          ? updated.slice(updated.length - maxHistory)
          : updated
      })
      setFuture([])
    },
    [maxHistory, present],
  )

  const undo = useCallback((): T | null => {
    if (past.length === 0) return null

    const previous = past[past.length - 1]
    const newPast = past.slice(0, past.length - 1)

    setPast(newPast)
    setFuture((prevFuture) => [present, ...prevFuture])
    setPresent(previous)
    return previous
  }, [past, present])

  const redo = useCallback((): T | null => {
    if (future.length === 0) return null

    const next = future[0]
    const newFuture = future.slice(1)

    setPast((prevPast) => {
      const updated = [...prevPast, present]
      return updated.length > maxHistory
        ? updated.slice(updated.length - maxHistory)
        : updated
    })
    setFuture(newFuture)
    setPresent(next)
    return next
  }, [future, maxHistory, present])

  const resetHistory = useCallback((initialState: T) => {
    setPresent(initialState)
    setPast([])
    setFuture([])
    checkpointRef.current = null
  }, [])

  return {
    state: present,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    undo,
    redo,
    commit,
    updatePresent,
    startTransaction,
    commitTransaction,
    resetHistory,
  }
}
