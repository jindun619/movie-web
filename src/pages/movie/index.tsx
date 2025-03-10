import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";
import { movieSelectedState } from "@/recoil/movieSelected";

import axios from "axios";

import Seo from "@/components/Seo";
import Poster from "@/components/Poster";

import { MovieType } from "@/types";

interface MovieIndexPageProps {
  now_playing: MovieType[];
  popular: MovieType[];
  top_rated: MovieType[];
}
export const MovieIndexPage = ({
  now_playing,
  popular,
  top_rated,
}: MovieIndexPageProps) => {
  const setPage = useSetRecoilState(pageState);

  const [selected, setSelected] = useRecoilState(movieSelectedState);

  type MoviesType = {
    results: MovieType[];
  };
  const [selectedMovies, setSelectedMovies] = useState<
    MovieType[] | undefined
  >();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    switch (selected) {
      case 0:
        setSelectedMovies(now_playing);
        break;
      case 1:
        setSelectedMovies(popular);
        break;
      case 2:
        setSelectedMovies(top_rated);
        break;
    }
  }, [selected]);

  if (selectedMovies) {
    const selectedClass = `text-primary border-b-4 border-primary`;
    const movieH = ["현재 상영중", "인기 영화", "평점높은 영화"];

    const og = {
      title: "a",
      image: "a",
      description: "a",
    };

    return (
      <>
        <Seo title="영화" og={og} />
        <div className="mt-24 mb-4">
          <p className="px-4 text-center text-3xl md:text-5xl text-primary-content font-bold">
            {movieH[selected]}
          </p>
          <div className="flex justify-center mt-24 gap-9">
            {movieH.map((v, i) => (
              <p
                key={i}
                className={`text-sm md:text-xl text-primary-content font-bold cursor-pointer ${
                  selected === i ? selectedClass : ""
                }`}
                onClick={() => {
                  setSelected(i);
                }}
              >
                {v}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly">
          {selectedMovies.map((v, i) => (
            <Poster
              key={i}
              type="movie"
              id={v.id}
              poster_path={v.poster_path}
              title={v.title}
              date={v.release_date}
              vote_average={v.vote_average}
              overview={v.overview}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <div className="absolute left-2/4 translate-x-[-50%] top-2/4 translate-y-[-50%]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
};

export const getServerSideProps = async () => {
  const baseUrl = "https://api.themoviedb.org/3";

  try {
    //  Fetching now playing movies
    const res1 = await axios.get(`${baseUrl}/movie/now_playing`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    // Fetching popular movies
    const res2 = await axios.get(`${baseUrl}/movie/popular`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    // Fetching top rated movies
    const res3 = await axios.get(`${baseUrl}/movie/top_rated`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    const now_playing = res1.data.results;
    const popular = res2.data.results;
    const top_rated = res3.data.results;

    return {
      props: { now_playing, popular, top_rated },
    };
  } catch (error) {
    return {
      props: {
        error: error,
      },
    };
  }
};

export default MovieIndexPage;
