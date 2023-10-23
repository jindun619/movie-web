import { atom } from "recoil";

export const pageState = atom<number>({
  key: "page",
  default: 0, //0:home 1:movie 2:tv 3:search
});
