import { atom } from "recoil";

export const tvSelectedState = atom<number>({
  key: "tvSelected",
  default: 0, //0:현재 방영중 1:popular 2:top_rated 3:방영 예정
});
