import { useAuth } from "../@shared";
import { Framework, Env, NodeVersion } from "../@types/build";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import APIClient from "../@utils/api";

type BuildOptionsStore = {
  projectName: string | null;
  isProjectNameAvailable: boolean;
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

type aa = <BuildOption extends BuildOptions>(
  option: BuildOption,
  select:
    | BuildOptionsStore[BuildOption]
    | ((
        prev: BuildOptionsStore[BuildOption],
      ) => BuildOptionsStore[BuildOption]),
) => void;
// TODO: renaming type.
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
  isProjectNameAvailable: true,
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
        isProjectNameAvailable: !project,
      });
    } catch (error) {
      set({
        isProjectNameAvailable: true,
      });
    }
  },
}));

export const useBuildOptions = () =>
  useBuildOptionsStore(
    (state: BuildOptionsStore) => ({
      projectName: state.projectName,
      isProjectNameAvailable: state.isProjectNameAvailable,
      nodeVersion: state.nodeVersion,
      framework: state.framework,
      buildCommand: state.buildCommand,
      installCommand: state.installCommand,
      envList: state.envList,
    }),
    shallow,
  );

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
