import type { BuildOptions } from "./build";
import type { Webhook } from "./cms";

export type Response<Result> = {
  message: string;
  result: Result;
};

export type CreateProjectOptions = BuildOptions & {
  space: string;
  repoName: string;
  repoCloneUrl: string;
};

export type AddProjectOptions = {
  customDomain: string;
  webhook: Webhook;
};

export type UpdateProjectBuildOptions = Omit<
  BuildOptions,
  "projectName" | "framework" | "nodeVersion"
>;

// TODO
export type UpdateProjectBuildOption<
  Option extends keyof UpdateProjectBuildOptions,
> = Pick<UpdateProjectBuildOptions, Option>;

export type DeleteProjectOptions = {
  customDomain: string;
  webhook: Webhook[];
};

export type DeleteProjectOption<Option extends keyof DeleteProjectOptions> =
  Pick<DeleteProjectOptions, Option>;

export type CreateWebhookOptions = {
  name: string;
  url: string;
  events?: string[];
};
