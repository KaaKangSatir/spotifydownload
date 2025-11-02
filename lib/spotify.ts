import axios from "axios"

const API_BASE_URL = "/api"

interface SearchData {
  title: string
  duration: string // Changed from number to string since API now returns converted duration
  popularity: string
  preview: null | string
  artist: string
  url: string
  thumbnail: string
  album: string
  release_date: string
  type: string // Added type field
}

function convert(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
}

function transformSearchData(data: SearchData): Track {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: data.title,
    duration: data.duration, // No need to convert, already converted by API
    popularity: data.popularity,
    preview: data.preview,
    artist: data.artist,
    thumbnail: data.thumbnail || "/placeholder.svg",
    url: data.url,
    album: data.album,
    release_date: data.release_date,
    type: data.type, // Added type field
  }
}

interface DownloadData {
  title: string
  type: string
  artis: string
  durasi: string
  image: string
  download: string
}

interface Track {
  id: string
  title: string
  duration: string
  popularity: string
  preview: null | string
  artist: string
  url: string
  album: string
  thumbnail: string
  download?: string
  release_date: string
  type: string // Added type field
}

export async function searching(query: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { query },
      timeout: 30000,
    })

    if (response.data.status && response.data.data) {
      const tracks = (response.data.data as SearchData[]).map(transformSearchData)
      return {
        status: true,
        data: tracks,
      }
    }

    return {
      status: false,
      msg: response.data.msg || "Pencarian gagal",
    }
  } catch (error) {
    const err = error as { response?: { data?: { msg: string } }; message?: string }
    console.error("Search error:", err)
    return {
      status: false,
      msg: err.response?.data?.msg || err.message || "Terjadi kesalahan saat mencari",
    }
  }
}

export async function getInfo(url: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/download`, {
      params: { link: url },
      timeout: 30000,
    })

    if (response.data && response.data.title) {
      const track: Track = {
        id: Math.random().toString(36).substr(2, 9),
        title: response.data.title,
        duration: response.data.durasi,
        popularity: "N/A",
        preview: null,
        artist: response.data.artis,
        thumbnail: response.data.image || "/placeholder.svg",
        url: url,
        album: "N/A",
        release_date: "N/A",
        type: response.data.type,
        download: response.data.download,
      }

      return {
        status: true,
        data: track,
      }
    }

    return {
      status: false,
      msg: "URL tidak valid atau gagal memuat data",
    }
  } catch (error) {
    const err = error as { response?: { data?: { msg: string } }; message?: string }
    console.error("Get info error:", err)
    return {
      status: false,
      msg: err.response?.data?.msg || err.message || "Gagal memuat lagu",
    }
  }
}

export async function spotifydl(url: string) {
  try {
    console.log("Memulai download untuk URL:", url)

    const response = await axios.get(`${API_BASE_URL}/download`, {
      params: { link: url },
      timeout: 60000,
    })

    if (response && response.status === 200 && response.data) {
      return {
        title: response.data.title,
        type: response.data.type,
        artis: response.data.artis,
        durasi: response.data.durasi,
        image: response.data.image,
        download: response.data.download,
      } as DownloadData
    }

    throw new Error(response.data.msg || "Gagal mendapatkan link download")
  } catch (error) {
    const err = error as { response?: { data?: { msg: string } }; message?: string }
    console.error("Download error:", err)
    throw new Error(err.response?.data?.msg || err.message || "Gagal mengunduh lagu")
  }
}
