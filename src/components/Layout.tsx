import Seo from "./Seo"
import Navbar from "./Navbar"

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Seo title="title" />
            <Navbar />
            {children}
        </>
    )
}

export default Layout