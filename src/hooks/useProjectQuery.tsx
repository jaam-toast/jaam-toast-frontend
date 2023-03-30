import { useQuery } from "@tanstack/react-query";

import { useUser } from "./useUserStore";
import APIClient from "utils/api";

import type { User } from "types/auth";

export function useProjectQuery(projectName: string) {
  const user = useUser();
  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useQuery({
    queryKey: ["project", projectName],
    queryFn: () => api.getProject(projectName),
  });
}

export function projectPrefetchQuery(user: User, projectName: string) {
  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return {
    queryKey: ["project", projectName],
    queryFn: () => api.getProject(projectName),
  };
}
