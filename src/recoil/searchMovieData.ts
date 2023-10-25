import { MovieType2 } from "@/types";
import { atom } from "recoil";

type DataType = {
  results: MovieType2[];
};

export const searchMovieDataState = atom<DataType>({
  key: "searchMovieData",
  default: {
    results: [],
  },
});
