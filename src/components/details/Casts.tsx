type CastType = {
    id: number,
    name: string,
    character: string,
    profile_path: string
}

export default function Casts ({ data }: {
    data: {
        cast: CastType[]
    }
}) {
    return (
        <>
            <p className="mt-5 px-2 md:px-auto text-xl text-primary-content font-bold">배우</p>
            <div className="flex flex-wrap justify-center md:justify-normal mt-5 px-2 pb-8 md:px-auto border-b">
                {
                    data.cast.map((v, i) => {
                        if(i < 6) {
                            return (
                                <div key={i} className="mr-5 w-[100px] md:w-[120px]">
                                    <div className="h-[100px] md:h-[120px]">
                                        <img className="w-full h-full object-cover rounded-full border-4 border-primary-content hover:scale-110 hover:border-[#ffa534] transition duration-200" src={`https://image.tmdb.org/t/p/w400${v.profile_path}`} />
                                    </div>
                                    <p className="text-center text-primary-content font-bold">{v.name}</p>
                                    <p className="text-center text-neutral-content font-bold">{v.character}</p>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </>
    )
}