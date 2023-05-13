import { SchemaData, Webhook } from "./cms";

export type Project = {
  projectName: string;
  repoName: string;
  space: string;
  repoCloneUrl: string;
  projectUpdatedAt: string;
  status: ProjectStatus;

  framework: string;
  nodeVersion: string;
  installCommand: string;
  buildCommand: string;
  envList: Env[];
  buildType: string;

  buildDomain: string[];
  originalBuildDomain: string;
  cmsDomain: string;
  storageKey: string;

  schemaList: SchemaData[];
  assetStorageUrl: string;
  webhookList?: Webhook[];
  // TODO deploymentData 추가

  repoId: string;
  webhookId: string;
  lastCommitMessage: string;
};

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
