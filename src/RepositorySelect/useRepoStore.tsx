import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

import APIClient from "../@utils/api";
import { useAuth } from "../@shared/useAuth";

type RepoStore = {
  space: string;
  repo: string | null;
  actions: {
    setSpace: (space: string) => void;
    setRepo: (repo: string) => void;
  };
};

const useRepoStore = create<RepoStore>()(set => ({
  space: "",
  repo: null,
  actions: {
    setSpace: (space: string) => set({ space }),
    setRepo: (repo: string) => set({ repo }),
  },
}));

export const useSpace = () => useRepoStore((state: RepoStore) => state.space);

export const useRepo = () => useRepoStore((state: RepoStore) => state.repo);

export const useSpaceActions = () =>
  useRepoStore((state: RepoStore) => state.actions);

export const useReposQuery = () => {
  const space = useSpace();
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useQuery({
    queryKey: ["repos", space],
    queryFn: () => {
      if (!user || !space) {
        return [];
      }

      return space === user.name ? api.getUserRepos() : api.getOrgRepos(space);
    },
  });
};
