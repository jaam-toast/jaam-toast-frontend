import { BuildOptions, Env } from "./build";

export type Response<T> = {
  message: string;
  result: T;
};

export type Space = {
  spaceName: string;
  spaceUrl: string;
  spaceImage: string;
};

export type Repo = {
  repoName: string;
  repoCloneUrl: string;
  repoUpdatedAt: string;
  space?: string;
};

export type CreateProjectOptions = BuildOptions & {
  userId: string;
  space: string;
  repoName: string;
  repoCloneUrl: string;
  projectUpdatedAt: string;
  githubAccessToken: string;
};

export type Project = {
  projectName: string;
  repoName: string;
  space: string;
  repoCloneUrl: string;
  projectUpdatedAt: string;
  nodeVersion: string;
  installCommand: string;
  buildCommand: string;
  envList: Env[];
  buildType: string;
  deployedUrl: string;
  buildingLog: string[];
  instanceId: string;
  lastCommitMessage: string;
  repoId: string;
  webhookId: string;
};

export type ProjectId = string;
