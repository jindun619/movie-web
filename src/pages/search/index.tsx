import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/page";

import Seo from "@/components/Seo";
import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
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
      </div>
    </>
  );
}
