import { Dispatch, SetStateAction } from "react";

export type UserLoginData = {
  _id: string;
  username: string;
  userGithubUri: string;
  userImage?: string;
};

export type LoginData = {
  data: UserLoginData;
  githubAccessToken: string;
  accessToken: string;
};

export type LoginResponse = {
  result: string;
  data: UserLoginData;
  githubAccessToken: string;
  accessToken: string;
};

export type GitNamespace = {
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

export interface DeploymentOptions {
  nodeVersion: string;
  installCommand?: string;
  buildCommand?: string;
  envList?: Env[];
  buildType?: string;
  lastCommitMessage: string;
  repoId?: string;
  webhookId?: string;
}

export interface RepoDeployOptions extends Repo, DeploymentOptions {
  userId: string;
}

export interface UserDeploymentData extends RepoDeployOptions {
  instanceId: string;
  deployedUrl?: string;
  recordId?: string;
  buildingLog?: (string | undefined)[] | undefined;
  repoId?: string;
}

export interface DeploymentDataResponse {
  result: string;
  data: UserDeploymentData;
}

export interface DeploymentListResponse {
  result: string;
  data: UserDeploymentData[];
}
