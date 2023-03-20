export type GitNamespace = {
  [index: string]: string | undefined;
  spaceName: string;
  spaceUrl: string;
  spaceImage?: string;
};

export type GetOrgsResponse = {
  result: string;
  data: GitNamespace[];
};

export type Repo = {
  [index: string]: string | undefined | Env[] | string[];
  repoName: string;
  repoCloneUrl: string;
  repoUpdatedAt: string;
  repoOwner?: string;
};

export type GetReposResponse = {
  result: string;
  data: Repo[];
};

export type NodeVersion = {
  [index: string]: string | undefined;
  version: string;
  versionText: string;
};

export type BuildType = {
  [index: string]: string | undefined;
  type: string;
};

export type Env = {
  key: string;
  value: string;
};

export interface EnvsState {
  envIndex: number;
  envsList: Env[];
}

export interface BuildOptions {
  subDomain: string;
  nodeVersion: string;
  installCommand?: string;
  buildCommand?: string;
  buildType?: string;
  envList: Env[];
}

export interface DeploymentOptions extends BuildOptions {
  lastCommitMessage: string;
  repoId?: string;
  webhookId?: string;
}

export interface RepoDeployOptions extends Repo, DeploymentOptions {
  userId: string;
}

export type EventHandlerName =
  | EventHandlerForSelect
  | "projectNameChange"
  | "installCommandChange"
  | "buildCommandChange"
  | "addEnvClick"
  | "removeEnvClick";

export type EventHandlerForSelect =
  | "spaceChange"
  | "nodeVersionChange"
  | "buildTypeChange";
