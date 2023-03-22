import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { SelectChangeEvent } from "@mui/material";

import { getOrgRepos, getUserRepos } from "src/api";
import { gitRepoState } from "src/recoil/git";
import { buildOptionsState } from "src/recoil/buildOptions";

import { Repo, BuildOptions, EventHandlerName } from "types/projectOption";

function useDeployEventHandler(type: EventHandlerName, userId?: string) {
  const setBuildOption = useSetRecoilState<BuildOptions>(buildOptionsState);
  const setGitRepos = useSetRecoilState<Repo[]>(gitRepoState);

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

          setGitRepos(orgRepos);

          return;
        }

        const { data: userRepos } = await getUserRepos(userId);

        setGitRepos(userRepos);

        return;
      };
    }
    case "projectNameChange": {
      return async (subDomain: string) => {
        setBuildOption(prev => ({ ...prev, subDomain }));
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

    default:
      return () => {};
  }
}

export default useDeployEventHandler;
