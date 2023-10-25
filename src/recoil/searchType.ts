import { atom } from "recoil";

export const searchTypeState = atom<number>({
  key: "searchType",
  default: 0, //0:영화, 1:TV
});
