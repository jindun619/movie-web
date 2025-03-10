import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";

import Seo from "@/components/Seo";
import { SearchBar } from "@/components/SearchBar";

export const SearchPage = () => {
  const setPage = useSetRecoilState(pageState);

  useEffect(() => {
    setPage(3);
  }, []);

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
        <p className="mt-10 text-center text-2xl md:text-4xl text-primary-content font-bold">
          영화 혹은 TV 프로그램 검색
        </p>
      </div>
    </>
  );
};

export default SearchPage;
