import type { JsonSchema } from "@jaam-schema/src";
import type { BuildOptions, Env } from "./build";
import { Webhook, WebhookEvent } from "./cms";

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

export type PatchProjectOption = Partial<{
  buildDomain: string;
  webhook: WebhookData;
}>;

export type PutProjectOption = Partial<PutProjectOptions>;

export type PutProjectOptions = Omit<
  BuildOptions,
  "projectName" | "framework" | "nodeVersion"
> & {
  buildDomain: string[];
  webhook: WebhookData;
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

  buildDomain: string[];
  originalBuildDomain: string;
  cmsDomain: string;
  storageKey: string;

  schemaList: SchemaData[];
  assetStorageUrl: string;
  webhookList?: WebhookData;

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

export type WebhookData = {
  [key in WebhookEvent]: Omit<Webhook, "events">[];
};

export type CreateWebhookOptions = {
  name: string;
  url: string;
  events?: string[];
};
