import { atom } from "recoil";

export const movieSelectedState = atom<number>({
  key: "movieSelected",
  default: 0, //0:playing_now 1:popular 2:top_rated
});
