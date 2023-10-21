import Head from "next/head"

type SeoProps = {
    title: String
}

const Seo = ({ title }: SeoProps) => {
    return (
        <Head>
            <title>{`${title} | 조성민머리FLIX`}</title>
        </Head>
    )
}

export default Seo