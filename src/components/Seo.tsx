import Head from "next/head"

const Seo = ({ title, og }: {
    title: string,
    og: {
        title: string,
        image: string,
        description: string,
    }
}) => {
    return (
        <Head>
            <title>{`${title} | 조성민머리FLIX`}</title>
            <meta property="og:type" content="movie" />
            {/* <meta property="og:url" content="https://example.com/page.html"> */}
            <meta property="og:title" content={og.title || "abc"} />
            <meta property="og:image" content={og.image || "abc"} />
            <meta property="og:description" content={og.description || "abc"} />
            <meta property="og:site_name" content="조성민머리FLIX" />
            <meta property="og:locale" content="ko_KR" />
        </Head>
    )
}

export default Seo