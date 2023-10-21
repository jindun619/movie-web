import { useState } from "react"

import Link from "next/link"

const Navbar = () => {
    const [isHovering, setIsHovering] = useState<boolean>(false)

    const opacity = isHovering ? "opacity-100" : "opacity-70"
    return (
        <div className={`sticky top-0 navbar bg-primary z-[10] ${opacity}`} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
            <Link href="/" className="btn btn-ghost normal-case text-primary-content text-xl">조성민머리Flix</Link>
        </div>
    )
}

export default Navbar