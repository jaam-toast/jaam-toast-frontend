import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../@hooks";
import APIClient from "../@utils/api";

type Options = {
  onSuccess?: (data?: string) => Promise<unknown> | unknown;
  onError?: (error?: unknown) => Promise<unknown> | unknown;
};

export function useDeleteProjectMutation({ onSuccess, onError }: Options) {
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(
    ["project-delete"],
    async (projectName: string) => {
      return api.deleteProject({ projectName });
    },
    {
      onSuccess,
      onError,
    },
  );
}
