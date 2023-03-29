import { useQuery } from "@tanstack/react-query";

import { useUser } from "./useUserStore";
import APIClient from "utils/api";

export function useProjectListQuery() {
  const user = useUser();
  const api = new APIClient()
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken)
    .setUserId(user?.id);

  return useQuery({
    queryKey: ["projectList"],
    queryFn: () => {
      if (!user) {
        return [];
      }

      return api.getProjectList();
    },
  });
}
