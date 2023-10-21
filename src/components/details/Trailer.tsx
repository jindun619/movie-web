import DetailsLayout from "./DetailsLayout"
import YoutubePlayer from "../YoutubePlayer"

import { VideoType } from "@/types"

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
            <DetailsLayout label="트레일러">
                <div className="flex flex-wrap mt-5">
                    {
                        filteredData.map((v, i) => (
                            <YoutubePlayer key={i} videoId={v.key} videoName={v.name} />
                        ))
                    }
                </div>
            </DetailsLayout>
        )
    } else {
        return false
    }
}