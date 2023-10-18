import { useState, useEffect } from "react"
import Link from "next/link"

import axios from "axios"

export default function Home() {
  type MovieType = {
    id: number,
    title: string,
    poster_path: string,
  }

  type MoviesType = {
    results: MovieType[]
  }

  const [topratedMovies, setTopratedMovies] = useState<MoviesType>()
  const [nowplayingMovies, setNowplayingMovies] = useState<MoviesType>()

  useEffect(() => {
    // Fetching top_rated data
    axios.get(`/api/movie/top_rated`, {
      params: {
        region: 'KR',
        language: 'ko-KR'
      }
    })
    .then((res) => {
      console.log(res.data)
      setTopratedMovies(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

    // Fetching now_playing data
    axios.get(`/api/movie/now_playing`, {
      params: {
        region: 'KR',
        language: 'ko-KR',
      }
    })
    .then((res) => {
      console.log(res.data)
      setNowplayingMovies(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  if(nowplayingMovies) {
    return (
      <>
        {
          nowplayingMovies.results.map((v, i) => (
            <Link key={i} href={`/movie/${v.id}`}>
              <div className="card shadow-xl">
                <figure><img src={`https://image.tmdb.org/t/p/w200${v.poster_path}`} /></figure>
                <div className="card-body">
                  <p className="card-title">
                    {v.title}
                  </p>
                </div>    
              </div>
            </Link>
          ))
        }
      </>
    )
  } else {
    return (
        <h1>Loading..</h1>
    )
  }
}
