import Link from "next/link";

import { useState } from "react";

import { StarIcon } from "@heroicons/react/24/solid";

interface PosterProps {
  type: string; //movie or tv
  id: number;
  poster_path: string;
  title: string;
  date: string;
  vote_average: number;
  overview: string;
}
const Poster = ({
  type,
  id,
  poster_path,
  title,
  date,
  vote_average,
  overview,
}: PosterProps) => {
  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseOver = () => {
    setMouseOver(true);
  };

  const handleMouseOut = () => {
    setMouseOver(false);
  };

  const detailsUrl = type === "movie" ? `/movie/${id}` : `/tv/${id}`;

  return (
    <div
      className="relative w-48 md:w-56 h-[370px] mb-3 hover:scale-105 transition duration-500 animate-fade-up"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link key={id} href={detailsUrl}>
        <div>
          <img
            className={`mx-auto rounded-xl ${mouseOver ? "opacity-30" : ""}`}
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          />
        </div>
        <p className="text-center font-extrabold text-primary-content text-base">
          {title.length > 15 ? `${title.substring(0, 15)}..` : title}
        </p>
        <p className="text-center font-semibold text-neutral-500 text-sm">{`${
          type === "movie" ? "개봉일" : "첫 방영"
        }: ${date}`}</p>
        <div className="flex justify-center items-center">
          <StarIcon className="h-4 w-4 text-[#ffa534] mr-1" />
          <p className="text-center font-semibold text-neutral-500 text-sm">
            {vote_average}
          </p>
        </div>
        <div
          className={
            mouseOver ? "transition ease-in duration-300" : "opacity-0"
          }
        >
          <p
            className={`absolute left-0 top-0 px-7 py-5 text-primary-content transition duration-200 ease-linear`}
          >
            {overview.length > 70 ? `${overview.substring(0, 70)}..` : overview}
          </p>
          <button className="px-2 py-1 border border-primary-content text-primary-content hover:border-info hover:text-info rounded-sm absolute left-2/4 translate-x-[-50%] bottom-24">
            상세정보
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Poster;
