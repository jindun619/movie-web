import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";
import { searchDataState } from "@/recoil/searchData";
import { searchQueryState } from "@/recoil/searchQuery";
import { searchSelectedState } from "@/recoil/searchSelected";

import axios from "axios";

import Seo from "@/components/Seo";
import Poster from "@/components/Poster";

export default function SearchPage() {
  const setPage = useSetRecoilState(pageState);

  const [loadData, setLoadData] = useState<boolean>(false);
  const [loadedDone, setLoadedDone] = useState<boolean>(false);

  const [searchData, setSearchData] = useRecoilState(searchDataState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  const [selected, setSelected] = useRecoilState(searchSelectedState);

  useEffect(() => {
    setPage(3);
  }, []);

  useEffect(() => {
    if (loadData) {
      // 기존 데이터 초기화
      setSearchData({ results: [] });
      setLoadedDone(false);

      switch (selected) {
        case 0:
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
              // console.log(res.data);
              setSearchData(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        case 1:
          axios
            .get(`/api/search/tv`, {
              params: {
                api_key: process.env.API_KEY,
                region: "KR",
                language: "ko-KR",
                query: searchQuery,
              },
            })
            .then((res) => {
              // console.log(res.data);
              setSearchData(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        case 2:
          axios
            .get(`/api/search/person`, {
              params: {
                api_key: process.env.API_KEY,
                region: "KR",
                language: "ko-KR",
                query: searchQuery,
              },
            })
            .then((res) => {
              // console.log(res.data);
              setSearchData(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          break;
      }

      setLoadData(false);
      setLoadedDone(true);
    }
  }, [loadData]);

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  useEffect(() => {
    setLoadData(true);
  }, [selected]);

  const searchTypes = ["영화", "TV", "인물"];
  const selectedClass = `text-primary border-b-4 border-primary`;

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
        {/* TYPE BUTTONS GROUP */}
        <div className="mt-24 flex justify-center">
          {searchTypes.map((v, i) => (
            <p
              key={i}
              className={`px-6 py-1 text-sm md:text-xl text-primary-content font-bold cursor-pointer ${
                selected === i ? selectedClass : ""
              }`}
              onClick={() => {
                setSelected(i);
              }}>
              {v}
            </p>
          ))}
        </div>
        {/* ITEMS */}
        <div className="mt-10 flex flex-wrap justify-evenly animate-fade-up">
          {selected === 0
            ? searchData?.results.map((v, i) => (
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
              ))
            : selected === 1
            ? searchData?.results.map((v, i) => (
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
              ))
            : ""}
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
