"use client"

import { Heart, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-background/80 backdrop-blur-lg border-t border-border/50 mt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </div>
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Musical decoration */}
          <div className="flex items-center gap-2 text-muted-foreground animate-fade-in">
            <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
            <div className="text-lg">🎵</div>
            <div className="w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
          </div>
          {/* Made by text */}
          <div className="flex items-center gap-2 text-center animate-slide-up">
            <span className="text-muted-foreground">Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-muted-foreground">by</span>
            <a
              href="https://github.com/kaakangsatir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-all duration-300 hover:scale-105 group"
            >
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              kaakangsatir
            </a>
          </div>
          {/* Copyright */}
          <div className="text-sm text-muted-foreground/60 animate-fade-in" style={{ animationDelay: "200ms" }}>
            © 2025 Spotify Downloader. All rights reserved.
          </div>
          {/* Decorative line */}
          <div
            className="w-24 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-fade-in"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </footer>
  )
}
