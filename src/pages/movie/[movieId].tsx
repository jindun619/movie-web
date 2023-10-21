import { useRouter } from "next/router"

import { useState, useEffect } from "react"

import axios from "axios"

import Seo from "@/components/Seo"
import Main from "@/components/details/Main"
import Casts from "@/components/details/Casts"
import Trailer from "@/components/details/Trailer"
import Prod from "@/components/details/Prod"

import { MovieType, CastType, VideoType } from "@/types"

export default function MoviePage () {
    type CreditType = {
        cast: CastType[],
    }
    
    type VideosType = {
        results: VideoType[]
    }
    
    const [movie, setMovie] = useState<MovieType>()
    const [credit, setCredit] = useState<CreditType>()
    const [videos, setVideos] = useState<VideosType>()

    const router = useRouter()
    const { movieId } = router.query

    useEffect(() => {
        if(movieId) {
            // Fetching movie details data
            axios.get(`/api/movie/${movieId}`, {
                params: {
                    api_key: process.env.API_KEY,
                    region: 'KR',
                    language: 'ko-KR'
                }
            })
            .then((res) => {
                setMovie(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            // Fetching movie credits data
            axios.get(`/api/movie/${movieId}/credits`, {
                params: {
                    api_key: process.env.API_KEY,
                    region: 'KR',
                    language: 'ko-KR'
                }
            })
            .then((res) => {
                setCredit(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            // Fetching movie videos data
            axios.get(`/api/movie/${movieId}/videos`, {
                params: {
                    api_key: process.env.API_KEY,
                    region: 'KR',
                    language: 'ko-KR'
                }
            })
            .then((res) => {
                setVideos(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [movieId])

    if(movie && videos && credit) {
        return (
            <>
                <Seo title={movie.title} />
                <Main data={movie} />
                <Trailer data={videos} />
                <Casts data={credit} />
                <Prod data={movie.production_companies} />
                <img className="fixed left-2/4 translate-x-[-50%] top-0 object-cover w-screen h-screen opacity-20 z-[-1]" src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} />
            </>
        )
    } else {
        return (
            <div className="absolute left-2/4 translate-x-[-50%] top-2/4 translate-y-[-50%]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }
}