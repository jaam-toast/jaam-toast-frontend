import { atom } from "recoil";
import { getCookie } from "cookies-next";

import { UserDeploymentData } from "types/deployment";

const userDeploymentsState = atom<UserDeploymentData[]>({
  key: "userDeploymentsState",
  default: getCookie("userDeployments")
    ? (JSON.parse(
        getCookie("userDeployments") as string,
      ) as UserDeploymentData[])
    : [],
});

const selectedProject = atom<UserDeploymentData>({
  key: "selectedProject",
  default: {
    subDomain: "",
    nodeVersion: "",
    installCommand: "",
    buildCommand: "",
    buildType: "",
    envList: [],
    lastCommitMessage: "",
    repoId: "",
    webhookId: "",
    repoName: "string",
    repoCloneUrl: "string",
    repoUpdatedAt: "string",
    repoOwner: "string",
    userId: "",
    instanceId: "string",
    deployedUrl: "string",
    recordId: "string",
    buildingLog: [],
  },
});

export { userDeploymentsState, selectedProject };
