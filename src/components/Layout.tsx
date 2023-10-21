import Navbar from "./Navbar"

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <div className="relative container mx-auto">
                {children}
                <div className="fixed left-0 top-0 w-screen h-screen bg-black z-[-2]"></div>
            </div>
        </>
    )
}

export default Layout