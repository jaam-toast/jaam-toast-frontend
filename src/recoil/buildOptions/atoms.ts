import { atom } from "recoil";

import { BuildOptions } from "types/projectOption";

const buildOptionsState = atom<BuildOptions>({
  key: "buildOption",
  default: {
    subDomain: "",
    nodeVersion: "",
    installCommand: "npm install",
    buildCommand: "npm run build",
    buildType: "",
    envList: [],
  },
});

const buildStepState = atom<number>({
  key: "buidStepState",
  default: 1,
});

export { buildOptionsState, buildStepState };
