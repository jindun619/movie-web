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

  const [movies, setMovies] = useState<MoviesType>()

  useEffect(() => {
    axios.get(`/api/movie/top_rated`, {
      params: {
        region: 'KR'
      }
    })
    .then((res) => {
      console.log(res.data)
      setMovies(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  if(movies) {
    return (
      <>
        {
          movies.results.map((v, i) => (
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
