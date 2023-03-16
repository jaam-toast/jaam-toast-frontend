import { atom } from "recoil";

import { BuildOption } from "src/types";

const buildOptionState = atom<BuildOption>({
  key: "buildOption",
  default: {
    nodeVersion: "",
    installCommand: "",
    buildCommand: "",
    buildType: "",
    envs: [],
  },
});

export default buildOptionState;
