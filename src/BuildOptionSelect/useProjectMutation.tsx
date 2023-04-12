import { useMutation } from "@tanstack/react-query";

import { useBuildOptions } from "./useBuildOptionsStore";
import { usePresetBuildOptionStore } from "../RepositorySelect/usePresetBuildOptionStore";
import { useAuth } from "../@shared/useAuth";
import APIClient from "../@utils/api";

type UseProjectMutationOptions = {
  onSuccess?: (data?: string) => Promise<unknown> | unknown;
  onError?: (error?: unknown) => Promise<unknown> | unknown;
};

function useProjectMutation({ onSuccess, onError }: UseProjectMutationOptions) {
  const buildOptions = useBuildOptions();
  const {
    space,
    repoName,
    defaultProjectName,
    defaultFramework,
    defaultBuildCommand,
    defaultInstallCommand,
    defaultNodeVersion,
  } = usePresetBuildOptionStore(state => state);
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  if (
    !buildOptions.isProjectNameAvailable ||
    !space ||
    !repoName ||
    !defaultProjectName ||
    !defaultInstallCommand ||
    !defaultBuildCommand
  ) {
    return;
  }

  return useMutation(
    ["project-create"],
    () => {
      const createProjectOptions = {
        userId: user.id,
        space,
        repoName,
        repoCloneUrl: `https://github.com/${space}/${repoName}.git`,
        projectUpdatedAt: new Date().toISOString(),
        githubAccessToken: user.githubAccessToken,
        projectName: buildOptions.projectName || defaultProjectName,
        nodeVersion: buildOptions.nodeVersion || defaultNodeVersion,
        framework: buildOptions.framework || defaultFramework,
        buildCommand: buildOptions.buildCommand || defaultBuildCommand,
        installCommand: buildOptions.installCommand || defaultInstallCommand,
        envList: buildOptions.envList,
      };

      return api.createProject(createProjectOptions);
    },
    {
      onSuccess,
      onError,
    },
  );
}

export default useProjectMutation;
