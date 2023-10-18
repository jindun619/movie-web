import Head from "next/head"

type SeoProps = {
    title: String
}

const Seo = ({ title }: SeoProps) => {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}

export default Seo