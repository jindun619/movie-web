import { useRouter } from "next/router"

import { useState, useEffect } from "react"

import axios from "axios"

import Seo from "@/components/Seo"
import Main from "@/components/details/Main"
import Casts from "@/components/details/Casts"
import Trailer from "@/components/details/Trailer"
import Prod from "@/components/details/Prod"

import { MovieType, CastType, VideoType } from "@/types"

type CreditType = {
    cast: CastType[],
}

type VideosType = {
    results: VideoType[]
}

export default function MoviePage ({ movie, credit, videos }: {
    movie: MovieType,
    credit: CreditType,
    videos: VideosType
}) {
    console.log(movie, credit, videos)
// export default function MoviePage ({ data }: any) {
    // const [movie, setMovie] = useState<MovieType>()
    // const [credit, setCredit] = useState<CreditType>()
    // const [videos, setVideos] = useState<VideosType>()

    // const router = useRouter()
    // const { movieId } = router.query

    // useEffect(() => {
    //     if(movieId) {
    //         // Fetching movie details data
    //         axios.get(`/api/movie/${movieId}`, {
    //             params: {
    //                 api_key: process.env.API_KEY,
    //                 region: 'KR',
    //                 language: 'ko-KR'
    //             }
    //         })
    //         .then((res) => {
    //             setMovie(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //         // Fetching movie credits data
    //         axios.get(`/api/movie/${movieId}/credits`, {
    //             params: {
    //                 api_key: process.env.API_KEY,
    //                 region: 'KR',
    //                 language: 'ko-KR'
    //             }
    //         })
    //         .then((res) => {
    //             setCredit(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //         // Fetching movie videos data
    //         axios.get(`/api/movie/${movieId}/videos`, {
    //             params: {
    //                 api_key: process.env.API_KEY,
    //                 region: 'KR',
    //                 language: 'ko-KR'
    //             }
    //         })
    //         .then((res) => {
    //             setVideos(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     }
    // }, [movieId])

    if(movie && videos && credit) {
        const og = {
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`,
            description: movie.overview
        }

        return (
            <>
                <Seo title={movie.title} og={og} />
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

export async function getServerSideProps(context: any) {
    const { query } = context
    const { movieId } = query

    try {
        const baseUrl = "https://api.themoviedb.org/3"

        //  Fetching movie details data
        const res1 = await axios.get(`${baseUrl}/movie/${movieId}`, {
            params: {
                api_key: process.env.API_KEY,
                region: 'KR',
                language: 'ko-KR'
            }
        })
        // Fetching movie credits data
        const res2 = await axios.get(`${baseUrl}/movie/${movieId}/credits`, {
            params: {
                api_key: process.env.API_KEY,
                region: 'KR',
                language: 'ko-KR'
            }
        })
        // Fetching movie videos data
        const res3 = await axios.get(`${baseUrl}/movie/${movieId}/videos`, {
            params: {
                api_key: process.env.API_KEY,
                region: 'KR',
                language: 'ko-KR'
            }
        })

        const movie = res1.data
        const credit = res2.data
        const videos = res3.data

        return {
            props: { movie, credit, videos }
        }
    } catch (err) {
        console.log("There was an Error:", err)
        return {
            props: {
                movie: null,
                credit: null,
                videos: null
            }
        }
    }
}