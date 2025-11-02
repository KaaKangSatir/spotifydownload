"use client"

import { useEffect, useState } from "react"
import { Music } from "lucide-react"

export function WelcomeAnimation() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-8 animate-bounce-in">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto music-gradient rounded-full flex items-center justify-center animate-pulse-slow">
            <Music className="w-16 h-16 text-white animate-bounce-gentle" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-accent/30 animate-ping" />
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold music-gradient-text animate-fade-in">Selamat Datang</h1>
          <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "500ms" }}>
            di Unduh Musik Spotify
          </p>
        </div>

        {/* Loading Animation */}
        <div
          className="w-64 h-1 bg-muted rounded-full mx-auto overflow-hidden animate-fade-in"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="h-full music-gradient animate-slide-in-right"></div>
        </div>
      </div>
    </div>
  )
}
