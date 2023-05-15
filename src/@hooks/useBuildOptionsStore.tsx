import { create } from "zustand";
import { shallow } from "zustand/shallow";

import { usePresetBuildOptions } from "./usePresetBuildOptionStore";
import { useAuth } from "./useAuth";
import APIClient from "../@utils/api";

import { Env } from "../@types/project";
import type { Framework, NodeVersion } from "../@types/build";

type BuildOptionsStore = {
  projectName: string | null;
  isAvailableProjectName: boolean;
  nodeVersion: NodeVersion | null;
  envList: Env[];
  framework: Framework | null;
  buildCommand: string;
  installCommand: string;

  setBuildOptions: <BuildOption extends BuildOptions>(
    option: BuildOption,
    select:
      | BuildOptionsStore[BuildOption]
      | ((
          prev: BuildOptionsStore[BuildOption],
        ) => BuildOptionsStore[BuildOption]),
  ) => void;
  setProjectName: (projectName: string) => void;
};

type BuildOptions = keyof Pick<
  BuildOptionsStore,
  | "projectName"
  | "nodeVersion"
  | "envList"
  | "framework"
  | "buildCommand"
  | "installCommand"
>;

const useBuildOptionsStore = create<BuildOptionsStore>()((set, get) => ({
  projectName: null,
  isAvailableProjectName: true,
  nodeVersion: null,
  framework: null,
  buildCommand: "npm run build",
  installCommand: "npm install",
  envList: [],

  setBuildOptions: (option, select) => {
    if (typeof select === "function") {
      const prev = get()[option];
      const result = select(prev);
      set({ [option]: result });
    } else {
      set({ [option]: select });
    }
  },
  setProjectName: async (projectName: string) => {
    set({ projectName });

    const { user } = useAuth();

    if (!user) {
      return;
    }

    const api = new APIClient()
      .setAccessToken(user.accessToken)
      .setGithubAccessToken(user.githubAccessToken)
      .setUserId(user.id);

    try {
      const project = await api.getProject(projectName);

      set({
        isAvailableProjectName: !project,
      });
    } catch (error) {
      set({
        isAvailableProjectName: true,
      });
    }
  },
}));

export const useBuildOptions = () => {
  const {
    defaultProjectName,
    defaultBuildCommand,
    defaultFramework,
    defaultInstallCommand,
    defaultNodeVersion,
  } = usePresetBuildOptions();

  return useBuildOptionsStore(
    (state: BuildOptionsStore) => ({
      projectName: state.projectName || defaultProjectName,
      isAvailableProjectName: state.isAvailableProjectName,
      nodeVersion: state.nodeVersion || defaultNodeVersion,
      framework: state.framework || defaultFramework,
      buildCommand: state.buildCommand || defaultBuildCommand,
      installCommand: state.installCommand || defaultInstallCommand,
      envList: state.envList,
    }),
    shallow,
  );
};

export const useSetBuildOptions = () =>
  useBuildOptionsStore(
    (state: BuildOptionsStore) =>
      <BuildOption extends BuildOptions>(option: BuildOption) => {
        return (
          select:
            | BuildOptionsStore[BuildOption]
            | ((
                prev: BuildOptionsStore[BuildOption],
              ) => BuildOptionsStore[BuildOption]),
        ) => state.setBuildOptions(option, select);
      },
  );

export const useSetProjectName = () =>
  useBuildOptionsStore(state => state.setProjectName);
