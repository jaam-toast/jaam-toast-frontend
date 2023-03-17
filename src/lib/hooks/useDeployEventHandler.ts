import { ChangeEvent } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { setCookie } from "cookies-next";
import { SelectChangeEvent } from "@mui/material";

import { getOrgRepos, getUserRepos, deployRepo } from "../api";
import { gitRepoState, cloneUrlState, cloneRepoName } from "../recoil/git";
import buildOptionsState from "../recoil/userBuildOptions";
import userDeploymentsState from "../recoil/userDeployments";
import getFormattedKoreaTime from "../../lib/utils/getFormattedKoreaTime";

import { UserDeploymentData } from "../../types/deployment";
import {
  Repo,
  BuildOptions,
  EventHandlerName,
} from "../../types/projectOption";

function useDeployEventHandler(type: EventHandlerName, userId?: string) {
  const [repoCloneUrl, setCloneUrl] = useRecoilState<string>(cloneUrlState);
  const [buildOption, setBuildOption] =
    useRecoilState<BuildOptions>(buildOptionsState);
  const [deploymentList, setDeploymentList] =
    useRecoilState<UserDeploymentData[]>(userDeploymentsState);
  const setGitRepos = useSetRecoilState<Repo[]>(gitRepoState);
  const repoName = useRecoilValue<string>(cloneRepoName);

  switch (type) {
    case "spaceChange": {
      return async (e: SelectChangeEvent) => {
        if (!userId) return;

        setBuildOption(prev => ({ ...prev, userId }));

        const selectedNamespaceUrl = e.target.value;

        const spaceOption = selectedNamespaceUrl
          .split("https://api.github.com/")[1]
          .split("/")[0];

        const selectedNamespace = selectedNamespaceUrl
          .split("https://api.github.com/")[1]
          .split("/")[1];

        if (spaceOption === "orgs") {
          const { data: orgRepos } = await getOrgRepos(
            userId,
            selectedNamespace,
          );

          return setGitRepos(orgRepos);
        }

        const { data: userRepos } = await getUserRepos(userId);

        return setGitRepos(userRepos);
      };
    }
    case "repoChange": {
      return (e: SelectChangeEvent) => {
        const selectedRepoUrl = e.target.value;

        setCloneUrl(selectedRepoUrl);
        setBuildOption(prev => ({ ...prev, repoCloneUrl: selectedRepoUrl }));
      };
    }
    case "nodeVersionChange": {
      return (e: SelectChangeEvent) => {
        const curNodeVersion = e.target.value;

        setBuildOption(prev => ({ ...prev, nodeVersion: curNodeVersion }));
      };
    }
    case "buildTypeChange": {
      return (e: SelectChangeEvent) => {
        const curBuildType = e.target.value;

        setBuildOption(prev => ({ ...prev, buildType: curBuildType }));
      };
    }
    case "installCommandChange": {
      return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBuildOption(prev => ({ ...prev, installCommand: e.target.value }));
      };
    }
    case "buildCommandChange": {
      return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBuildOption(prev => ({ ...prev, installCommand: e.target.value }));
      };
    }
    case "addEnvClick": {
      return (key: string, value: string) => {
        const newEnv = {
          key,
          value,
        };

        setBuildOption(prev => ({
          ...prev,
          envList: [...prev.envList, newEnv],
        }));
      };
    }
    case "removeEnvClick": {
      return (curIndex: number) => {
        setBuildOption(prev => ({
          ...prev,
          envList: prev.envList.filter((_, index) => index !== curIndex),
        }));
      };
    }
    case "deployClick": {
      return async () => {
        if (!userId) return;

        const filteredEnvs = buildOption.envList.filter((_, i) => i !== 0);
        const formattedTime = getFormattedKoreaTime(new Date());

        const userBuildOptions = {
          userId,
          repoName,
          repoCloneUrl,
          repoUpdatedAt: formattedTime,
          nodeVersion: buildOption.nodeVersion,
          installCommand: buildOption.installCommand,
          buildCommand: buildOption.buildCommand,
          envList: filteredEnvs,
          buildType: buildOption.buildType,
          lastCommitMessage: "",
        };

        const { data: userDeploymentData } = await deployRepo(userBuildOptions);

        const copyUserDeployData = JSON.parse(
          JSON.stringify(userDeploymentData),
        );
        copyUserDeployData.buildingLog = [];
        setDeploymentList([...deploymentList, userDeploymentData]);
        setCookie(
          "userDeployments",
          JSON.stringify([...deploymentList, copyUserDeployData]),
        );

        return userDeploymentData;
      };
    }
    default:
      return () => {};
  }
}

export default useDeployEventHandler;
