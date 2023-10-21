import Link from "next/link"

const Navbar = () => {
    return (
        <div className="sticky top-0 navbar bg-primary z-[10] opacity-70">
            <Link href="/" className="btn btn-ghost normal-case text-primary-content text-xl">JoSungMinMeoRiFlix</Link>
        </div>
    )
}

export default Navbar