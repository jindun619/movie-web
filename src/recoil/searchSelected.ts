import { atom } from "recoil";

export const searchSelectedState = atom<number>({
  key: "searchSelected",
  default: 0, //0:영화, 1:TV, 2:인물
});
