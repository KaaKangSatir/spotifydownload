"use client"
import { useState } from "react"
import { SearchBar } from "@/components/SearchBar"
import { TrackCard } from "@/components/TrackCard"
import { LoadingState } from "@/components/LoadingState"
import { WelcomeAnimation } from "@/components/WelcomeAnimation"
import { Footer } from "@/components/Footer"
import { searching, getInfo } from "@/lib/spotify"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"

export default function ClientPage() {
  const [tracks, setTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    try {
      const result = await searching(query)

      if (result.status) {
        setTracks(result.data)
        toast({
          title: "Pencarian selesai",
          description: `Ditemukan ${result.data.length} lagu untuk "${query}"`,
        })
      } else {
        setTracks([])
        toast({
          title: "Tidak ada hasil",
          description: result.msg || "Coba cari dengan kata kunci yang berbeda.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: "Pencarian gagal",
        description: "Terjadi kesalahan saat mencari. Silakan coba lagi.",
        variant: "destructive",
      })
      setTracks([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true)
    try {
      const result = await getInfo(url)

      if (result.status) {
        setTracks([result.data])
        toast({
          title: "Lagu ditemukan",
          description: `Berhasil memuat "${result.data.title}"`,
        })
      } else {
        setTracks([])
        toast({
          title: "URL tidak valid",
          description: result.msg || "Silakan periksa URL Spotify dan coba lagi.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("URL error:", error)
      toast({
        title: "Gagal memuat lagu",
        description: "Terjadi kesalahan saat memuat lagu. Silakan coba lagi.",
        variant: "destructive",
      })
      setTracks([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <WelcomeAnimation />
      <div className="min-h-screen p-4 sm:p-6 md:p-8 relative overflow-hidden animate-fade-in">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 px-2 sm:px-4">
          {/* Header with Search */}
          <div className="mb-8 sm:mb-12 animate-fade-in">
            <div className="flex justify-end mb-4">
              <Button
                onClick={() => router.push("/api-docs")}
                variant="outline"
                className="gap-2 glass-effect border-accent/30 hover:border-accent/50 transition-all text-sm sm:text-base"
              >
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">API Docs</span>
                <span className="sm:hidden">API</span>
              </Button>
            </div>
            <SearchBar onSearch={handleSearch} onUrlSubmit={handleUrlSubmit} isLoading={isLoading} />
          </div>

          {/* Results Section */}
          <div className="max-w-4xl mx-auto px-2 sm:px-0">
            {isLoading ? (
              <LoadingState />
            ) : tracks.length > 0 ? (
              <div className="space-y-3 sm:space-y-4 animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 animate-slide-up music-gradient-text">
                  {tracks.length === 1 ? "Lagu Ditemukan" : `${tracks.length} Lagu Ditemukan`}
                </h2>
                {tracks.map((track, index) => (
                  <div
                    key={track.id || index}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TrackCard track={track} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 animate-bounce-in px-4">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 music-gradient rounded-full flex items-center justify-center floating animate-glow">
                    <div className="text-white text-3xl sm:text-4xl">🎵</div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-accent/30 pulse-ring" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 animate-fade-in">Siap mengunduh musik?</h3>
                <p
                  className="text-sm sm:text-base text-muted-foreground animate-fade-in"
                  style={{ animationDelay: "200ms" }}
                >
                  Cari lagu favorit Anda atau tempelkan link Spotify untuk memulai.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
