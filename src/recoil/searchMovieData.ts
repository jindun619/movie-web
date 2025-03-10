import { MovieType2 } from "@/types";
import { atom } from "recoil";

export const searchMovieDataState = atom<MovieType2[] | undefined>({
  key: "searchMovieData",
  default: {
    results: [],
  },
});
