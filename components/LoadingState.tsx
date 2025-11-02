"use client"

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-16 animate-fade-in">
      <div className="text-center space-y-6">
        <div className="relative w-24 h-24 mx-auto">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-accent/50 animate-spin" />

          {/* Middle pulsing ring */}
          <div className="absolute inset-3 rounded-full border-2 border-accent/30 animate-pulse" />

          {/* Inner gradient spinner */}
          <div
            className="absolute inset-6 music-gradient rounded-full animate-spin opacity-70"
            style={{ animationDirection: "reverse", animationDuration: "2s" }}
          />

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg font-medium text-foreground">Mencari musik</span>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </span>
          </div>
          <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Harap tunggu, sedang memproses...
          </p>
        </div>
      </div>
    </div>
  )
}
