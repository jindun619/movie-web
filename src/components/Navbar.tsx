import { useState } from "react"
import { useRouter } from "next/router"

import Link from "next/link"

const Navbar = () => {
    const [isHovering, setIsHovering] = useState<boolean>(false)

    const opacity = isHovering ? "opacity-100" : "opacity-70"
    return (
        <div className={`sticky top-0 navbar bg-primary z-[10] ${opacity}`} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost normal-case text-primary-content text-xl">조성민머리Flix</Link>
            </div>
            <div className="navbar-end">
                <Link className="text-xl text-primary-content font-bold px-5 h-full" href="/">홈</Link>
                <Link className="text-xl text-primary-content font-bold px-5 h-full" href="/movie">영화</Link>
                <Link className="text-xl text-primary-content font-bold px-5 h-full" href="/tv">TV</Link>
            </div>
        </div>
    )
}

export default Navbar