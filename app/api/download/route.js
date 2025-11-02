// app/api/download/route.js
import axios from "axios";
import { NextResponse } from 'next/server';

async function spotifydl(url) {
  try {
    const kaakangsatir = await axios.get(
      `https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          Referer: "https://spotifydownload.org/",
        },
      }
    );

    const yuuka = await axios.get(
      `https://api.fabdl.com/spotify/mp3-convert-task/${kaakangsatir.data.result.gid}/${kaakangsatir.data.result.id}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          Referer: "https://spotifydownload.org/",
        },
      }
    );

    return {
      title: kaakangsatir.data.result.name,
      type: kaakangsatir.data.result.type,
      artis: kaakangsatir.data.result.artists,
      durasi: kaakangsatir.data.result.duration_ms,
      image: kaakangsatir.data.result.image,
      download: "https://api.fabdl.com" + yuuka.data.result.download_url,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const link = searchParams.get('link'); // Parameter link (URL Spotify track)

  if (!link) {
    return NextResponse.json({ error: 'Link parameter is required' }, { status: 400 });
  }

  try {
    const result = await spotifydl(link);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 });
  }
}
