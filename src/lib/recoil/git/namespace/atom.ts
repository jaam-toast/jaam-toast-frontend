import { atom } from "recoil";

import { GitNamespace } from "../../../../types";

const gitNamespaceState = atom<GitNamespace[]>({
  key: "gitNamespaceState",
  default: [],
});

export default gitNamespaceState;
