import { useState, useEffect } from "react"

import axios from "axios"

import Seo from "@/components/Seo"
import Poster from "@/components/Poster"

import { MovieType } from "@/types"

export default function MovieIndexPage() {
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

    const og = {
      title:"a",
      image:"a",
      description:"a"
    }

    return (
      <>
        <Seo title="영화" og={og} />
        <div className="mt-24 mb-4">
          <p className="px-4 text-center text-5xl text-primary-content font-bold">{movieH[selected]}</p>
          <div className="flex justify-center mt-24 gap-9">
            <p className={`text-sm md:text-xl text-primary-content font-bold cursor-pointer ${selected === 0 ? selectedClass : ""}`} onClick={() => {setSelected(0)}}>현재 상영중</p>
            <p className={`text-sm md:text-xl text-primary-content font-bold cursor-pointer ${selected === 1 ? selectedClass : ""}`} onClick={() => {setSelected(1)}}>인기 영화</p>
            <p className={`text-sm md:text-xl text-primary-content font-bold cursor-pointer ${selected === 2 ? selectedClass : ""}`} onClick={() => {setSelected(2)}}>평점높은 영화</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly animate-fade-up">
          {
            selectedMovies.results.map((v, i) => (
              <Poster
                key={i}
                type="movie"
                id={v.id}
                poster_path={v.poster_path}
                title={v.title}
                date={v.release_date}
                vote_average={v.vote_average}
                overview={v.overview}
              />
            ))
          }
        </div>
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
