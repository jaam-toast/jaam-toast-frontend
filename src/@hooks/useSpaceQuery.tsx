import { useQuery } from "@tanstack/react-query";

import { useAuth } from "./useAuth";
import APIClient from "../@utils/api";

export function useSpaceQuery() {
  const { user } = useAuth();
  const api = new APIClient()
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken)
    .setUserId(user?.id);

  return useQuery({
    queryKey: ["orgs"],
    queryFn: () => {
      if (!user) {
        return [];
      }

      return api.getSpaces();
    },
  });
}
