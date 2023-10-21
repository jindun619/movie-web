import { MovieType } from "@/types"

export default function Main ({ data }: {
    data: MovieType
}) {
    const genres: string[] = []
    data.genres.map(v => {
        genres.push(v.name)
    })
    return (
            <div className="flex flex-wrap md:flex-nowrap mt-12 pb-8 border-b">
                <img className="mx-auto mb-2 w-[250px] h-[400px] md:w-[340px] md:h-[510px] rounded-xl shadow-2xl" src={`https://image.tmdb.org/t/p/w400${data.poster_path}`} />
                <div className="px-2 md:pl-10">
                    <p className="text-3xl text-primary-content font-bold">{data.title}</p>
                    <p className="mt-5 text-xl text-primary-content font-bold italic">{data.tagline}</p>
                    <p className="mt-3 text-base text-neutral-content font-bold">{genres.join(" ▪ ")}</p>
                    <p className="text-base text-neutral-content font-bold">{`${data.release_date} ▪ ${data.runtime}분`}</p>
                    <p className="mt-3 text-base text-primary-content font-bold">{`평점`}<span className="inline-block ml-2 text-info">{data.vote_average}</span></p>
                    <p className="mt-5 text-xl text-primary-content font-bold leading-8">{data.overview}</p>
                </div>
            </div>
    )
}