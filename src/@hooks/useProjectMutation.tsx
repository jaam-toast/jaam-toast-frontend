import { useMutation } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";

import { useBuildOptions } from "./useBuildOptionsStore";
import { usePresetBuildOptionStore } from "./usePresetBuildOptionStore";
import { useAuth } from "./useAuth";
import APIClient from "../@utils/api";

import type { UpdateProjectOptions } from "../@types/api";

type UseProjectMutationOptions = {
  onSuccess?: (data?: string) => Promise<unknown> | unknown;
  onError?: (error?: unknown) => Promise<unknown> | unknown;
};

export function useCreateProjectMutation({
  onSuccess,
  onError,
}: UseProjectMutationOptions) {
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

// 진행중
export function useUpdateProjectMutaion() {
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(["project-update"], async (data: UpdateProjectOptions) => {
    if (isEmpty(data)) {
      return;
    }

    return api.updateProject(data);
  });
}
