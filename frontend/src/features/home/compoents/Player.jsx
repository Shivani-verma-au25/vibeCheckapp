import React, { useRef, useState, useEffect } from 'react'

import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaForward,
  FaBackward,
} from "react-icons/fa";

import { FiClock } from "react-icons/fi";
import { useSongs } from '../hooks/useSongs';



const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}


const Player = () => {
  const { songs, currentSong, playNext, playPrevious, selectSong } = useSongs()

  const audioRef = useRef(null)
  const progressRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)
  const [showSpeed, setShowSpeed] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Reset player when song changes
  useEffect(() => {
    // if (audioRef.current) {
    //     audioRef.current.load()
    //     setIsPlaying(false)
    //     setCurrentTime(0)
    // }

    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    // this will update scr manually 
    // audio.src = currentSong.url;
    setCurrentTime(0);
    // setIsPlaying(false);

    audio.load();

    // automatically play the song
    const playSong = async () => {
        try {
            await audio.play();
            setIsPlaying(true);
        } catch (error) {
            console.log("Autoplay blocked:", error);
            
            setIsPlaying(false);
        }
    };

    playSong();

  }, [currentSong?.url])


  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skip = (secs) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(Math.max(audio.currentTime + secs, 0), duration)
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  const handleProgressClick = (e) => {
    const bar = progressRef.current
    const rect = bar.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const newTime = ratio * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleSpeedChange = (s) => {
    setSpeed(s)
    audioRef.current.playbackRate = s
    setShowSpeed(false)
  }

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    audioRef.current.volume = val
    setIsMuted(val === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (isMuted) {
      audio.volume = volume || 0.5
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const handleSongEnd = () => {
    setIsPlaying(false)
    setCurrentTime(0);
    // playnext
    playNext();
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  if (!songs) return null
 


  return (
  <div className="fixed inset-x-0 bottom-19 sm:bottom-0 z-50 border-t border-white/10 bg-black/95 backdrop-blur-xl">
{/* //   <div className="fixed left-0 right-0 bottom-19 lg:bottom-0 z-50 border-t border-white/10 bg-black/95 backdrop-blur-xl"> */}

    <audio
      ref={audioRef}
      src={currentSong?.url}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleSongEnd}
    />

    <div className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-5 sm:py-4">

      {/* ================= MOBILE / DESKTOP CONTENT ================= */}

      <div className="flex flex-col gap-3 md:grid md:grid-cols-[260px_1fr_220px] md:items-center md:gap-6">

        {/* ================= SONG INFO ================= */}

        <div className="flex min-w-0 items-center gap-3">

          <img
            src={currentSong?.posterUrl}
            alt={currentSong?.title || "Song"}
            className="h-12 w-12 shrink-0 rounded-lg object-cover shadow-lg sm:h-14 sm:w-14"
          />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white sm:text-base">
              {currentSong?.title || "There is no song"}
            </h3>

            <p className="mt-0.5 truncate text-xs text-gray-400">
              {currentSong?.mood
                ? `Mood: ${currentSong.mood}`
                : "No mood"}
            </p>
          </div>

        </div>


        {/* ================= CENTER ================= */}

        <div className="flex min-w-0 flex-col gap-2">

          {/* Progress */}

          <div className="flex items-center gap-2">

            <span className="w-8 shrink-0 text-right text-[10px] text-gray-400 sm:w-10 sm:text-xs">
              {formatTime(currentTime)}
            </span>

            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/10 sm:h-2"
            >

              <div
                className="absolute left-0 top-0 h-full rounded-full bg-white"
                style={{
                  width: `${progress}%`,
                }}
              />

              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-lg sm:h-4 sm:w-4"
                style={{
                  left: `calc(${progress}% - 6px)`,
                }}
              />

            </div>

            <span className="w-8 shrink-0 text-[10px] text-gray-400 sm:w-10 sm:text-xs">
              {formatTime(duration)}
            </span>

          </div>


          {/* Controls */}

          <div className="flex items-center justify-center gap-5">

            {/* Previous / Back 5 sec */}

            <button
              onClick={() => skip(-5)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-black sm:h-10 sm:w-10"
              title="Back 5 seconds"
            >
              <FaBackward size={10} />
            </button>


            {/* Play / Pause */}

            <button
              onClick={togglePlay}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 sm:h-12 sm:w-12"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <FaPause size={15} />
              ) : (
                <FaPlay size={15} />
              )}
            </button>


            {/* Forward 5 sec */}

            <button
              onClick={() => skip(5)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-black sm:h-10 sm:w-10"
              title="Forward 5 seconds"
            >
              <FaForward size={10} />
            </button>

          </div>

        </div>


        {/* ================= RIGHT CONTROLS ================= */}

        <div className="flex items-center justify-center gap-4 md:justify-end">

          {/* Speed */}

          <div className="relative">

            <button
              onClick={() => setShowSpeed(!showSpeed)}
              className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs text-white transition hover:bg-white/20 sm:px-3 sm:py-2 sm:text-sm"
            >
              {speed}x
            </button>

            {showSpeed && (
              <div className="absolute bottom-10 right-0 z-50 flex w-20 flex-col overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-xl">

                {SPEED_OPTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSpeedChange(item)}
                    className={`px-3 py-2 text-xs transition sm:text-sm ${
                      item === speed
                        ? "bg-white text-black"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item}x
                  </button>
                ))}

              </div>
            )}

          </div>


          {/* Volume */}

          <div className="flex items-center gap-2">

            <button
              onClick={toggleMute}
              className="text-white transition hover:text-gray-300"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <FaVolumeMute size={18} />
              ) : (
                <FaVolumeUp size={18} />
              )}
            </button>

            {/* Hide slider on very small screens */}

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="hidden w-20 accent-white sm:block"
            />

          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default Player



