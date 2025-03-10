import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";
import { tvSelectedState } from "@/recoil/tvSelected";

import axios from "axios";

import Seo from "@/components/Seo";
import Poster from "@/components/Poster";

import { TvType } from "@/types";

interface TvIndexPageProps {
  airing_today: TvType[];
  on_the_air: TvType[];
  popular: TvType[];
  top_rated: TvType[];
}
export const TvIndexPage = ({
  airing_today,
  on_the_air,
  popular,
  top_rated,
}: TvIndexPageProps) => {
  const setPage = useSetRecoilState(pageState);

  const [selected, setSelected] = useRecoilState(tvSelectedState);

  const [selectedTvs, setSelectedTvs] = useState<TvType[] | undefined>();

  useEffect(() => {
    setPage(2);
  }, []);

  useEffect(() => {
    switch (selected) {
      case 0:
        setSelectedTvs(airing_today);
        break;
      case 1:
        setSelectedTvs(on_the_air);
        break;
      case 2:
        setSelectedTvs(popular);
        break;
      case 3:
        setSelectedTvs(top_rated);
        break;
    }
  }, [selected]);

  if (selectedTvs) {
    const selectedClass = `text-primary border-b-4 border-primary`;
    const tvH = [
      "오늘 방영",
      "현재 방영중",
      "인기 프로그램",
      "평점높은 프로그램",
    ];

    const og = {
      title: "TV",
      image: "a",
      description: "a",
    };

    return (
      <>
        <Seo title="TV" og={og} />
        <div className="mt-24 mb-4">
          <p className="px-4 text-center text-3xl md:text-5xl text-primary-content font-bold">
            {tvH[selected]}
          </p>
          <div className="flex justify-center mt-24 gap-3 md:gap-9">
            {tvH.map((v, i) => (
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
        <div className="flex flex-wrap justify-evenly animate-fade-up">
          {selectedTvs.map((v, i) => (
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
};

export const getServerSideProps = async () => {
  const baseUrl = "https://api.themoviedb.org/3";

  try {
    //  Fetching airing today tvs
    const res1 = await axios.get(`${baseUrl}/tv/airing_today`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    // Fetching on the air tvs
    const res2 = await axios.get(`${baseUrl}/tv/on_the_air`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    // Fetching popular tvs
    const res3 = await axios.get(`${baseUrl}/tv/popular`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    // Fetching top rated tvs
    const res4 = await axios.get(`${baseUrl}/tv/top_rated`, {
      params: {
        api_key: process.env.API_KEY,
        region: "KR",
        language: "ko-KR",
      },
    });

    const airing_today = res1.data.results;
    const on_the_air = res2.data.results;
    const popular = res3.data.results;
    const top_rated = res4.data.results;

    return {
      props: { airing_today, on_the_air, popular, top_rated },
    };
  } catch (error) {
    return {
      props: {
        error: error,
      },
    };
  }
};

export default TvIndexPage;
