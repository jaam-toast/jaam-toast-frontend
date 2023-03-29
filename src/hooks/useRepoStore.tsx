import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

import { useUser } from "./useUserStore";
import APIClient from "utils/api";

type SpaceStore = {
  space: string;
  repo: string | null;
  actions: {
    setSpace: (space: string) => void;
    setRepo: (repo: string) => void;
  };
};

const useRepoStore = create<SpaceStore>()(set => ({
  space: "",
  repo: null,
  actions: {
    setSpace: (space: string) => set({ space }),
    setRepo: (repo: string) => set({ repo }),
  },
}));

export const useSpace = () => useRepoStore((state: SpaceStore) => state.space);

export const useRepo = () => useRepoStore((state: SpaceStore) => state.repo);

export const useSpaceActions = () =>
  useRepoStore((state: SpaceStore) => state.actions);

export const useReposQuery = () => {
  const space = useSpace();
  const user = useUser();

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
