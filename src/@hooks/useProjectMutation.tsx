import { useMutation } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";
import { toast } from "react-toastify";

import { ERROR, SUCCESS } from "../@config/message";
import { ValidationError } from "../@utils/createError";
import {
  addProjectOption,
  createProject,
  deleteProject,
  deleteProjectOption,
  updateProjectBuildOption,
  updateProjectWebhookOption,
} from "../@utils/api";
import { useBuildOptions } from "./useBuildOptionsStore";
import { usePresetBuildOptionStore } from "./usePresetBuildOptionStore";

import { Webhook } from "../@types/cms";
import { BuildOptions } from "src/@types/build";

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
        space: space.spaceName,
        repoName,
        repoCloneUrl: `https://github.com/${space.spaceName}/${repoName}.git`,
        projectName,
        nodeVersion,
        framework: framework,
        buildCommand,
        installCommand,
        envList,
      };

      return createProject(createProjectOptions);
    },
    { onSuccess: () => toast.success(SUCCESS.CREATE) },
  );
}

export function useAddProjectOptionMutaion() {
  return useMutation(
    ["project-patch"],
    async ({
      projectName,
      option,
    }: {
      projectName: string;
      option: Partial<{
        customDomain: string;
        webhook: Webhook;
      }>;
      webhookId?: string;
    }) => {
      if (isEmpty(option)) {
        throw new ValidationError(ERROR.NOT_FOUND.ALL);
      }

      return addProjectOption({
        projectName,
        updateOption: option,
      });
    },
    { onSuccess: () => toast.success(SUCCESS.UPDATE) },
  );
}

export function useUpdateWebhookMutaion() {
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

      return updateProjectWebhookOption({
        projectName,
        updateOption: option,
      });
    },
    { onSuccess: () => toast.success(SUCCESS.UPDATE) },
  );
}

export function useUpdateBuildOptionMutation() {
  return useMutation(
    ["project-put"],
    async ({
      projectName,
      option,
    }: {
      projectName: string;
      option: Partial<
        Pick<BuildOptions, "installCommand" | "buildCommand" | "envList">
      >;
    }) => {
      if (isEmpty(option)) {
        throw new ValidationError(ERROR.NOT_FOUND.ALL);
      }

      return updateProjectBuildOption({
        projectName,
        updateBuildOption: option,
      });
    },
    { onSuccess: () => toast.success(SUCCESS.DELETE) },
  );
}

export function useDeleteProjectOptionMutation() {
  return useMutation(
    ["project-option-delete"],
    async ({
      projectName,
      option,
    }: {
      projectName: string;
      option: Partial<{
        customDomain: string;
        webhook: Webhook[];
      }>;
    }) => {
      if (isEmpty(option)) {
        throw new ValidationError(ERROR.NOT_FOUND.ALL);
      }

      return deleteProjectOption({
        projectName,
        deleteOption: option,
      });
    },
    { onSuccess: () => toast.success(SUCCESS.DELETE) },
  );
}

export function useDeleteProjectMutaion() {
  return useMutation(
    ["project-delete"],
    async (projectName: string) => deleteProject(projectName),
    { onSuccess: () => toast.success(SUCCESS.DELETE) },
  );
}
