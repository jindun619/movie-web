import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";

import axios from "axios";

import Seo from "@/components/Seo";
import { Main } from "@/components/details/Main";
import { Casts } from "@/components/details/Casts";
import { Trailer } from "@/components/details/Trailer";
import { Prod } from "@/components/details/Prod";

import { MovieType, CastType, VideoType } from "@/types";
import { GetServerSideProps } from "next";

interface MoviePageProps {
  movie: MovieType;
  casts: CastType[];
  videos: VideoType[];
}
export const MoviePage = ({ movie, casts, videos }: MoviePageProps) => {
  const setPage = useSetRecoilState(pageState);

  useEffect(() => {
    setPage(1);
  }, []);

  const og = {
    title: movie.title,
    image: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`,
    description: movie.overview,
  };
  return (
    <>
      <Seo title={movie.title} og={og} />
      <Main
        poster_path={movie.poster_path}
        title={movie.title}
        tagline={movie.tagline}
        genres={movie.genres}
        date={movie.release_date}
        runtime={movie.runtime}
        vote_average={movie.vote_average}
        overview={movie.overview}
      />
      <Trailer data={videos} />
      <Casts data={casts} />
      <Prod data={movie.production_companies} />
      <img
        className="fixed left-2/4 translate-x-[-50%] top-0 object-cover w-screen h-screen opacity-20 z-[-1]"
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { movieId } = query;

  try {
    const baseUrl = "https://api.themoviedb.org/3";

    //  Fetching movie details data
    const res1 = await axios.get(`${baseUrl}/movie/${movieId}`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });
    // Fetching movie credits data
    const res2 = await axios.get(`${baseUrl}/movie/${movieId}/credits`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });
    // Fetching movie videos data
    const res3 = await axios.get(`${baseUrl}/movie/${movieId}/videos`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    const movie = res1.data;
    const casts = res2.data.cast;
    const videos = res3.data.results;

    return {
      props: { movie, casts, videos },
    };
  } catch (err) {
    console.log("There was an Error:", err);
    return {
      props: {
        movie: null,
        credit: null,
        videos: null,
      },
    };
  }
};

export default MoviePage;
