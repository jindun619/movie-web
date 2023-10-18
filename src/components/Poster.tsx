import Link from "next/link"

type PosterType = {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number
}

const Poster = ({ id, title, poster_path, vote_average }: PosterType) => {
    return (
        <div className="w-56 h-[370px] mb-3 rounded-xl shadow-xl">
            <Link key={id} href={`/movie/${id}`}>
                <div><img className="mx-auto" src={`https://image.tmdb.org/t/p/w200${poster_path}`} /></div>
                <p className="font-bold text-center">
                    {title.length > 15 ? `${title.substring(0, 15)}..` : title}
                </p>
                <p className="text-center">
                    {vote_average}  
                </p>
            </Link>
        </div>
    )
}

export default Poster