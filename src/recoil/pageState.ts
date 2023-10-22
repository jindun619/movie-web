import { atom } from "recoil";

export const pageState = atom({
  key: "pageState",
  default: 0, //0:home 1:movie 2:tv
});
