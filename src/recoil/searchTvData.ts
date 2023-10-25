import { TvType2 } from "@/types";
import { atom } from "recoil";

type DataType = {
  results: TvType2[];
};

export const searchTvDataState = atom<DataType>({
  key: "searchTvData",
  default: {
    results: [],
  },
});
