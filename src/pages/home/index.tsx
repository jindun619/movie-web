import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";

import axios from "axios";

import Seo from "@/components/Seo";

import { MovieType } from "@/types";

export default function HomePage() {
  const [movie, setMovie] = useState<MovieType>();
  const [video, setVideo] = useState();

  const setPage = useSetRecoilState(pageState);

  // useEffect(() => {
  //   setPage(0);
  // }, []);

  // si xun huan
  useEffect(() => {
    axios
      .get(`/api/trending/movie/day`, {
        params: {
          api_key: process.env.API_KEY,
          region: "KR",
          language: "ko-KR",
          // page: 1,
        },
      })
      .then((res) => {
        console.log(res.data.results);
        setMovie(res.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
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
