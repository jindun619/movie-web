import { useState } from "react";

import Link from "next/link";

import { useRecoilValue } from "recoil";
import { pageState } from "@/recoil/pageState";

const Navbar = () => {
  const page = useRecoilValue(pageState);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const opacity = isHovering ? "opacity-100" : "opacity-70";

  const getColor = (value: number) => {
    if (value === page) {
      return "text-accent";
    } else {
      return "text-primary-content";
    }
  };

  return (
    <div
      className={`sticky top-0 navbar bg-primary z-[10] ${opacity}`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}>
      <div className="navbar-start">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-primary-content text-xl">
          조성민머리Flix
        </Link>
      </div>
      <div className="navbar-end">
        <Link
          className={`text-xl font-bold px-5 h-full ${getColor(0)}`}
          href="/">
          홈
        </Link>
        <Link
          className={`text-xl font-bold px-5 h-full ${getColor(1)}`}
          href="/movie">
          영화
        </Link>
        <Link
          className={`text-xl font-bold px-5 h-full ${getColor(2)}`}
          href="/tv">
          TV
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
