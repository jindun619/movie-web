import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/pageState";

import Seo from "@/components/Seo";

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
        <div className="mt-32 flex justify-center">
          <input
            type="text"
            className="w-6/12 p-3 text-center text-2xl text-black font-semibold bg-primary-content"
          />
        </div>
      </div>
    </>
  );
}
