import { useQuery } from "@tanstack/react-query";

import { useAuth } from "./useAuth";
import APIClient from "../@utils/api";

export function useUserQuery() {
  const { user } = useAuth();
  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useQuery({
    queryKey: ["user-data", user.id],
    queryFn: () => api.getUserData(user.id),
  });
}
