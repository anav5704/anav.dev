"use client"

import qs from "querystring"
import { useEffect, useState } from "react"

export const CurrentSong = () => {
    const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
    const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing"

    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
    const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN

    const getAccessToken = async () => {
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
        const response = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify({
                grant_type: "refresh_token",
                refresh_token,
            }),
        })

        return response.json()
    }

    const getNowPlaying = async () => {
        const { access_token } = await getAccessToken() as { access_token: string }
        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })

        const song = await response.json()
        const albumImageUrl = song.item.album.images[0].url
        const isPlaying = song.is_playing
        const songUrl = song.item.external_urls.spotify
        //@ts-ignore
        const artist = song.item.artists.map((artist) => artist.name).join(', ')
        const title = song.item.name
        const timePlayed = song.progress_ms
        const timeTotal = song.item.duration_ms
        const artistUrl = song.item.album.artists[0].external_urls.spotify

        //Returning the song details
        return {
            albumImageUrl,
            isPlaying,
            songUrl,
            artist,
            title,
            timePlayed,
            timeTotal,
            artistUrl
        }
    }

    const [nowPlaying, setNowPlaying] = useState(null)

    useEffect(() => {
        const fetchNowPlaying = async () => {
            const data = await getNowPlaying()
            //@ts-ignore
            setNowPlaying(data)
        }

        fetchNowPlaying()
        setInterval(() => {
            fetchNowPlaying()
        }, 5000)
    }, [])

    return (
        <div className="text-center mt-10">
            {/* @ts-ignore */}
            <span>{nowPlaying?.title} </span>
            {" - "}
            {/* @ts-ignore */}
            <span>{nowPlaying?.artist}</span>
        </div>
    )
}
