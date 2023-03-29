import { useQuery } from "@tanstack/react-query";

import { useUser } from "./useUserStore";
import APIClient from "utils/api";

import type { Space } from "types/api";
import type { User } from "types/auth";

export function useSpaceQuery() {
  const user = useUser();
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

      return api.getOrgs();
    },
    select: orgs => {
      if (!user) {
        return [];
      }

      return orgs.concat({
        spaceName: user.name,
        spaceUrl: user.githubUri,
        spaceImage: user.image ?? "",
      });
    },
  });
}

export const spacePrefetchQuery = (user: User) => {
  const api = new APIClient()
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken)
    .setUserId(user.id);

  return {
    queryKey: ["orgs"],
    queryFn: () => {
      if (!user) {
        return [];
      }

      return api.getOrgs();
    },
    select: (orgs: Space[]) => {
      if (!user) {
        return [];
      }

      return orgs.concat({
        spaceName: user.name,
        spaceUrl: user.githubUri,
        spaceImage: user.image ?? "",
      });
    },
  };
};
