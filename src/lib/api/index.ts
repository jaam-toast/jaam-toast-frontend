import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

import Config from "../config";

import {
  DeploymentDataResponse,
  DeploymentListResponse,
} from "types/deployment";
import {
  GetOrgsResponse,
  GetReposResponse,
  RepoDeployOptions,
} from "types/projectOption";
import { LoginResponse } from "types/auth";

const MainClient: AxiosInstance = axios.create({
  baseURL: Config.SERVER_URL_API,
});

MainClient.interceptors.request.use((req: AxiosRequestConfig) => {
  if (getCookie("loginData")) {
    req.headers = {
      Authorization: `Bearer ${
        JSON.parse(getCookie("loginData") as string).accessToken as string
      }`,
    };

    req.params = {
      githubAccessToken: JSON.parse(getCookie("loginData") as string)
        .githubAccessToken as string,
    };
  }

  return req;
});

MainClient.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err);
  },
);

export const login = async (code: string) => {
  const { data } = await MainClient.post<LoginResponse>("/login", { code });

  return data;
};

export const getOrgs = async (userId: string) => {
  const { data } = await MainClient.get<GetOrgsResponse>(
    `/users/${userId}/orgs`,
  );

  return data;
};

export const getUserRepos = async (userId: string) => {
  const { data } = await MainClient.get<GetReposResponse>(
    `/users/${userId}/repos`,
  );

  return data;
};

export const getOrgRepos = async (userId: string, org: string) => {
  const { data } = await MainClient.get<GetReposResponse>(
    `/users/${userId}/orgs/${org}/repos`,
  );

  return data;
};

export const deployRepo = async (userBuildOptions: RepoDeployOptions) => {
  const {
    userId,
    repoName,
    repoCloneUrl,
    repoUpdatedAt,
    subDomain,
    nodeVersion,
    installCommand,
    buildCommand,
    envList,
    buildType,
    lastCommitMessage,
  } = userBuildOptions;

  // * subdomain 추가
  const { data } = await MainClient.post<DeploymentDataResponse>(
    `/deploy/${userId}`,
    {
      repoName,
      repoCloneUrl,
      repoUpdatedAt,
      subDomain,
      nodeVersion,
      envList,
      installCommand,
      buildCommand,
      buildType,
      lastCommitMessage,
    },
  );

  return data;
};

export const getUserDeployments = async (userId: string) => {
  const { data } = await MainClient.get<DeploymentListResponse>(
    `/deploy/${userId}`,
  );

  return data;
};

export const deleteUserDeployment = async (
  userId: string,
  repoId: string,
  instanceId: string,
  repoName: string,
  repoOwner: string,
  webhookId: string,
) => {
  await MainClient.delete(`/deploy/${userId}/${repoId}`, {
    data: {
      instanceId,
      repoName,
      repoOwner,
      webhookId,
    },
  });
};
