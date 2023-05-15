import { useMutation } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";

import { useBuildOptions } from "./useBuildOptionsStore";
import { usePresetBuildOptionStore } from "./usePresetBuildOptionStore";
import { useAuth } from "./useAuth";
import APIClient from "../@utils/api";
import { ERROR, SUCCESS } from "../@config/message";

import type {
  DeleteProjectOption,
  UpdateProjectBuildOptions,
  AddProjectOptions,
} from "../@types/api";
import { ValidationError } from "../@utils/createError";
import { toast } from "react-toastify";
import { Webhook } from "src/@types/cms";

export function useCreateProjectMutation() {
  const {
    projectName,
    isAvailableProjectName,
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
        !isAvailableProjectName ||
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
        throw new ValidationError(ERROR.NOT_FOUND.PROJECT_DATA);
      }

      const createProjectOptions = {
        userId: user.id,
        space: space.spaceName,
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
    { onSuccess: () => toast.success(SUCCESS.CREATE) },
  );
}

export function useAddProjectOptionMutaion<
  Option extends keyof Partial<AddProjectOptions>,
>() {
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
      option: Pick<AddProjectOptions, Option>;
      webhookId?: string;
    }) => {
      if (isEmpty(option)) {
        throw new ValidationError(ERROR.NOT_FOUND.ALL);
      }

      return api.addProjectOption<Pick<AddProjectOptions, Option>>({
        projectName,
        updateOption: option,
      });
    },
    { onSuccess: () => toast.success(SUCCESS.UPDATE) },
  );
}

export function useUpdateWebhookMutaion() {
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
      option: Webhook;
      webhookId?: string;
    }) => {
      if (isEmpty(option)) {
        throw new ValidationError(ERROR.NOT_FOUND.ALL);
      }

      return api.updateProjectWebhookOption({
        projectName,
        updateOption: option,
      });
    },
    { onSuccess: () => toast.success(SUCCESS.UPDATE) },
  );
}

export function useUpdateBuildOptionMutation() {
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(
    ["project-put"],
    async ({
      projectName,
      option,
    }: {
      projectName: string;
      option: Partial<UpdateProjectBuildOptions>;
    }) => {
      if (!projectName) {
        throw new ValidationError(ERROR.NOT_FOUND.PROJECT_NAME);
      }

      if (!option) {
        throw new ValidationError(ERROR.NOT_FOUND.ALL);
      }

      return api.updateProjectBuildOption({
        projectName,
        updateBuildOption: option,
      });
    },
    { onSuccess: () => toast.success(SUCCESS.DELETE) },
  );
}

export function useDeleteProjectOptionMutation<
  T extends keyof AddProjectOptions,
>() {
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(
    ["project-option-delete"],
    async ({
      projectName,
      option,
    }: {
      projectName: string;
      option: DeleteProjectOption<T>;
    }) => {
      return api.deleteProjectOption<T>({
        projectName,
        deleteOption: option,
      });
    },
    { onSuccess: () => toast.success(SUCCESS.DELETE) },
  );
}

export function useDeleteProjectMutaion() {
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(
    ["project-delete"],
    async (projectName: string) => {
      if (!projectName) {
        return;
      }

      return api.deleteProject(projectName);
    },
    { onSuccess: () => toast.success(SUCCESS.DELETE) },
  );
}
