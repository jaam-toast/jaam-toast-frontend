import { selector } from "recoil";
import { getCookie } from "cookies-next";

import { cloneUrlState, gitNamespaceState } from "./atom";
import { UserLoginData, LoginResponse } from "../../../types/auth";
import { GitNamespace } from "../../../types/projectOption";
import isEmpty from "../../utils/isEmpty";

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
    let orgsSpaceList: GitNamespace[] | undefined = [];

    if (get(gitNamespaceState)) {
      orgsSpaceList = get(gitNamespaceState);
    }

    if (isEmpty(orgsSpaceList) && getCookie("userOrgs")) {
      const orgsCookieData = JSON.parse(getCookie("userOrgs") as string);

      orgsSpaceList = orgsCookieData as GitNamespace[];
    }

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
