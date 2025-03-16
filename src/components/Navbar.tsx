import { useState } from "react";

import Link from "next/link";

import { useRecoilValue } from "recoil";
import { pageState } from "@/recoil/page";

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

  const pages = [
    {
      name: "홈",
      url: "/home",
    },
    {
      name: "영화",
      url: "/movie",
    },
    {
      name: "TV",
      url: "/tv",
    },
    {
      name: "검색",
      url: "/search",
    },
  ];

  return (
    <div
      className={`justify-between sticky top-0 navbar bg-primary z-[10] ${opacity}`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <div>
        <Link
          href="/"
          className="btn btn-ghost normal-case text-primary-content text-xl"
        >
          Jindun Movie Web
        </Link>
      </div>
      <div>
        {pages.map((v, i) => {
          return (
            <Link
              key={i}
              className={`text-lg md:text-xl font-bold px-2 md:px-5 h-full ${getColor(
                i
              )}`}
              href={v.url}
            >
              {v.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
