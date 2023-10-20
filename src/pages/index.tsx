import { useState, useEffect } from "react"

import axios from "axios"

import Poster from "@/components/Poster"

export default function Home() {
  type MovieType = {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    overview: string
  }

  type MoviesType = {
    results: MovieType[]
  }

  const [selected, setSelected] = useState<number>(0)
  const [selectedMovies, setSelectedMovies] = useState<MoviesType>()

  useEffect(() => {
    switch(selected) {
      case 0:
        // Fetching now_playing data
        axios.get(`/api/movie/now_playing`, {
          params: {
            api_key: process.env.API_KEY,
            region: 'KR',
            language: 'ko-KR',
          }
        })
        .then((res) => {
          console.log(res.data)
          setSelectedMovies(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        break
      case 1:
        // Fetching popular data
        axios.get(`/api/movie/popular`, {
          params: {
            api_key: process.env.API_KEY,
            region: 'KR',
            language: 'ko-KR'
          }
        })
        .then((res) => {
          console.log(res.data)
          setSelectedMovies(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        break
      case 2:
        // Fetching top_rated data
        axios.get(`/api/movie/top_rated`, {
          params: {
            api_key: process.env.API_KEY,
            region: 'KR',
            language: 'ko-KR'
          }
        })
        .then((res) => {
          console.log(res.data)
          setSelectedMovies(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        break
    }
  }, [selected])

  if(selectedMovies) {
    const selectedClass = `text-primary border-b-4 border-primary`
    const movieH = ["현재 상영중", "인기 영화", "평점높은 영화"]
    return (
      <>
        <div className="mt-24 mb-4">
          <p className="px-4 text-center text-5xl text-primary-content font-bold">{movieH[selected]}</p>
          <div className="flex justify-center mt-24 gap-9">
            <p className={`text-xl text-primary-content font-bold cursor-pointer ${selected === 0 ? selectedClass : ""}`} onClick={() => {setSelected(0)}}>현재 상영중</p>
            <p className={`text-xl text-primary-content font-bold cursor-pointer ${selected === 1 ? selectedClass : ""}`} onClick={() => {setSelected(1)}}>인기 영화</p>
            <p className={`text-xl text-primary-content font-bold cursor-pointer ${selected === 2 ? selectedClass : ""}`} onClick={() => {setSelected(2)}}>평점높은 영화</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly animate-fade-up">
          {
            selectedMovies.results.map((v, i) => (
              <Poster
                key={i}
                id={v.id}
                title={v.title}
                poster_path={v.poster_path}
                vote_average={v.vote_average}
                release_date={v.release_date}
                overview={v.overview}
              />
            ))
          }
        </div>
      </>
    )
  } else {
    return (
      <span className="loading loading-ring loading-lg"></span>
    )
  }
}
