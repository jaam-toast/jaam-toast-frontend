import { Framework, Env, NodeVersion } from "../@types/build";
import { create } from "zustand";
import { shallow } from "zustand/shallow";

type BuildOptionsStore = {
  nodeVersion: NodeVersion | null;
  envList: Env[];
  buildType: Framework | null;
  buildCommand: string;
  installCommand: string;

  setBuildOptions: (
    option: BuildOptions,
    select: BuildOptionsType | ((prev: BuildOptionsType) => BuildOptionsType),
  ) => void;
};

// TODO: renaming type.
type BuildOptions = keyof Pick<
  BuildOptionsStore,
  "nodeVersion" | "envList" | "buildType" | "buildCommand" | "installCommand"
>;
type BuildOptionsType = BuildOptionsStore[BuildOptions];

const useBuildOptionsStore = create<BuildOptionsStore>()((set, get) => ({
  nodeVersion: Object.values(NodeVersion).pop()!,
  buildType: null,
  buildCommand: "npm start",
  installCommand: "npm install",
  envList: [],

  setBuildOptions: (
    option: BuildOptions,
    select: BuildOptionsType | ((prev: BuildOptionsType) => BuildOptionsType),
  ) => {
    if (typeof select === "function") {
      const prev = get()[option];
      const result = select(prev);
      set({ [option]: result });
    } else {
      set({ [option]: select });
    }
  },
}));

export const useBuildOptions = () =>
  useBuildOptionsStore(
    (state: BuildOptionsStore) => ({
      nodeVersion: state.nodeVersion,
      buildType: state.buildType,
      buildCommand: state.buildCommand,
      installCommand: state.installCommand,
      envList: state.envList,
    }),
    shallow,
  );

export const useSetBuildOptions = () => (option: BuildOptions) =>
  useBuildOptionsStore((state: BuildOptionsStore) =>
    state.setBuildOptions.bind(null, option),
  );
