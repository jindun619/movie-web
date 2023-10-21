type ProdType = {
    logo_path: string,
    name: string,
    origin_country: string
}

export default function Prod ({ data }: {
    data: ProdType[]
}) {
    console.log("data:", data)
    return (
        <>
            <p className="mt-5 px-2 md:px-auto text-xl text-primary-content font-bold">제작사</p>
            <div className="pb-8 border-b mt-5 px-2 md:px-auto">
                <img src={`https://image.tmdb.org/t/p/w400${data[0].logo_path}`} className="h-[70px]" />
                <p className="text-lg text-primary-content font-bold">{`${data[0].name}(${data[0].origin_country})`}</p>
            </div>
        </>
    )
}