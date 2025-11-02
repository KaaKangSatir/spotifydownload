import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Spotify Download",
}

export default function Home() {
  return <ClientPage />
}
