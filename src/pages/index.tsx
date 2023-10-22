import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/pageState";

// import axios from "axios";

import Seo from "@/components/Seo";

import { MovieType } from "@/types";

export default function IndexPage() {
  const [movie, setMovie] = useState<MovieType>();
  const [video, setVideo] = useState();

  const setPage = useSetRecoilState(pageState);

  useEffect(() => {
    setPage(0);
  }, []);

  // si xun huan
  // useEffect(() => {
  //   axios
  //     .get(`/api/trending/movie/day`, {
  //       params: {
  //         api_key: process.env.API_KEY,
  //         region: "KR",
  //         language: "ko-KR",
  //         page: 1,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.results[0]);
  //       setMovie(res.data.results[0]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`/api/trending/movie/day`, {
  //       params: {
  //         api_key: process.env.API_KEY,
  //         region: "KR",
  //         language: "ko-KR",
  //         page: 1,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.results[0]);
  //       setMovie(res.data.results[0]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [movie]);

  const og = {
    title: "홈",
    image: "a",
    description: "",
  };
  return (
    <>
      <Seo title="홈" og={og} />
      <div></div>
    </>
  );
}
