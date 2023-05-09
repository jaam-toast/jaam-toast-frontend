import type { JsonSchema } from "@jaam-schema/src";
import type { BuildOptions, Env } from "./build";
import { WebhookEvent } from "./cms";

export type Response<T> = {
  message: string;
  result: T;
};

export type User = {
  githubAccessToken: string;
  projects: string[];
  userGithubUri: string;
  userImage?: string;
  userName: string;
  _id: string;
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
  space: Space;
  repoName: string;
  repoCloneUrl: string;
  projectUpdatedAt: string;
  githubAccessToken: string;
};

export type UpdateProjectOptions = {
  buildDomain: string;
  webhook: Webhook;
};

export type UpdateProjectOption<T extends keyof UpdateProjectOptions> = Pick<
  UpdateProjectOptions,
  T
>;

export type UpdateProjectBuildOptions = Omit<
  BuildOptions,
  "projectName" | "framework" | "nodeVersion"
>;

export type UpdateProjectBuildOption<
  T extends keyof UpdateProjectBuildOptions,
> = Pick<UpdateProjectBuildOptions, T>;

export type DeleteProjectOption<T extends keyof UpdateProjectOptions> = Pick<
  UpdateProjectOptions,
  T
>;

export enum ProjectStatus {
  Pending = "pending",
  Ready = "ready",
  Fail = "fail",
}

export type Project = {
  projectName: string;
  repoName: string;
  space: string;
  repoCloneUrl: string;
  projectUpdatedAt: string;
  status: `${ProjectStatus}`;

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
  webhookList?: Webhook;

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

export type Webhook = {
  [key in WebhookEvent]: { name: string; url: string }[];
};

export type CreateWebhookOptions = {
  name: string;
  url: string;
  events?: string[];
};
