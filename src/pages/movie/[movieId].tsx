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
        release_date: string,
        title: string,
        vote_average: number,
        vote_count: number
    }
    const [movie, setMovie] = useState<MovieType>()

    const router = useRouter()
    const { movieId } = router.query

    useEffect(() => {
        axios.get(`/api/movie/${movieId}`, {
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
                <p className="text-xl text-primary-content">{`isAdult: ${movie.adult}`}</p>
                {
                    movie.genres.map((v, i) => (
                        <p key={i} className="text-xl text-secondary">{v.name}</p>
                    ))
                }
                <p className="text-xl text-primary-content">{`language: ${movie.original_language}`}</p>
                <p className="text-xl text-primary-content">{`${movie.overview}`}</p>
                <p className="text-xl text-primary-content">{`popularity: ${movie.popularity}`}</p>
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
                <p className="text-xl text-primary-content">{`releaseData: ${movie.release_date}`}</p>
                <p className="text-xl text-primary-content">{`title: ${movie.title}`}</p>
                <p className="text-xl text-primary-content">{`voteAverage: ${movie.vote_average}`}</p>
                <p className="text-xl text-primary-content">{`voteCount: ${movie.vote_count}`}</p>
            </>
        )
    }
}