import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";

import axios from "axios";

import Seo from "@/components/Seo";

import { MovieType } from "@/types";

export default function HomePage({ res1, res2 }: { res1: any[]; res2: any[] }) {
  console.log(res1, res2);
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
      <div>home</div>
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
    const movieId = res1.data.movie.results[0].id;

    //  Fetching movie details data
    const res2 = await axios.get(`${baseUrl}/movie/${movieId}`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });
    const movie = res2.data;
    return {
      props: { res1: res1.data.results, res2: res2.data.results },
    };
  } catch (error) {
    return {
      props: {
        error: error,
      },
    };
  }
}
