import { atom } from "recoil";

const cloneUrlState = atom({
  key: "cloneUrlState",
  default: "",
});

export default cloneUrlState;
