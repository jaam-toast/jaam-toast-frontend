import { atom } from "recoil";

const searchWordState = atom<string>({
  key: "searchWordState",
  default: "",
});

export default searchWordState;
