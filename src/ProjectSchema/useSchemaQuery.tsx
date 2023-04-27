import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../@shared/useAuth";
import APIClient from "../@utils/api";

export function useProjectSchemaQuery(projectName: string) {
  const { user } = useAuth();
  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useQuery({
    queryKey: ["project", projectName],
    queryFn: () => api.getProject(projectName),
    select: project => project.schemaList,
  });
}
