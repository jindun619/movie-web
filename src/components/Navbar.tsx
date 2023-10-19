import Link from "next/link"

const Navbar = () => {
    return (
        <div className="navbar bg-primary">
            <Link href="/" className="btn btn-ghost normal-case text-primary-content text-xl">JoSungMinMauriFlix</Link>
        </div>
    )
}

export default Navbar