import { ChangeEvent } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { SelectChangeEvent } from "@mui/material";

import gitRepoState from "../recoil/git/repos";
import cloneUrlState from "../recoil/git/clone";
import buildOptionState from "../recoil/userBuildOptions";
import { getOrgRepos, getUserRepos } from "../api";

import {
  Repo,
  UserDeploymentData,
  BuildOption,
  EventHandler,
  EventHandlerType,
} from "../../types/index";

function useDeployEventHandler(type: EventHandlerType, userId?: string) {
  const [repoCloneUrl, setCloneUrl] = useRecoilState<string>(cloneUrlState);
  const [buildOption, setBuildOption] =
    useRecoilState<BuildOption>(buildOptionState);
  const setGitRepos = useSetRecoilState<Repo[]>(gitRepoState);

  const handlers: EventHandler = {
    spaceChange: null,
    repoChange: null,
    versionChange: null,
    buildTypeChange: null,
    nodeVersionChange: null,
    installCommandChange: null,
    buildCommandChange: null,
    addEnvClick: null,
    removeEnvClick: null,
    deployClick: null,
  };

  handlers.nodeVersionChange = (e: SelectChangeEvent) => {
    const curNodeVersion = e.target.value;

    setBuildOption(prev => ({ ...prev, nodeVersion: curNodeVersion }));
  };

  handlers.buildTypeChange = (e: SelectChangeEvent) => {
    const curBuildType = e.target.value;

    setBuildOption(prev => ({ ...prev, buildType: curBuildType }));
  };

  handlers.installCommandChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBuildOption(prev => ({ ...prev, installCommand: e.target.value }));
  };

  handlers.buildCommandChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBuildOption(prev => ({ ...prev, installCommand: e.target.value }));
  };

  handlers.addEnvClick = (key: string, value: string) => {
    const newEnv = {
      key,
      value,
    };

    setBuildOption(prev => ({ ...prev, envs: [...prev.envs, newEnv] }));
  };

  handlers.removeEnvClick = (curIndex: number) => {
    setBuildOption(prev => ({
      ...prev,
      envs: prev.envs.filter((_, index) => index !== curIndex),
    }));
  };

  handlers.spaceChange = async (e: SelectChangeEvent) => {
    if (!userId) return;

    const selectedNamespaceUrl = e.target.value;

    const spaceOption = selectedNamespaceUrl
      .split("https://api.github.com/")[1]
      .split("/")[0];

    const selectedNamespace = selectedNamespaceUrl
      .split("https://api.github.com/")[1]
      .split("/")[1];

    if (spaceOption === "orgs") {
      const { data: orgRepos } = await getOrgRepos(userId, selectedNamespace);

      return setGitRepos(orgRepos);
    }

    const { data: userRepos } = await getUserRepos(userId);

    return setGitRepos(userRepos);
  };

  handlers.repoChange = (e: SelectChangeEvent) => {
    const selectedRepoUrl = e.target.value;

    setCloneUrl(selectedRepoUrl);
  };

  handlers.deployClick = async () => {};

  return handlers[type];
}

export default useDeployEventHandler;
