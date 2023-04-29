import type { JsonSchema } from "../@packages/jaam-schema/src";
import type { BuildOptions, Env } from "./build";

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

  framework: string;
  nodeVersion: string;
  installCommand: string;
  buildCommand: string;
  envList: Env[];
  buildType: string;

  // TODO 배열로 변경
  buildDomain: string;
  buildOriginalDomain: string;
  cmsDomain: string;
  storageKey: string;

  schemaList: SchemaList[];
  contentList: string[];
  assetStorageUrl: string;

  repoId: string;
  webhookId: string;
  lastCommitMessage: string;
};

export type ProjectId = string;

export type SchemaList = {
  schemaName: string;
  schema: JsonSchema;
};

export type ContentType = string | number | boolean;

export type Content = {
  _id: string;
  [key: string]: ContentType;
  _createdAt: string;
  _updatedAt: string;
};
