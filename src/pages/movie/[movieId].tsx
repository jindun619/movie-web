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
        vote_count: number,
        runtime: number
    }
    type CreditType = {
        id: number,
        cast: any[],
    }

    const [movie, setMovie] = useState<MovieType>()
    const [credit, setCredit] = useState<CreditType>()

    const router = useRouter()
    const { movieId } = router.query

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
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

        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
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

    if(movie) {
        const genres: string[] = []
        movie.genres.map(v => {
            genres.push(v.name)
        })
        return (
            <>
                <div className="mt-12">
                    <div className="flex flex-wrap md:flex-nowrap">
                        <img className="mx-auto mb-2 w-[250px] h-[400px] md:w-[340px] md:h-[510px] rounded-xl shadow-2xl" src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} />
                        <div className="pl-10">
                            <p className="text-3xl text-primary-content font-bold">{movie.title}</p>
                            <p className="mt-5 text-xl text-primary-content font-bold italic">{movie.tagline}</p>
                            <p className="mt-3 text-base text-neutral-content font-bold">{genres.join(' ▪ ')}</p>
                            <p className="text-base text-neutral-content font-bold">{`${movie.release_date} ▪ ${movie.runtime}분`}</p>
                            <span className="mt-3 text-base text-primary-content font-bold">{`평점`}<p className="inline-block ml-2 text-info">{movie.vote_average}</p></span>
                            <p className="mt-5 text-xl text-primary-content font-bold leading-8">{movie.overview}</p>
                        </div>
                    </div>
                </div>
                <img className="fixed left-2/4 translate-x-[-50%] top-0 h-screen opacity-20 z-[-1]" src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} />
            </>
        )
    }
}