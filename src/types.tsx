type MovieType = {
    id: number,
    adult: boolean,
    genres: Array<any>,
    original_language: string,
    overview: string,
    popularity: number,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    title: string,
    tagline: string,
    vote_average: number,
    vote_count: number,
    runtime: number,
    production_companies: any
}

type CastType = {
    id: number,
    name: string,
    character: string,
    profile_path: string
}

type VideoType = {
    key: string,
    name: string,
    official: boolean,
    type: string
}

type ProdType = {
    logo_path: string,
    name: string,
    origin_country: string
}

export type { MovieType, CastType, VideoType, ProdType }