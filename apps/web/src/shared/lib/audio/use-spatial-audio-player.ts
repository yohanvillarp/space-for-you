import { useState, useEffect, useRef, useCallback, useId } from 'react'

export interface UseSpatialAudioPlayerOptions {
  trackUrl?: string
  initialVolume?: number
  loop?: boolean
  autoPlay?: boolean
  onEnded?: () => void
}

type ActiveSpatialPlayer = {
  id: string
  pause: () => void
}

let activeSpatialPlayer: ActiveSpatialPlayer | null = null

export function stopAllSpatialAudioExcept(id?: string) {
  if (activeSpatialPlayer && activeSpatialPlayer.id !== id) {
    activeSpatialPlayer.pause()
    activeSpatialPlayer = null
  }
}

export function useSpatialAudioPlayer({
  trackUrl,
  initialVolume = 0.8,
  loop = false,
  autoPlay = false,
  onEnded,
}: UseSpatialAudioPlayerOptions = {}) {
  const playerId = useId()
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
    const cleanUrl = trackUrl?.trim()
    if (!cleanUrl) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeAttribute('src')
        audioRef.current.load()
        audioRef.current = null
      }
      return
    }

    const audio = new Audio(cleanUrl)
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
      if (activeSpatialPlayer && activeSpatialPlayer.id !== playerId) {
        activeSpatialPlayer.pause()
      }
      activeSpatialPlayer = {
        id: playerId,
        pause: () => {
          if (audioRef.current) audioRef.current.pause()
          setIsPlaying(false)
        },
      }
      setIsPlaying(true)
      setIsLoading(false)
    }

    const handlePause = () => {
      if (activeSpatialPlayer?.id === playerId) {
        activeSpatialPlayer = null
      }
      setIsPlaying(false)
    }

    const handleEnded = () => {
      if (activeSpatialPlayer?.id === playerId) {
        activeSpatialPlayer = null
      }
      setIsPlaying(false)
      setCurrentTime(0)
      onEndedRef.current?.()
    }

    const handleError = () => {
      if (activeSpatialPlayer?.id === playerId) {
        activeSpatialPlayer = null
      }
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
      if (activeSpatialPlayer?.id === playerId) {
        activeSpatialPlayer = null
      }
      audio.pause()
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [trackUrl, autoPlay, playerId])

  const play = useCallback(async () => {
    if (!audioRef.current) return
    if (activeSpatialPlayer && activeSpatialPlayer.id !== playerId) {
      activeSpatialPlayer.pause()
      activeSpatialPlayer = null
    }
    try {
      setIsLoading(true)
      await audioRef.current.play()
      setIsPlaying(true)
      setIsLoading(false)
    } catch {
      setIsPlaying(false)
      setIsLoading(false)
    }
  }, [playerId])

  const pause = useCallback(() => {
    if (activeSpatialPlayer?.id === playerId) {
      activeSpatialPlayer = null
    }
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }, [playerId])

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
