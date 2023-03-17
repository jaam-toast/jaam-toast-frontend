import { atom } from "recoil";

import { BuildOptions } from "../../../types/projectOption";

const buildOptionsState = atom<BuildOptions>({
  key: "buildOption",
  default: {
    nodeVersion: "",
    installCommand: "npm install",
    buildCommand: "npm run build",
    buildType: "",
    envList: [],
  },
});

export default buildOptionsState;
