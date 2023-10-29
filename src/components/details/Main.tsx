export default function Main ({ poster_path, title, tagline, genres, date, runtime, vote_average, overview }: {
    poster_path: string,
    title: string,
    tagline: string,
    genres: any[],
    date: string,
    runtime?: number,
    vote_average: number,
    overview: string
}) {

    const genresStr: string[] = []
    genres.map(v => {
        genresStr.push(v.name)
    })

    const runTime = runtime ? `${date} ▪ ${runtime}분` : `${date}`

    return (
            <div className="flex flex-wrap md:flex-nowrap mt-12 pb-8 border-b">
                <img className="mx-auto md:mx-0 mb-2 w-[250px] h-[400px] md:w-[340px] md:h-[510px] rounded-xl shadow-2xl" src={`https://image.tmdb.org/t/p/w400${poster_path}`} />
                <div className="px-2 md:pl-10 min-w-[400px]">
                    <p className="text-3xl text-primary-content font-bold">{title}</p>
                    <p className="mt-5 text-xl text-primary-content font-bold italic">{tagline}</p>
                    <p className="mt-3 text-base text-neutral-content font-bold">{genresStr.join(" ▪ ")}</p>
                    <p className="text-base text-neutral-content font-bold">{runTime}</p>
                    <p className="mt-3 text-base text-primary-content font-bold">{`평점`}<span className="inline-block ml-2 text-info">{vote_average}</span></p>
                    <p className="mt-5 text-xl text-primary-content font-bold leading-8">{overview}</p>
                </div>
            </div>
    )
}