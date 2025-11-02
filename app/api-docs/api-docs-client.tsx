"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Search, Download, Home } from "lucide-react"
import { searching, spotifydl } from "@/lib/spotify"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/Footer"

interface SearchResult {
  status: boolean
  data?: Array<{ id: string; name: string; artists: Array<{ name: string }> }> | null
  msg?: string
}

interface DownloadResult {
  status: boolean
  data?: {
    title: string
    type: string
    artist: string
    duration: string
    image: string
    download: string
  } | null
  msg?: string
}

export default function ApiDocsClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [downloadLink, setDownloadLink] = useState("")
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [downloadResult, setDownloadResult] = useState<DownloadResult | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSearchTry = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Query kosong",
        description: "Masukkan query pencarian terlebih dahulu.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    try {
      const result = await searching(searchQuery)
      setSearchResult(result)
      toast({
        title: result.status ? "Pencarian berhasil" : "Pencarian gagal",
        description: result.status ? `Ditemukan ${result.data?.length || 0} lagu` : result.msg,
        variant: result.status ? "default" : "destructive",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mencari.",
        variant: "destructive",
      })
      setSearchResult({ status: false, msg: "Error occurred" })
    } finally {
      setIsSearching(false)
    }
  }

  const handleDownloadTry = async () => {
    if (!downloadLink.trim()) {
      toast({
        title: "Link kosong",
        description: "Masukkan link Spotify terlebih dahulu.",
        variant: "destructive",
      })
      return
    }

    setIsDownloading(true)
    try {
      const result = await spotifydl(downloadLink)
      setDownloadResult({ status: true, data: result })
      toast({
        title: "Download link berhasil dibuat",
        description: "Link download telah tersedia.",
      })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Terjadi kesalahan"
      setDownloadResult({ status: false, msg: errorMsg })
      toast({
        title: "Download gagal",
        description: errorMsg,
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen p-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 music-gradient rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold music-gradient-text">API Documentation</h1>
                  <p className="text-muted-foreground">Dokumentasi dan testing API endpoint</p>
                </div>
              </div>
              <Button onClick={() => router.push("/")} variant="outline" className="gap-2">
                <Home className="w-4 h-4" />
                Kembali
              </Button>
            </div>
          </div>

          {/* API Endpoints */}
          <Tabs defaultValue="search" className="space-y-6 animate-fade-in">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search" className="gap-2">
                <Search className="w-4 h-4" />
                Search API
              </TabsTrigger>
              <TabsTrigger value="download" className="gap-2">
                <Download className="w-4 h-4" />
                Download API
              </TabsTrigger>
            </TabsList>

            {/* Search API */}
            <TabsContent value="search" className="space-y-4">
              <Card className="glass-effect border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-accent" />
                    POST /api/search
                  </CardTitle>
                  <CardDescription>Mencari lagu di Spotify berdasarkan query</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Parameters */}
                  <div>
                    <h3 className="font-semibold mb-2">Parameters</h3>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <div className="flex gap-2">
                        <code className="text-accent">query</code>
                        <span className="text-muted-foreground">(string, required)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Kata kunci pencarian lagu</p>
                    </div>
                  </div>

                  {/* Try it out */}
                  <div>
                    <h3 className="font-semibold mb-2">Try it out</h3>
                    <div className="space-y-3">
                      <Input
                        placeholder="Masukkan query pencarian..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearchTry()}
                      />
                      <Button onClick={handleSearchTry} disabled={isSearching} variant="music" className="w-full">
                        {isSearching ? "Mencari..." : "Coba Sekarang"}
                      </Button>
                    </div>
                  </div>

                  {/* Response */}
                  {searchResult && (
                    <div>
                      <h3 className="font-semibold mb-2">Response</h3>
                      <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                        {JSON.stringify(searchResult, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Download API */}
            <TabsContent value="download" className="space-y-4">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-primary" />
                    POST /api/download
                  </CardTitle>
                  <CardDescription>Mendapatkan link download lagu dari Spotify URL</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Parameters */}
                  <div>
                    <h3 className="font-semibold mb-2">Parameters</h3>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <div className="flex gap-2">
                        <code className="text-primary">link</code>
                        <span className="text-muted-foreground">(string, required)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">URL Spotify track</p>
                    </div>
                  </div>

                  {/* Try it out */}
                  <div>
                    <h3 className="font-semibold mb-2">Try it out</h3>
                    <div className="space-y-3">
                      <Input
                        placeholder="Masukkan Spotify URL..."
                        value={downloadLink}
                        onChange={(e) => setDownloadLink(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleDownloadTry()}
                      />
                      <Button onClick={handleDownloadTry} disabled={isDownloading} variant="music" className="w-full">
                        {isDownloading ? "Memproses..." : "Coba Sekarang"}
                      </Button>
                    </div>
                  </div>

                  {/* Response */}
                  {downloadResult && (
                    <div>
                      <h3 className="font-semibold mb-2">Response</h3>
                      <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                        {JSON.stringify(downloadResult, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Usage Example */}
          <Card className="glass-effect border-secondary/20 animate-fade-in mt-6">
            <CardHeader>
              <CardTitle>Contoh Penggunaan</CardTitle>
              <CardDescription>Cara menggunakan API dengan JavaScript</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                {`// Search API
const searchMusic = async (query) => {
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  return await response.json();
};

// Download API
const downloadMusic = async (link) => {
  const response = await fetch('/api/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link })
  });
  return await response.json();
};`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
