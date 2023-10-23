import { atom } from "recoil";

export const searchQueryState = atom<string>({
    key: "searchQuery",
    default: ""
})