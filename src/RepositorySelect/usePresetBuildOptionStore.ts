import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import { useAuth } from "../@shared";
import APIClient from "../@utils/api";
import { Framework, NodeVersion } from "../@types/build";

export type PresetBuildOptionStore = {
  space: string | null;
  repoName: string | null;
  defaultProjectName: string | null;
  defaultFramework: Framework | null;
  defaultBuildCommand: string | null;
  defaultInstallCommand: string | null;
  defaultNodeVersion: NodeVersion;

  actions: {
    setSpace: (space: string) => void;
    setRepoName: (repoName: string) => void;
  };
};

export const usePresetBuildOptionStore = create<PresetBuildOptionStore>()(
  (set, get) => ({
    space: null,
    repoName: null,
    defaultProjectName: null,
    defaultFramework: null,
    defaultBuildCommand: "npm run build",
    defaultInstallCommand: "npm install",
    defaultNodeVersion: "12.18.0",

    actions: {
      setSpace: (space: string) => {
        set({ space });
      },
      setRepoName: async (repoName: string) => {
        if (!get().space) {
          return;
        }
        const { user } = useAuth();

        if (!user) {
          return;
        }

        const api = new APIClient()
          .setAccessToken(user.accessToken)
          .setGithubAccessToken(user.githubAccessToken)
          .setUserId(user.id);

        try {
          const project = await api.getProject(repoName);
          const newProjectName = !!project
            ? `${repoName}-${nanoid(7)}`
            : repoName;

          set({
            repoName,
            defaultProjectName: newProjectName,
          });
        } catch (error) {
          set({
            repoName,
            defaultProjectName: repoName,
          });
        }
      },
    },
  }),
);

export const usePresetBuildOptions = () =>
  usePresetBuildOptionStore(
    store => ({
      defaultProjectName: store.defaultProjectName,
      defaultBuildCommand: store.defaultBuildCommand,
      defaultInstallCommand: store.defaultInstallCommand,
      defaultFramework: store.defaultFramework,
      defaultNodeVersion: store.defaultNodeVersion,
    }),
    shallow,
  );

export const useReposQuery = () => {
  const space = usePresetBuildOptionStore(store => store.space);
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
