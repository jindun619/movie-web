import { atom } from "recoil";

export const loadSearchState = atom<boolean>({
  key: "loadSearch",
  default: false,
});
