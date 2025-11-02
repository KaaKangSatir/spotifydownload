"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Music, Play, Pause, ExternalLink, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TrackCardProps {
  track: {
    id: string
    title: string
    type: string
    artist: string
    duration: number
    thumbnail: string
    url: string
    album: string
    download?: string
  }
}

export function TrackCard({ track }: TrackCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => setIsPlaying(false)
      audioRef.current.addEventListener("ended", handleEnded)
      return () => {
        audioRef.current?.removeEventListener("ended", handleEnded)
      }
    }
  }, [audioUrl])

  const handlePlayPause = async () => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      if (!audioUrl) {
        setIsLoadingAudio(true)
        try {
          const response = await fetch(`/api/download?link=${encodeURIComponent(track.url)}`)
          const data = await response.json()

          if (data.download && !data.download.includes("undefined")) {
            setAudioUrl(data.download)
            const audio = new Audio(data.download)
            audioRef.current = audio
            await audio.play()
            setIsPlaying(true)
          } else {
            toast({
              title: "Server lagi error",
              description: "Tidak dapat memutar audio saat ini. Silakan coba lagi nanti.",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Audio playback error:", error)
          toast({
            title: "Server lagi error",
            description: "Tidak dapat memutar audio saat ini. Silakan coba lagi nanti.",
            variant: "destructive",
          })
        } finally {
          setIsLoadingAudio(false)
        }
      } else {
        try {
          await audioRef.current?.play()
          setIsPlaying(true)
        } catch (error) {
          console.error("Audio playback error:", error)
          toast({
            title: "Server lagi error",
            description: "Tidak dapat memutar audio saat ini.",
            variant: "destructive",
          })
        }
      }
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(`/api/download?link=${encodeURIComponent(track.url)}`)
      const data = await response.json()

      if (data.download && !data.download.includes("undefined")) {
        window.open(data.download, "_blank")
        toast({
          title: "Download dimulai",
          description: `Mengunduh "${track.title}"`,
        })
      } else {
        toast({
          title: "Server lagi error",
          description: "Tidak dapat mengunduh saat ini. Silakan coba lagi nanti.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Server lagi error",
        description: "Tidak dapat mengunduh saat ini. Silakan coba lagi nanti.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Card className="glass-effect border-accent/20 hover:border-accent/50 transition-all duration-300 overflow-hidden group">
      <div className="flex gap-4 p-4">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg">
          {track.thumbnail ? (
            <img
              src={track.thumbnail || "/placeholder.svg"}
              alt={track.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full music-gradient flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-accent/50"
              onClick={handlePlayPause}
              disabled={isLoadingAudio}
            >
              {isLoadingAudio ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate group-hover:text-accent transition-colors">{track.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
          <p className="text-xs text-muted-foreground/80 truncate mb-2">{track.album}</p>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>Type: {track.type}</span>
              <span>•</span>
              <span>Durasi: {track.duration}ms</span>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="music" className="flex-1 gap-2" asChild>
                <a href={track.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Buka di Spotify</span>
                  <span className="sm:hidden">Spotify</span>
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2 bg-transparent"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span className="hidden sm:inline">{isDownloading ? "Downloading..." : "Download"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
