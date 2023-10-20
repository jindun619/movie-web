import { useRouter } from "next/router"

import { useState, useEffect } from "react"

import axios from "axios"

import Main from "@/components/details/Main"
import Casts from "@/components/details/Casts"

export default function MoviePage () {
    type MovieType = {
        adult: boolean,
        genres: Array<any>,
        original_language: string,
        overview: string,
        popularity: number,
        poster_path: string,
        backdrop_path: string,
        release_date: string,
        title: string,
        tagline: string,
        vote_average: number,
        vote_count: number,
        runtime: number
    }
    type CreditType = {
        cast: CastType[],
    }
    type CastType = {
        id: number,
        name: string,
        character: string,
        profile_path: string
    }

    const [movie, setMovie] = useState<MovieType>()
    const [credit, setCredit] = useState<CreditType>()

    const router = useRouter()
    const { movieId } = router.query

    useEffect(() => {
        axios.get(`/api/movie/${movieId}`, {
            params: {
                api_key: process.env.API_KEY,
                region: 'KR',
                language: 'ko-KR'
            }
        })
        .then((res) => {
            console.log(res.data)
            setMovie(res.data)
        })
        .catch((err) => {
            console.log(err)
        })

        axios.get(`/api/movie/${movieId}/credits`, {
            params: {
                api_key: process.env.API_KEY,
                region: 'KR',
                language: 'ko-KR'
            }
        })
        .then((res) => {
            console.log(res.data)
            setCredit(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [movieId])

    if(movie && credit) {
        return (
            <>
                <Main data={movie} />
                <Casts data={credit} />
                <img className="fixed left-2/4 translate-x-[-50%] top-0 h-screen opacity-20 z-[-1]" src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} />
            </>
        )
    }
}