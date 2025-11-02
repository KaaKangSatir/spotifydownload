// app/api/search/route.js
import axios from "axios"
import { NextResponse } from "next/server"

const SPOTIFY_CLIENT_ID = "4c4fc8c3496243cbba99b39826e2841f"
const SPOTIFY_CLIENT_SECRET = "d598f89aba0946e2b85fb8aefa9ae4c8"

async function spotifyCreds() {
  try {
    const tokenResponse = await axios.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", {
      headers: {
        Authorization: "Basic " + btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    if (!tokenResponse.data.access_token)
      return {
        creator: "KaaKangSatir",
        status: false,
        msg: "Can't generate token!",
      }

    return {
      creator: "KaaKangSatir",
      status: true,
      data: tokenResponse.data,
    }
  } catch (e) {
    return {
      creator: "KaaKangSatir",
      status: false,
      msg: e.message,
    }
  }
}

async function getInfo(url) {
  try {
    const creds = await spotifyCreds()
    if (!creds.status) return creds

    const trackId = url.split("track/")[1]
    const trackRes = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: "Bearer " + creds.data.access_token,
      },
    })

    const json = trackRes.data

    return {
      creator: "Budy x creator",
      status: true,
      data: {
        thumbnail: json.album.images[0]?.url || "/placeholder.svg",
        title: json.artists[0].name + " - " + json.name,
        artist: json.artists[0],
        duration: json.duration_ms,
        preview: json.preview_url,
      },
    }
  } catch (e) {
    return {
      creator: "KaaKangSatir",
      status: false,
      msg: e.message,
    }
  }
}

async function searching(query, type = "track", limit = 20) {
  try {
    const creds = await spotifyCreds()
    if (!creds.status) return creds

    const searchRes = await axios.get(
      `https://api.spotify.com/v1/search?query=${encodeURIComponent(query)}&type=${type}&offset=0&limit=${limit}`,
      {
        headers: {
          Authorization: "Bearer " + creds.data.access_token,
        },
      },
    )

    const json = searchRes.data

    if (!json.tracks.items || json.tracks.items.length < 1)
      return {
        creator: "KaaKangSatir",
        status: false,
        msg: "Music not found!",
      }

    const data = json.tracks.items.map((v) => ({
      title: v.album.artists[0].name + " - " + v.name,
      duration: v.duration_ms,
      popularity: v.popularity + "%",
      preview: v.preview_url,
      artist: v.artists[0].name,
      url: v.external_urls.spotify,
      album: v.album.name,
      thumbnail: v.album.images[0]?.url || "/placeholder.svg",
      release_date: v.album.release_date,
      type: v.type,
    }))

    return {
      creator: "KaaKangSatir",
      status: true,
      data,
    }
  } catch (e) {
    return {
      creator: "KaaKangSatir",
      status: false,
      msg: e.message,
    }
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter required" }, { status: 400 })
  }

  try {
    const result = await searching(query)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
