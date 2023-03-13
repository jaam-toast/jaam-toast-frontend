import { selector } from "recoil";
import { getCookie } from "cookies-next";

import gitNamespaceAtom from "./atom";

import { GitNamespace, UserLoginData, LoginResponse } from "../../../../types";

const gitNamespaceList = selector<GitNamespace[]>({
  key: "gitNamespaceList",
  get: ({ get }) => {
    const orgsSpaceList = get(gitNamespaceAtom);

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

export default gitNamespaceList;
