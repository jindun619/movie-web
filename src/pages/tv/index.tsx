import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";
import { tvSelectedState } from "@/recoil/tvSelected";

import axios from "axios";

import Seo from "@/components/Seo";
import Poster from "@/components/Poster";

import { TvType } from "@/types";

export default function TvIndexPage() {
  const setPage = useSetRecoilState(pageState);

  const [selected, setSelected] = useRecoilState(tvSelectedState);

  useEffect(() => {
    setPage(2);
  }, []);

  type TvsType = {
    results: TvType[];
  };

  const [selectedTvs, setSelectedTvs] = useState<TvsType>();

  useEffect(() => {
    switch (selected) {
      case 0:
        // Fetching onTheAir data
        axios
          .get(`/api/tv/on_the_air`, {
            params: {
              api_key: process.env.API_KEY,
              region: "KR",
              language: "ko-KR",
            },
          })
          .then((res) => {
            setSelectedTvs(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 1:
        // Fetching popular data
        axios
          .get(`/api/tv/popular`, {
            params: {
              api_key: process.env.API_KEY,
              region: "KR",
              language: "ko-KR",
            },
          })
          .then((res) => {
            console.log(res.data);
            setSelectedTvs(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 2:
        // Fetching top_rated data
        axios
          .get(`/api/tv/top_rated`, {
            params: {
              api_key: process.env.API_KEY,
              region: "KR",
              language: "ko-KR",
            },
          })
          .then((res) => {
            console.log(res.data);
            setSelectedTvs(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 3:
        // Fetching airingToday data
        axios
          .get(`/api/tv/airing_today`, {
            params: {
              api_key: process.env.API_KEY,
              region: "KR",
              language: "ko-KR",
            },
          })
          .then((res) => {
            console.log(res.data);
            setSelectedTvs(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  }, [selected]);

  if (selectedTvs) {
    const selectedClass = `text-primary border-b-4 border-primary`;
    const tvH = [
      "현재 방영중",
      "인기 프로그램",
      "평점높은 프로그램",
      "방영 예정",
    ];

    const og = {
      title: "a",
      image: "a",
      description: "a",
    };

    return (
      <>
        <Seo title="TV" og={og} />
        <div className="mt-24 mb-4">
          <p className="px-4 text-center text-5xl text-primary-content font-bold">
            {tvH[selected]}
          </p>
          <div className="flex justify-center mt-24 gap-9">
            {tvH.map((v, i) => (
              <p
                className={`text-xl text-primary-content font-bold cursor-pointer ${
                  selected === i ? selectedClass : ""
                }`}
                onClick={() => {
                  setSelected(i);
                }}>
                {v}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly animate-fade-up">
          {selectedTvs.results.map((v, i) => (
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
}
