import { selector } from "recoil";

import cloneUrlState from "./atom";

const cloneRepoName = selector<string>({
  key: "cloneRepoName",
  get: ({ get }) => {
    const cloneUrl = get(cloneUrlState);

    const repoName = cloneUrl
      .split("https://github.com/")[1]
      .split("/")[1]
      .split(".git")[0]
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();

    return repoName;
  },
});

export default cloneRepoName;
