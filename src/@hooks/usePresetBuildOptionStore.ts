import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import { customAlphabet } from "nanoid";

import { useAuth } from "./useAuth";
import APIClient from "../@utils/api";

import type { Framework, NodeVersion } from "../@types/build";
import type { Space } from "../@types/user";

export type PresetBuildOptionStore = {
  space: Space | null;
  repoName: string | null;
  defaultProjectName: string | null;
  defaultFramework: Framework | null;
  defaultBuildCommand: string | null;
  defaultInstallCommand: string | null;
  defaultNodeVersion: NodeVersion;

  actions: {
    setSpace: (space: Space) => void;
    setRepoName: (repoName: string) => void;
    setDefaultCommand: (setDefaultCommandOptions: {
      installCommand: string;
      buildCommand: string;
    }) => void;
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
      setSpace: (space: Space) => {
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
          const project = await api.getProject(repoName.toLowerCase());
          const randomName = customAlphabet(
            "0123456789abcdefghijklmnopqrstuvwxyz",
            7,
          );
          const newProjectName = !!project
            ? `${repoName.toLowerCase()}-${randomName()}`
            : repoName.toLowerCase();

          set({
            repoName,
            defaultProjectName: newProjectName,
          });
        } catch (error) {
          set({
            repoName,
            defaultProjectName: repoName.toLowerCase(),
          });
        }
      },
      setDefaultCommand: ({
        installCommand,
        buildCommand,
      }: {
        installCommand: string;
        buildCommand: string;
      }) => {
        set({
          defaultInstallCommand: installCommand,
          defaultBuildCommand: buildCommand,
        });
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

export const usePresetBuildOptionActions = () =>
  usePresetBuildOptionStore(store => store.actions);

export const useReposQuery = () => {
  const space = usePresetBuildOptionStore(store => store.space);
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useQuery({
    queryKey: ["repos", space?.spaceName ?? ""],
    queryFn: () => {
      if (!user || !space) {
        return [];
      }

      return api.getSpaceRepos(space);
    },
  });
};
