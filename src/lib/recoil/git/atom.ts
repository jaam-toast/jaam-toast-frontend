import { atom } from "recoil";

import { GitNamespace, Repo } from "../../../types/projectOption";

const cloneUrlState = atom({
  key: "cloneUrlState",
  default: "",
});

const gitNamespaceState = atom<GitNamespace[]>({
  key: "gitNamespaceState",
  default: [],
});

const gitRepoState = atom<Repo[]>({
  key: "gitRepoState",
  default: [],
});

export { cloneUrlState, gitNamespaceState, gitRepoState };
