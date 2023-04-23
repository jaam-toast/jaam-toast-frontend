import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../@shared/useAuth";
import APIClient from "../@utils/api";

import type { User } from "../@types/auth";

export function useProjectQuery(projectName: string) {
  const { user } = useAuth();
  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useQuery({
    queryKey: ["project", projectName],
    queryFn: () => api.getProject(projectName),
  });
}
