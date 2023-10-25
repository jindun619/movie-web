import { useRouter } from "next/router";

import { useRecoilState } from "recoil";

import { searchQueryState } from "@/recoil/searchQuery";

export default function SearchBar({
  type,
}: {
  type: number;
}) {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  const router = useRouter();

  const searchTypes = ["movie", "tv", "person"];

  return (
    <div className="mt-32 flex justify-center">
      <div className="w-11/12 md:w-6/12 relative">
        <input
          type="text"
          className="w-full p-3 text-2xl text-black font-bold bg-primary-content outline outline-4 focus:outline-primary"
          value={searchQuery}
          onKeyDown={(e) => {
            if (searchQuery !== "" && e.key === "Enter") {
              router.push(`/search/${searchTypes[type]}/${searchQuery}`);
            }
          }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button
          className="absolute right-0 bottom-0 h-full px-6 bg-primary text-xl text-primary-content font-semibold rounded-none"
          onClick={() => {
            if (searchQuery !== "")
              router.push(`/search/${searchTypes[type]}/${searchQuery}`);
          }}>
          검색
        </button>
      </div>
    </div>
  );
}
