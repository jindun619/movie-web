import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";
import { searchDataState } from "@/recoil/searchData";
import { searchQueryState } from "@/recoil/searchQuery";

import axios from "axios";

import Seo from "@/components/Seo";
import Poster from "@/components/Poster";

export default function SearchPage() {
  const setPage = useSetRecoilState(pageState);

  const [loadData, setLoadData] = useState<boolean>(false);
  const [loadedDone, setLoadedDone] = useState<boolean>(false);

  const [searchData, setSearchData] = useRecoilState(searchDataState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  // useEffect(() => {
  //   setPage(3);
  // }, []);

  useEffect(() => {
    if (loadData) {
      // 기존 데이터 초기화
      setSearchData({ results: [] });
      setLoadedDone(false);

      axios
        .get(`/api/search/movie`, {
          params: {
            api_key: process.env.API_KEY,
            region: "KR",
            language: "ko-KR",
            query: searchQuery,
          },
        })
        .then((res) => {
          console.log(res.data);
          setSearchData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoadData(false);
      setLoadedDone(true);
    }
  }, [loadData]);

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
        <div className="mt-32 flex justify-center">
          <div className="w-11/12 md:w-6/12 relative">
            <input
              type="text"
              className="w-full p-3 text-2xl text-black font-bold bg-primary-content outline outline-4 focus:outline-primary"
              value={searchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setLoadData(true);
                }
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <button
              className="absolute right-0 bottom-0 h-full px-6 bg-primary text-xl text-primary-content font-semibold rounded-none"
              onClick={() => {
                setLoadData(true);
              }}>
              검색
            </button>
          </div>
        </div>
        {/* ITEMS */}
        <div className="mt-20 flex flex-wrap justify-evenly animate-fade-up">
          {searchData.results.map((v, i) => (
            <Poster
              key={i}
              id={v.id}
              type="movie"
              poster_path={v.poster_path}
              title={v.title}
              date={v.release_date}
              vote_average={v.vote_average}
              overview={v.overview}
            />
          ))}
          {/* LOADING WHILE FETCHING DATA */}
          {loadedDone === true && searchData.results.length === 0 ? (
            <p>검색 결과 없음</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
