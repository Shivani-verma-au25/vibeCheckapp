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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 backdrop-blur-xl">
      <audio
        ref={audioRef}
        // src={songs.url}
        src={currentSong?.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Song Info */}
        <div className="flex items-center gap-4 min-w-[250px]">
          <img
            // src={songs.posterUrl}
            src={currentSong?.posterUrl}
            // alt={songs.title}         
            alt={currentSong?.title}
            className="h-16 w-16 rounded-xl object-cover shadow-lg"
          />

          <div>
            <h3 className="font-semibold text-white">
              {currentSong?.title}
            </h3>

            <p className="text-sm text-gray-400">
              Mood : {currentSong?.mood}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-1 flex-col gap-2">

          <div className="flex items-center gap-3">

            <span className="text-xs text-gray-400">
              {formatTime(currentTime)}
            </span>

            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="relative h-2 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/10"
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-white"
                style={{
                  width: `${progress}%`,
                }}
              />

              <div
                className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-lg"
                style={{
                  left: `calc(${progress}% - 8px)`,
                }}
              />
            </div>

            <span className="text-xs text-gray-400">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls */}

          <div className="flex items-center justify-center gap-5">

            <button
              onClick={() => skip(-5)}
              className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white hover:text-black"
            >
              <FaBackward />
            </button>

            <button
              onClick={togglePlay}
              className="rounded-full bg-white p-5 text-black transition hover:scale-110"
            >
              {isPlaying ? (
                <FaPause size={24} />
              ) : (
                <FaPlay size={24} />
              )}
            </button>

            <button
              onClick={() => skip(5)}
              className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white hover:text-black"
            >
              <FaForward />
            </button>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          {/* Speed */}

          <div className="relative">

            <button
              onClick={() => setShowSpeed(!showSpeed)}
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white"
            >
              {speed}x
            </button>

            {showSpeed && (
              <div className="absolute bottom-12 right-0 flex w-20 flex-col overflow-hidden rounded-lg border border-white/10 bg-zinc-900">

                {SPEED_OPTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSpeedChange(item)}
                    className={`px-4 py-2 text-sm transition ${item === speed
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

          <div className="flex items-center gap-3">

            <button
              onClick={toggleMute}
              className="text-white"
            >
              {isMuted ? (
                <FaVolumeMute size={20} />
              ) : (
                <FaVolumeUp size={20} />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="w-24 accent-white"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Player


// ------------------------------------------------------


{/* <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 backdrop-blur-3xl">

    <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">

        <SongInfo />

        <Controls />

        <VolumeControl />

    </div>

</div> */}
