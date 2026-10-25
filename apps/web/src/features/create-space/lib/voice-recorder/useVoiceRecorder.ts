import { useState, useRef, useEffect, useCallback } from 'react'
import {
  MAX_VOICE_NOTE_DURATION_SEC,
  type VoiceRecorderStatus,
} from './voice-note-types'
import {
  createWaveAnalyser,
  sampleWaveLevels,
  type WaveAnalyserSession,
} from './audio-wave-analyser'

export interface UseVoiceRecorderReturn {
  status: VoiceRecorderStatus
  elapsedSeconds: number
  remainingSeconds: number
  waveLevels: number[]
  audioUrl: string | null
  audioBlob: Blob | null
  error: string | null
  startRecording: () => Promise<void>
  stopRecording: () => void
  discardRecording: () => void
  reset: () => void
}

export function useVoiceRecorder(): UseVoiceRecorderReturn {
  const [status, setStatus] = useState<VoiceRecorderStatus>('idle')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [waveLevels, setWaveLevels] = useState<number[]>(() =>
    Array(18).fill(0.1),
  )
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const analyserSessionRef = useRef<WaveAnalyserSession | null>(null)
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const cleanupStreams = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    if (analyserSessionRef.current) {
      analyserSessionRef.current.cleanup()
      analyserSessionRef.current = null
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }
    mediaRecorderRef.current = null
  }, [])

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop()
    }
    cleanupStreams()
  }, [cleanupStreams])

  const startRecording = useCallback(async () => {
    setError(null)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
      setAudioBlob(null)
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })
      mediaStreamRef.current = stream

      const preferredTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus',
      ]
      const mimeType =
        preferredTypes.find((t) => MediaRecorder.isTypeSupported(t)) || ''

      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      )
      mediaRecorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      recorder.onstop = () => {
        const fullBlob = new Blob(chunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        })
        const objectUrl = URL.createObjectURL(fullBlob)
        setAudioBlob(fullBlob)
        setAudioUrl(objectUrl)
        setStatus('reviewing')
      }

      // Live waveform sampling
      const analyser = createWaveAnalyser(stream)
      analyserSessionRef.current = analyser

      const updateWaveLoop = () => {
        if (analyserSessionRef.current) {
          const levels = sampleWaveLevels(analyserSessionRef.current.analyser)
          setWaveLevels(levels)
          animFrameRef.current = requestAnimationFrame(updateWaveLoop)
        }
      }
      animFrameRef.current = requestAnimationFrame(updateWaveLoop)

      // Start recording & 1-minute countdown timer
      recorder.start(100)
      setStatus('recording')
      setElapsedSeconds(0)

      const startTime = Date.now()
      timerIntervalRef.current = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000)
        setElapsedSeconds(seconds)
        if (seconds >= MAX_VOICE_NOTE_DURATION_SEC) {
          stopRecording()
        }
      }, 250)
    } catch {
      setError(
        'Microphone access denied. Please allow microphone permissions to record.',
      )
      setStatus('idle')
    }
  }, [audioUrl, stopRecording])

  const discardRecording = useCallback(() => {
    cleanupStreams()
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(null)
    setAudioBlob(null)
    setElapsedSeconds(0)
    setWaveLevels(Array(18).fill(0.1))
    setStatus('idle')
  }, [audioUrl, cleanupStreams])

  const reset = useCallback(() => {
    discardRecording()
    setError(null)
  }, [discardRecording])

  useEffect(() => {
    return () => {
      cleanupStreams()
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl, cleanupStreams])

  const remainingSeconds = Math.max(
    0,
    MAX_VOICE_NOTE_DURATION_SEC - elapsedSeconds,
  )

  return {
    status,
    elapsedSeconds,
    remainingSeconds,
    waveLevels,
    audioUrl,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    discardRecording,
    reset,
  }
}
