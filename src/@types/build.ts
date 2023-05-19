import { Env } from "./project";

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

export const FRAMEWORK = [
  "Create React App",
  "React Static",
  "Next.js (Static HTML Export)",
  "Nuxt.js",
  "Angular (Angular CLI)",
  "Gatsby",
  "GitBook",
  "Jekyll",
  "Remix",
  "Svelte",
  "Vue",
  "VuePress",
];

export type Framework = typeof FRAMEWORK[number];

export const FRAMEWORK_DOMAIN: Record<Framework, string> = {
  "Create React App": "ko.reactjs.org",
  "React Static": "ko.reactjs.org",
  "Next.js (Static HTML Export)": "nextjs.org",
  "Nuxt.js": "nuxtjs.org",
  "Angular (Angular CLI)": "angular.io",
  Gatsby: "www.gatsbyjs.com",
  GitBook: "www.gitbook.com",
  Jekyll: "jekyllrb-ko.github.io",
  Remix: "remix.run",
  Svelte: "svelte.dev",
  Vue: "vuejs.org",
  VuePress: "vuejs.org",
};
