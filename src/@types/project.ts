import { SchemaData, Webhook } from "./cms";

export type Project = {
  _id: string;
  projectName: string;
  status: ProjectStatus;
  projectUpdatedAt: string;
  deploymentData: {};

  space: string;
  repoName: string;
  repoCloneUrl: string;
  framework: Framework;
  nodeVersion: string;
  installCommand: string;
  buildCommand: string;
  envList: Env[];

  storageKey: string;
  schemaList: SchemaData[];
  webhookList: Webhook[];
  jaamToastDomain?: string;
  originalBuildDomain?: string;
  customDomain: string[];
  cmsDomain?: string;
  assetStorageUrl?: string;
};

type Framework =
  | "CreateReactApp"
  | "ReactStatic"
  | "NextJs"
  | "NuxtJs"
  | "Angular"
  | "Astro"
  | "Gatsby"
  | "GitBook"
  | "Jekyll"
  | "Remix"
  | "Svelte"
  | "Vue"
  | "VuePress";

export type Env = {
  key: string;
  value: string;
};

export enum ProjectStatus {
  Pending = "pending",
  Ready = "ready",
  Fail = "fail",
}

export type ProjectId = string;
