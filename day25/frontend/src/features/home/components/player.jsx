import React, { useEffect, useRef, useState } from 'react'
import { useSong } from '../hooks/usesong'
import './player.scss'

const Player = () => {
  const { song } = useSong()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Format time to MM:SS
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Forward 5 seconds
  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 5,
        duration
      )
    }
  }

  // Backward 5 seconds
  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 5,
        0
      )
    }
  }

  // Update progress bar
  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Update time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Set duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Reset when song changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    setCurrentTime(0)
  }, [song.url])

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Song Info */}
      <div className="song-info">
        <div className="album-art">
          <img src={song.profile} alt={song.title} />
        </div>
        <div className="song-details">
          <h3 className="song-title">{song.title}</h3>
          <p className="song-mood">{song.mood}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <input
          type="range"
          min="0"
          max="100"
          value={progressPercent}
          onChange={handleProgressChange}
          className="progress-bar"
        />
        <div className="time-display">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="duration">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="control-btn backward-btn" onClick={handleBackward} title="Backward 5s">
          <span className="icon">⏮</span>
          <span className="label">-5s</span>
        </button>

        <button className="control-btn play-btn" onClick={togglePlay} title="Play/Pause">
          <span className="icon">{isPlaying ? '⏸' : '▶'}</span>
        </button>

        <button className="control-btn forward-btn" onClick={handleForward} title="Forward 5s">
          <span className="icon">⏭</span>
          <span className="label">+5s</span>
        </button>
      </div>
    </div>
  )
}

export default Player
