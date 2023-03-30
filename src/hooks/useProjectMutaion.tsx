import { useMutation } from "@tanstack/react-query";

import { useBuildOptions } from "./useBuildOptionsStore";
import { useProjectName } from "./useProjectNameStore";
import { useRepo, useSpace } from "./useRepoStore";
import { useUser } from "./useUserStore";
import APIClient from "utils/api";

type UseProjectMutaionOptions = {
  onValidateFail?: (message: string) => void;
  onSuccess?: (data?: string) => Promise<unknown> | unknown;
  onError?: (error?: unknown) => Promise<unknown> | unknown;
};

function useProjectMutaion({
  onValidateFail,
  onSuccess,
  onError,
}: UseProjectMutaionOptions) {
  const projectName = useProjectName();
  const repo = useRepo();
  const space = useSpace();
  const buildOptions = useBuildOptions();
  const user = useUser();

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

export default useProjectMutaion;
