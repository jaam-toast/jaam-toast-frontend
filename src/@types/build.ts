// TODO: add build type options
export enum Framework {
  CreateReactApp = "Create React App",
  ReactStatic = "React Static",
  NextJs = "Next.js (Static HTML Export)",
  NuxtJs = "Nuxt.js",
  Angular = "Angular (Angular CLI)",
  Astro = "Astro",
  Gatsby = "Gatsby",
  GitBook = "GitBook",
  Jekyll = "Jekyll",
  Remix = "Remix",
  Svelte = "Svelte",
  Vue = "Vue",
  VuePress = "VuePress",
}

export type Env = {
  key: string;
  value: string;
};

export const NODE_VERSION = [
  "17.9.1",
  "16.20.0",
  "15.14.0",
  "14.21.3",
  "13.14.0",
  "12.18.0",
];

export type NodeVersion = typeof NODE_VERSION[number];

export interface BuildOptions {
  projectName: string;
  nodeVersion: NodeVersion | null;
  installCommand: string;
  buildCommand: string;
  framework: Framework | null;
  envList: Env[];
}

export type BuildOptionsKeys = keyof BuildOptions;

export type BuildOptionsTypes = BuildOptions[BuildOptionsKeys];
