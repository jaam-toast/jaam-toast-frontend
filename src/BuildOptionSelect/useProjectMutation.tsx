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
  const {
    projectName,
    isProjectNameAvailable,
    nodeVersion,
    framework,
    buildCommand,
    installCommand,
    envList,
  } = useBuildOptions();
  const { space, repoName } = usePresetBuildOptionStore(state => state);
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(
    ["project-create"],
    async () => {
      if (
        !isProjectNameAvailable ||
        !projectName ||
        !space ||
        !repoName ||
        !projectName ||
        !nodeVersion ||
        !framework ||
        !buildCommand ||
        !installCommand ||
        !envList
      ) {
        return;
      }

      const createProjectOptions = {
        userId: user.id,
        space,
        repoName,
        repoCloneUrl: `https://github.com/${space}/${repoName}.git`,
        projectUpdatedAt: new Date().toISOString(),
        githubAccessToken: user.githubAccessToken,
        projectName,
        nodeVersion,
        framework: framework,
        buildCommand,
        installCommand,
        envList,
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
