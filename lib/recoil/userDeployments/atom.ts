import { atom } from "recoil";
import { getCookie } from "cookies-next";

import { UserDeploymentData } from "../../../types";

const userDeploymentsState = atom<UserDeploymentData[]>({
  key: "userDeploymentsState",
  default: getCookie("userDeployments")
    ? (JSON.parse(
        getCookie("userDeployments") as string,
      ) as UserDeploymentData[])
    : [],
});

export default userDeploymentsState;
