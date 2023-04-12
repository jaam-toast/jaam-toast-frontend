import { useMutation } from "@tanstack/react-query";

import { useBuildOptions } from "./useBuildOptionsStore";
import { useProjectName } from "../@shared/useProjectNameStore";
import { useRepo, useSpace } from "../RepositorySelect/useRepoStore";
import { useAuth } from "../@shared/useAuth";
import APIClient from "../@utils/api";

type UseProjectMutationOptions = {
  onValidateFail?: (message: string) => void;
  onSuccess?: (data?: string) => Promise<unknown> | unknown;
  onError?: (error?: unknown) => Promise<unknown> | unknown;
};

function useProjectMutation({
  onValidateFail,
  onSuccess,
  onError,
}: UseProjectMutationOptions) {
  const projectName = useProjectName();
  const repo = useRepo();
  const space = useSpace();
  const buildOptions = useBuildOptions();
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  if (
    !projectName ||
    !buildOptions.buildType ||
    !buildOptions.buildCommand ||
    !buildOptions.installCommand ||
    !buildOptions.nodeVersion
  ) {
    if (!onValidateFail) {
      return;
    }

    onValidateFail("Cannot deploy project. Project options are required.");
    return;
  }

  const { mutate } = useMutation(
    ["project-create"],
    () =>
      api.createProject({
        projectName,
        userId: user?.id!,
        space,
        repoName: repo!,
        repoCloneUrl: `https://github.com/${space}/${repo}.git`,
        projectUpdatedAt: new Date().toISOString(),
        githubAccessToken: user?.githubAccessToken!,
        ...buildOptions,
      }),
    {
      onSuccess,
      onError,
    },
  );

  return mutate;
}

export default useProjectMutation;
