// TODO: add build type options
export enum BuildType {
  CreateReactApp = "Create React App",
  NextJs = "Next.js",
  // Vite = "Vite",
  // Angular = "Angular",
  // Svelte = "Svelte",
  // SvelteKit = "Sevelte Kit",
  // VueJS = "Vue.js",
  // NuxtJs = "Nuxt.js",
  // Remix = "Remix",
  // Unknown = "unknown",
}

export type Env = {
  key: string;
  value: string;
};

export enum NodeVersion {
  V14 = "14.x",
  V16 = "16.x",
}

export interface BuildOptions {
  projectName: string;
  nodeVersion?: NodeVersion;
  installCommand: string;
  buildCommand: string;
  buildType?: BuildType;
  envList: Env[];
}

export type BuildOptionsKeys = keyof BuildOptions;

export type BuildOptionsTypes = BuildOptions[BuildOptionsKeys];
