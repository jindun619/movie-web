import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useRecoilState, useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";
import { searchTvDataState } from "@/recoil/searchTvData";
import { searchQueryState } from "@/recoil/searchQuery";
import { searchTypeState } from "@/recoil/searchtype";

import axios from "axios";

import Seo from "@/components/Seo";
import Poster from "@/components/Poster";
import SearchBar from "@/components/SearchBar";

export default function SearchMoviePage() {
  const setPage = useSetRecoilState(pageState);

  const [loadedDone, setLoadedDone] = useState<boolean>(false);

  const [searchTvData, setSearchTvData] = useRecoilState(searchTvDataState);
  const [searchQuery] = useRecoilState(searchQueryState);

  const [, setSearchType] = useRecoilState(searchTypeState);

  const router = useRouter();
  const { query } = router;
  const { queryStr } = query;

  useEffect(() => {
    setPage(3);
  }, []);

  useEffect(() => {
    // 기존 데이터 초기화
    setSearchTvData({ results: [] });

    axios
      .get(`/api/search/tv`, {
        params: {
          api_key: process.env.API_KEY,
          region: "KR",
          language: "ko-KR",
          query: queryStr,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSearchTvData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoadedDone(true);
  }, [queryStr]);

  const searchTypesKo = ["영화", "TV", "인물"];
  const selectedClass = `text-primary border-b-4 border-primary`;

  const searchTypes = ["movie", "tv", "person"];

  const og = {
    title: "검색",
    image: "a",
    description: "",
  };

  return (
    <>
      <Seo title="검색" og={og} />
      <div>
        {/* SEARCH BAR */}
        <SearchBar type={0} />
        {/* ''에 대한 검색결과 */}
        <p className="mt-10 text-center text-4xl text-primary-content font-bold">
          {`'${queryStr}'에 대한 검색 결과`}
        </p>
        {/* TYPE BUTTONS GROUP */}
        <div className="mt-10 flex justify-center">
          {searchTypesKo.map((v, i) => (
            <p
              key={i}
              className={`px-6 py-1 text-sm md:text-xl text-primary-content font-bold cursor-pointer ${
                i === 1 ? selectedClass : ""
              }`}
              onClick={() => {
                setSearchType(i);
                router.push(
                  `/search/${searchTypes[i]}/${searchQuery || queryStr}`
                );
              }}>
              {v}
            </p>
          ))}
        </div>
        {/* ITEMS */}
        <div className="mt-10 flex flex-wrap justify-evenly animate-fade-up">
          {searchTvData?.results.map((v, i) => (
            <Poster
              key={i}
              id={v.id}
              type="tv"
              poster_path={v.poster_path}
              title={v.name}
              date={v.first_air_date}
              vote_average={v.vote_average}
              overview={v.overview}
            />
          ))}
          {/* LOADING WHILE FETCHING DATA */}
          {loadedDone === true && searchTvData.results.length === 0 ? (
            <p>검색 결과 없음</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
