"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Terminal } from "lucide-react"
import { gsap } from "gsap"

interface MusicEvent {
  id: string
  type: string
  message: string
  timestamp: string
}

export function MusicVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState("Coding Vibes")
  const [events, setEvents] = useState<MusicEvent[]>([])
  const [volume, setVolume] = useState(75)

  const visualizerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  const musicTracks = [
    "Coding Vibes",
    "Focus Flow",
    "Digital Dreams",
    "Syntax Symphony",
    "Algorithm Beats",
    "Binary Ballad",
  ]

  const eventTypes = [
    { type: "BEAT_DROP", messages: ["🎵 Beat drop detected", "🔥 Energy spike!", "💫 Rhythm intensifies"] },
    { type: "FREQUENCY_PEAK", messages: ["📊 High frequency peak", "🎼 Treble boost", "✨ Crystal clear highs"] },
    { type: "BASS_BOOST", messages: ["🔊 Bass line pumping", "🎸 Low-end thunder", "💥 Sub-bass detected"] },
    { type: "TEMPO_CHANGE", messages: ["⏱️ Tempo shift detected", "🎯 BPM variation", "🔄 Rhythm evolution"] },
    { type: "HARMONY_SYNC", messages: ["🎹 Harmonic convergence", "🎵 Perfect pitch alignment", "🌟 Musical harmony"] },
    { type: "VOCAL_DETECT", messages: ["🎤 Vocal presence", "👨‍🎤 Artist expression", "🗣️ Lyrical content"] },
    { type: "INSTRUMENT_SOLO", messages: ["🎸 Guitar solo!", "🥁 Drum break", "🎹 Piano melody"] },
    { type: "DYNAMIC_RANGE", messages: ["📈 Volume dynamics", "🔀 Audio compression", "📊 Signal processing"] },
    { type: "STEREO_FIELD", messages: ["🎧 Stereo imaging", "↔️ Spatial audio", "🌐 Surround effect"] },
    { type: "REVERB_TAIL", messages: ["🌊 Reverb decay", "🏛️ Acoustic space", "✨ Ambient texture"] },
  ]

  const addEvent = (type: string, message: string) => {
    const newEvent: MusicEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
    }

    setEvents((prev) => [newEvent, ...prev.slice(0, 19)]) // Keep only last 20 events
  }

  const generateRandomEvent = () => {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const message = eventType.messages[Math.floor(Math.random() * eventType.messages.length)]
    addEvent(eventType.type, message)
  }

  const createVisualizerBars = () => {
    if (!barsRef.current) return

    const bars = []
    for (let i = 0; i < 32; i++) {
      bars.push(
        <div
          key={i}
          className="visualizer-bar bg-gradient-to-t from-purple-600 via-blue-500 to-cyan-400 rounded-full"
          style={{
            width: "3px",
            height: "20px",
            transformOrigin: "bottom",
            opacity: 0.7,
          }}
        />,
      )
    }
    return bars
  }

  useEffect(() => {
    if (!visualizerRef.current || !circleRef.current || !barsRef.current) return

    // Create pulsing circle animation
    const circleAnimation = gsap.timeline({ repeat: -1 })
    circleAnimation
      .to(circleRef.current, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .to(circleRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut",
      })

    // Create visualizer bars animation
    const bars = barsRef.current.querySelectorAll(".visualizer-bar")

    if (isPlaying) {
      bars.forEach((bar, index) => {
        gsap.to(bar, {
          scaleY: () => Math.random() * 3 + 0.5,
          duration: 0.1 + Math.random() * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.02,
        })
      })

      // Generate events while playing
      const eventInterval = setInterval(
        () => {
          if (Math.random() > 0.3) {
            // 70% chance to generate event
            generateRandomEvent()
          }
        },
        800 + Math.random() * 1200,
      ) // Random interval between 0.8-2s

      return () => {
        clearInterval(eventInterval)
        gsap.killTweensOf(bars)
      }
    } else {
      gsap.to(bars, {
        scaleY: 0.2,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    return () => {
      circleAnimation.kill()
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      addEvent("PLAYBACK_START", `🎵 Now playing: ${currentTrack}`)
      // Change track occasionally
      if (Math.random() > 0.7) {
        const newTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)]
        setCurrentTrack(newTrack)
        addEvent("TRACK_CHANGE", `🔄 Switched to: ${newTrack}`)
      }
    } else {
      addEvent("PLAYBACK_STOP", "⏸️ Playback paused")
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    addEvent("VOLUME_CHANGE", isMuted ? "🔊 Audio unmuted" : "🔇 Audio muted")
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    addEvent("VOLUME_ADJUST", `🎚️ Volume set to ${newVolume}%`)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Music Player Card */}
      <Card className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 border-purple-500/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Visualizer Circle */}
            <div className="relative flex-shrink-0">
              <div
                ref={visualizerRef}
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-1 shadow-lg"
              >
                <div
                  ref={circleRef}
                  className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center relative overflow-hidden"
                >
                  <span className="text-4xl sm:text-5xl z-10">🎵</span>

                  {/* Rotating background effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 rounded-full ${isPlaying ? "animate-spin" : ""}`}
                    style={{ animationDuration: "8s" }}
                  />
                </div>
              </div>

              {/* Visualizer Bars */}
              <div
                ref={barsRef}
                className="absolute -inset-8 flex items-end justify-center gap-1"
                style={{ transform: "rotate(0deg)" }}
              >
                <div className="flex items-end gap-1 transform rotate-0">{createVisualizerBars()}</div>
              </div>
            </div>

            {/* Controls and Info */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{currentTrack}</h3>
                <p className="text-purple-300 text-sm sm:text-base">
                  {isPlaying ? "🎵 Now Playing" : "⏸️ Paused"} • Focus Music
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 p-0"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>

                <Button
                  onClick={toggleMute}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>

                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${volume}%, #374151 ${volume}%, #374151 100%)`,
                    }}
                  />
                  <span className="text-purple-300 text-sm w-8">{volume}</span>
                </div>
              </div>

              {/* Audio Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-black/30 rounded-lg p-2">
                  <div className="text-cyan-400 font-mono text-sm">BPM</div>
                  <div className="text-white font-bold">{isPlaying ? Math.floor(Math.random() * 40) + 120 : "--"}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-2">
                  <div className="text-green-400 font-mono text-sm">FREQ</div>
                  <div className="text-white font-bold">{isPlaying ? Math.floor(Math.random() * 20) + 40 : "--"}Hz</div>
                </div>
                <div className="bg-black/30 rounded-lg p-2">
                  <div className="text-yellow-400 font-mono text-sm">AMP</div>
                  <div className="text-white font-bold">{isPlaying ? Math.floor(Math.random() * 30) + 70 : "--"}%</div>
                </div>
                <div className="bg-black/30 rounded-lg p-2">
                  <div className="text-purple-400 font-mono text-sm">QUAL</div>
                  <div className="text-white font-bold">320k</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terminal Events */}
      <Card className="bg-black border-gray-700 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-mono text-sm">Audio Event Monitor</span>
            <div className="flex gap-1 ml-auto">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div
            ref={terminalRef}
            className="font-mono text-xs sm:text-sm space-y-1 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          >
            {events.length === 0 ? (
              <div className="text-gray-500 italic">Waiting for audio events... Press play to start monitoring.</div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="flex items-start gap-2 py-1">
                  <span className="text-gray-500 text-xs">[{event.timestamp}]</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      event.type === "BEAT_DROP"
                        ? "bg-red-900/30 text-red-300"
                        : event.type === "FREQUENCY_PEAK"
                          ? "bg-blue-900/30 text-blue-300"
                          : event.type === "BASS_BOOST"
                            ? "bg-purple-900/30 text-purple-300"
                            : event.type === "TEMPO_CHANGE"
                              ? "bg-yellow-900/30 text-yellow-300"
                              : event.type === "HARMONY_SYNC"
                                ? "bg-green-900/30 text-green-300"
                                : "bg-gray-900/30 text-gray-300"
                    }`}
                  >
                    {event.type}
                  </span>
                  <span className="text-gray-300 flex-1">{event.message}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
