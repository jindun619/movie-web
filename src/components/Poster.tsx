import Link from "next/link"

import { useState } from "react"

import { StarIcon } from '@heroicons/react/24/solid'

type PosterType = {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    overview: string
}

const Poster = ({ id, title, poster_path, vote_average, release_date, overview }: PosterType) => {

    const [mouseOver, setMouseOver] = useState(false)

    const handleMouseOver = () => {
        setMouseOver(true)
    }

    const handleMouseOut = () => {
        setMouseOver(false)
    }
    
    return (
        <div className="relative w-48 md:w-56 h-[370px] mb-3 hover:scale-105 transition duration-500" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <Link key={id} href={`/movie/${id}`}>
                <div>
                    <img className={`mx-auto rounded-xl ${mouseOver ? "opacity-30" : ""}`} src={`https://image.tmdb.org/t/p/w200${poster_path}`} />
                </div>
                <p className="text-center font-extrabold text-primary-content text-base">{title.length > 15 ? `${title.substring(0, 15)}..` : title}</p>
                <p className="text-center font-semibold text-neutral-500 text-sm">{`개봉일: ${release_date}`}</p>
                <div className="flex justify-center items-center">
                    <StarIcon className="h-4 w-4 text-[#ffa534] mr-1" />
                    <p className="text-center font-semibold text-neutral-500 text-sm">{vote_average}</p>
                </div>
                <div className={mouseOver ? "transition ease-in duration-300" : "opacity-0"}>
                    <p className={`absolute left-0 top-0 px-7 py-5 text-primary-content transition duration-200 ease-linear`}>{overview.length > 70 ? `${overview.substring(0, 70)}..` : overview}</p>
                    <button className="px-2 py-1 border border-primary-content text-primary-content hover:border-info hover:text-info rounded-sm absolute left-2/4 translate-x-[-50%] bottom-24">상세정보</button>
                </div>
            </Link>
        </div>
    )
}

export default Poster