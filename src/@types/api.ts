import type { JsonSchema } from "@jaam-schema/src";
import type { BuildOptions, Env } from "./build";

export type Response<T> = {
  message: string;
  result: T;
};

export type Space = {
  installId: number;
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

export type UpdateProjectOptions = Partial<
  Omit<BuildOptions, "projectName" | "framework" | "nodeVersion"> & {
    domain: string;
  }
>;

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

  buildDomain: string[];
  originalBuildDomain: string;
  cmsDomain: string;
  storageKey: string;

  schemaList: SchemaData[];
  assetStorageUrl: string;

  repoId: string;
  webhookId: string;
  lastCommitMessage: string;
};

export type ProjectId = string;

export type SchemaData = {
  schemaName: string;
  schema: JsonSchema;
};

export type ContentType = string | number | boolean;

export type ContentsData = {
  contents: Content[];
  totalCounts: number;
};

export type Content = {
  _id: string;
  [key: string]: ContentType;
  _createdAt: string;
  _updatedAt: string;
};
