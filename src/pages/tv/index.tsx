import { useState, useEffect } from "react"

import axios from "axios"

import Seo from "@/components/Seo"
import Poster from "@/components/Poster"

import { TvType } from "@/types"

export default function TvIndexPage() {
  type TvsType = {
    results: TvType[]
  }

  const [selected, setSelected] = useState<number>(0)
  const [selectedTvs, setSelectedTvs] = useState<TvsType>()

  useEffect(() => {
    switch(selected) {
      case 0:
        // Fetching airingToday data
        axios.get(`/api/tv/airing_today`, {
          params: {
            api_key: process.env.API_KEY,
            region: 'KR',
            language: 'ko-KR',
          }
        })
        .then((res) => {
            console.log(res.data)
            setSelectedTvs(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        break
      case 1:
        // Fetching onTheAir data
        axios.get(`/api/tv/on_the_air`, {
          params: {
            api_key: process.env.API_KEY,
            region: 'KR',
            language: 'ko-KR'
          }
        })
        .then((res) => {
            console.log(res.data)
            setSelectedTvs(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        break
      case 2:
        // Fetching popular data
        axios.get(`/api/tv/popular`, {
          params: {
            api_key: process.env.API_KEY,
            region: 'KR',
            language: 'ko-KR'
          }
        })
        .then((res) => {
            console.log(res.data)
            setSelectedTvs(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        break
        case 3:
            // Fetching top_rated data
            axios.get(`/api/tv/top_rated`, {
              params: {
                api_key: process.env.API_KEY,
                region: 'KR',
                language: 'ko-KR'
              }
            })
            .then((res) => {
                console.log(res.data)
                setSelectedTvs(res.data)
            })
            .catch((err) => {
              console.log(err)
            })
            break
    }
  }, [selected])

  if(selectedTvs) {
    const selectedClass = `text-primary border-b-4 border-primary`
    const tvH = ["방영 예정", "현재 방영중", "인기 프로그램", "평점높은 프로그램"]

    const og = {
      title:"a",
      image:"a",
      description:"a"
    }

    return (
      <>
        <Seo title="홈" og={og} />
        <div className="mt-24 mb-4">
          <p className="px-4 text-center text-5xl text-primary-content font-bold">{tvH[selected]}</p>
          <div className="flex justify-center mt-24 gap-9">
            <p className={`text-xl text-primary-content font-bold cursor-pointer ${selected === 0 ? selectedClass : ""}`} onClick={() => {setSelected(0)}}>방영 예정</p>
            <p className={`text-xl text-primary-content font-bold cursor-pointer ${selected === 1 ? selectedClass : ""}`} onClick={() => {setSelected(1)}}>현재 방영중</p>
            <p className={`text-xl text-primary-content font-bold cursor-pointer ${selected === 2 ? selectedClass : ""}`} onClick={() => {setSelected(2)}}>인기 프로그램</p>
            <p className={`text-xl text-primary-content font-bold cursor-pointer ${selected === 3 ? selectedClass : ""}`} onClick={() => {setSelected(3)}}>평점높은 프로그램</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly animate-fade-up">
          {
            selectedTvs.results.map((v, i) => (
              <Poster
                key={i}
                type="tv"
                id={v.id}
                poster_path={v.poster_path}
                title={v.name}
                date={v.first_air_date}
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
