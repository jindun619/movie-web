import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";

import axios from "axios";

// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/react-splide/css/sea-green";

import Seo from "@/components/Seo";
import Poster from "@/components/Poster";

import { MovieType2, TvType2 } from "@/types";

export default function HomePage({
  movies,
  tvs,
}: {
  movies: MovieType2[];
  tvs: TvType2[];
}) {
  console.log(movies);
  const setPage = useSetRecoilState(pageState);

  useEffect(() => {
    setPage(0);
  }, []);

  const og = {
    title: "홈",
    image: "a",
    description: "",
  };

  return (
    <>
      <Seo title="홈" og={og} />
      <div>
        <p className="mt-20 pl-5 text-3xl text-primary-content font-bold">
          영화 추천
        </p>
        {/* <Splide
          options={{
            rewind: true,
            fixedWidth: "14rem",
            perMove: 1,
            pagination: false,
            padding: 0,
          }}
          aria-label="React Splide Example">
          {movies.map((v, i) => (
            <SplideSlide>
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
            </SplideSlide>
          ))}
        </Splide> */}
        <p className="mt-10 pl-5 text-3xl text-primary-content font-bold">
          TV 프로그램 추천
        </p>
        {/* <Splide
          options={{
            rewind: true,
            fixedWidth: "14rem",
            perMove: 1,
            pagination: false,
          }}
          aria-label="React Splide Example">
          {tvs.map((v, i) => (
            <SplideSlide>
              <Poster
                key={i}
                type="tv"
                id={v.id}
                poster_path={v.poster_path}
                title={v.name}
                date={v.first_air_date}
                vote_average={v.vote_average}
                overview={v.overview}
              />
            </SplideSlide>
          ))}
        </Splide> */}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const baseUrl = "https://api.themoviedb.org/3";

  try {
    //  Fetching trending movie by day
    const res1 = await axios.get(`${baseUrl}/trending/movie/day`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    // Fetching trending tv by day
    const res2 = await axios.get(`${baseUrl}/trending/tv/day`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    const movies = res1.data.results;
    const tvs = res2.data.results;

    return {
      props: { movies, tvs },
    };
  } catch (error) {
    return {
      props: {
        error: "aa",
      },
    };
  }
}
