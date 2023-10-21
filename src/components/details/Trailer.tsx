import YoutubePlayer from "../YoutubePlayer"

type VideoType = {
    key: string,
    name: string,
    official: boolean,
    type: string
}

export default function Trailer ({ data }: {
    data: {
        results: VideoType[]
    }
}) {
    const filteredData = data.results.filter(v => {
        return (v.official === true && v.type === 'Trailer' || v.type === 'Teaser')
    })

    if(filteredData.length !== 0) {
        return (
            <>
                <p className="mt-5 px-2 md:px-auto text-xl text-primary-content font-bold">트레일러</p>
                <div className="flex flex-wrap pb-8 border-b mt-5 px-2 md:px-auto">
                    {
                        filteredData.map((v, i) => (
                            <YoutubePlayer key={i} videoId={v.key} videoName={v.name} />
                        ))
                    }
                </div>
            </>
        )
    } else {
        return false
    }
}