import { Dispatch, SetStateAction } from "react";

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
  version: string;
  versionText: string;
};

export type BuildType = {
  type: string;
};

export type Env = {
  key: string;
  value: string;
};

export interface EnvsState {
  envIndex: number;
  envsState: {
    envs: Env[];
    setEnvs: Dispatch<SetStateAction<Env[]>>;
  };
}

export interface BuildOptions {
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
  | "installCommandChange"
  | "buildCommandChange"
  | "addEnvClick"
  | "removeEnvClick"
  | "deployClick";

export type EventHandlerForSelect =
  | "spaceChange"
  | "repoChange"
  | "nodeVersionChange"
  | "buildTypeChange";
