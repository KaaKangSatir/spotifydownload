"use client"

import { type ReactNode, useEffect, useState } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Use startTransition to mark state update as non-urgent
    const timer = requestAnimationFrame(() => {
      setIsReady(true)
    })

    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isReady ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
      }`}
    >
      {children}
    </div>
  )
}
