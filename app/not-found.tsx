import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Music, Search } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 Not Found",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
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
      <div className="relative z-10 max-w-lg w-full">
        <Card className="p-8 text-center glass-effect border-accent/20 animate-scale-in">
          {/* Animated 404 Number */}
          <div className="relative mb-8">
            <div className="text-8xl font-bold music-gradient-text animate-bounce-in">404</div>
            <div className="absolute inset-0 text-8xl font-bold text-accent/20 animate-pulse">404</div>
          </div>
          {/* Musical Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="w-20 h-20 music-gradient rounded-full flex items-center justify-center floating animate-glow">
              <Music className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-accent/30 pulse-ring" />
          </div>
          {/* Content */}
          <h1 className="text-2xl font-bold mb-2 animate-fade-in">404 Not Found</h1>
          <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Sepertinya halaman yang Anda cari sedang tidak bernada. Mari kembali ke musik!
          </p>
          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <Button asChild variant="music" className="flex items-center gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
              <Link href="/">
                <Search className="w-4 h-4" />
                Cari Musik
              </Link>
            </Button>
          </div>
          {/* Decorative elements */}
          <div
            className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/20 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          />
        </Card>
      </div>
    </div>
  )
}
