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
  data: GitNamespace[];
};

export type Repo = {
  repoName: string;
  repoCloneUrl: string;
  repoUpdatedAt: string;
};

export type GetReposResponse = {
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
}

export interface RepoDeployOptions extends Repo, DeploymentOptions {
  userId: string;
}
