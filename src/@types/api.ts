import type { Space } from "./user";
import type { BuildOptions } from "./build";
import type { Webhook } from "./cms";

export type Response<T> = {
  message: string;
  result: T;
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

export type DeleteProjectOptions = {
  buildDomain: string;
  webhook: Webhook[];
};

export type DeleteProjectOption<T extends keyof DeleteProjectOptions> = Pick<
  DeleteProjectOptions,
  T
>;

export type CreateWebhookOptions = {
  name: string;
  url: string;
  events?: string[];
};
