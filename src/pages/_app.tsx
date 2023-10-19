import type { AppProps } from "next/app"

import Layout from "@/components/Layout"

import "../styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout data-theme="dark">
            <Component {...pageProps} />
        </Layout>
    )
}

export default App