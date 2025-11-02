"use client"

import type React from "react"

import { useState } from "react"
import { Search, Link, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SearchBarProps {
  onSearch: (query: string) => void
  onUrlSubmit: (url: string) => void
  isLoading: boolean
}

export function SearchBar({ onSearch, onUrlSubmit, isLoading }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [spotifyUrl, setSpotifyUrl] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (spotifyUrl.trim()) {
      onUrlSubmit(spotifyUrl.trim())
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 music-gradient-text floating">Unduh Musik Spotify</h1>
        <p className="text-muted-foreground text-lg animate-slide-up">
          Cari lagu atau tempelkan link Spotify untuk mengunduh musik berkualitas tinggi
        </p>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 glass-effect animate-scale-in">
          <TabsTrigger
            value="search"
            className="flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            <Search className="w-4 h-4" />
            <span>Cari Lagu</span>
          </TabsTrigger>
          <TabsTrigger
            value="url"
            className="flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            <Link className="w-4 h-4" />
            <span>Link Spotify</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="animate-slide-in-left">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 h-12 rounded-md glass-effect focus-within:ring-2 focus-within:ring-accent/50 transition-all duration-300">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Cari lagu, artis, atau album..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              variant="music"
              size="lg"
              disabled={isLoading || !searchQuery.trim()}
              className="h-12"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="url" className="animate-slide-in-right">
          <form onSubmit={handleUrlSubmit} className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 h-12 rounded-md glass-effect focus-within:ring-2 focus-within:ring-accent/50 transition-all duration-300">
              <Link className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="url"
                placeholder="https://open.spotify.com/track/..."
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" variant="music" size="lg" disabled={isLoading || !spotifyUrl.trim()} className="h-12">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ambil Lagu"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
