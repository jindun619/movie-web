import { useRouter } from "next/router"

import { useState, useEffect } from "react"

import axios from "axios"

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
        vote_count: number
    }

    const [movie, setMovie] = useState<MovieType>()

    const router = useRouter()
    const { movieId } = router.query

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`, {
            params: {
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
    }, [movieId])

    if(movie) {
        return (
            <>
                <div className="relative mt-12">
                    <div className="flex">
                        <img className="w-80 rounded-xl shadow-2xl" src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} />
                        <div className="pl-10">
                            <p className="text-3xl text-primary-content font-bold">{movie.title}</p>
                            <p className="mt-5 text-xl text-primary-content font-bold italic">{movie.tagline}</p>
                            <p className="mt-3 text-base text-neutral font-bold">Genres</p>
                            <p className="">Genres2</p>
                        </div>
                    </div>
                </div>
                <img className="fixed left-0 top-0 h-screen opacity-20" src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} />
            </>
        )
    }
}