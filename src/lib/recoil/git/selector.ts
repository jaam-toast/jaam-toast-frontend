import { selector } from "recoil";
import { getCookie } from "cookies-next";

import { cloneUrlState, gitNamespaceState } from "./atom";
import { UserLoginData, LoginResponse } from "../../../types/auth";
import { GitNamespace } from "../../../types/projectOption";

const cloneRepoName = selector<string>({
  key: "cloneRepoName",
  get: ({ get }) => {
    const cloneUrl = get(cloneUrlState);

    if (!cloneUrl) return cloneUrl;

    const repoName = cloneUrl
      .split("https://github.com/")[1]
      .split("/")[1]
      .split(".git")[0]
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();

    return repoName;
  },
});

const gitNamespaceList = selector<GitNamespace[]>({
  key: "gitNamespaceList",
  get: ({ get }) => {
    const orgsSpaceList = get(gitNamespaceState);

    const userSpace: GitNamespace = {
      spaceName: "",
      spaceUrl: "",
    };

    if (getCookie("loginData")) {
      const { data: loggedInUserData }: { data: UserLoginData } = JSON.parse(
        getCookie("loginData") as string,
      ) as LoginResponse;

      userSpace.spaceName = loggedInUserData.username;
      userSpace.spaceUrl = loggedInUserData.userGithubUri;
      userSpace.spaceImage = loggedInUserData.userImage;
    }

    return [userSpace, ...orgsSpaceList];
  },
});

export { cloneRepoName, gitNamespaceList };