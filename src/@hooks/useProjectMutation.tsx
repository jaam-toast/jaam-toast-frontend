import { useMutation } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";

import { useBuildOptions } from "./useBuildOptionsStore";
import { usePresetBuildOptionStore } from "./usePresetBuildOptionStore";
import { useAuth } from "./useAuth";
import APIClient from "../@utils/api";

import type { PatchProjectOption, PutProjectOption } from "../@types/api";

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

export function usePatchProjectMutaion() {
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(
    ["project-patch"],
    async ({
      projectName,
      option,
    }: {
      projectName: string;
      option: PatchProjectOption;
    }) => {
      if (isEmpty(option)) {
        return;
      }

      return api.patchProject({ projectName, option });
    },
  );
}

export function usePutProjectMutaion() {
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  // TODO domain delete
  return useMutation(
    ["project-put"],
    async ({
      projectName,
      option,
    }: {
      projectName: string;
      option: PutProjectOption;
    }) => {
      return api.putProject({ projectName, option });
    },
  );
}

export function useDeleteProjectMutaion() {
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(["project-delete"], async (projectName: string) => {
    if (!projectName) {
      return;
    }

    return api.deleteProject(projectName);
  });
}
