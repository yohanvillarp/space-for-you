import { useState, useEffect, useRef, useCallback } from 'react'

export interface UseSpatialAudioPlayerOptions {
  trackUrl?: string
  initialVolume?: number
  loop?: boolean
  autoPlay?: boolean
  onEnded?: () => void
}

export function useSpatialAudioPlayer({
  trackUrl,
  initialVolume = 0.8,
  loop = false,
  autoPlay = false,
  onEnded,
}: UseSpatialAudioPlayerOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(initialVolume)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Adjust state during render when trackUrl changes (React recommended pattern)
  const [prevTrackUrl, setPrevTrackUrl] = useState(trackUrl)
  if (trackUrl !== prevTrackUrl) {
    setPrevTrackUrl(trackUrl)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }

  const onEndedRef = useRef(onEnded)
  useEffect(() => {
    onEndedRef.current = onEnded
  }, [onEnded])

  const loopRef = useRef(loop)
  useEffect(() => {
    loopRef.current = loop
    if (audioRef.current) {
      audioRef.current.loop = loop
    }
  }, [loop])

  const volumeRef = useRef(volume)
  useEffect(() => {
    volumeRef.current = volume
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Initialize audio element when trackUrl changes
  useEffect(() => {
    if (!trackUrl) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
      return
    }

    const audio = new Audio(trackUrl)
    audio.preload = 'metadata'
    audio.loop = loopRef.current
    audio.volume = volumeRef.current
    audioRef.current = audio

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setIsLoading(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      onEndedRef.current?.()
    }

    const handleError = () => {
      setHasError(true)
      setIsLoading(false)
      setIsPlaying(false)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    if (autoPlay) {
      audio.play().catch(() => {
        // Autoplay blocked by browser policy, waiting for user gesture
      })
    }

    return () => {
      audio.pause()
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.src = ''
      audioRef.current = null
    }
  }, [trackUrl, autoPlay])

  const play = useCallback(async () => {
    if (!audioRef.current) return
    try {
      setIsLoading(true)
      await audioRef.current.play()
      setIsPlaying(true)
      setIsLoading(false)
    } catch {
      setIsPlaying(false)
      setIsLoading(false)
    }
  }, [])

  const pause = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume))
    setVolumeState(clamped)
    if (audioRef.current) {
      audioRef.current.volume = clamped
    }
  }, [])

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    hasError,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
  }
}
