import { atom } from "recoil";

import { Repo } from "../../../../types";

const gitRepoState = atom<Repo[]>({
  key: "gitRepoState",
  default: [],
});

export default gitRepoState;
