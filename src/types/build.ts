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

export enum NodeVersion {
  V14 = "14.21.0",
  V16 = "16.18.0",
}

export interface BuildOptions {
  projectName: string;
  nodeVersion: NodeVersion | null;
  installCommand: string;
  buildCommand: string;
  buildType: BuildType | null;
  envList: Env[];
}

export type BuildOptionsKeys = keyof BuildOptions;

export type BuildOptionsTypes = BuildOptions[BuildOptionsKeys];
