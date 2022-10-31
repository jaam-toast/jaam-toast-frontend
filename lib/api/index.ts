import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

import Config from "../config";

import { GetOrgsResponse, GetReposResponse, LoginResponse } from "../../types";

const MainClient: AxiosInstance = axios.create({
  baseURL: Config.SERVER_URL,
  timeout: 2500,
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
    if (err.response.status === 401) window.location.href = "/login";

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

export const deployRepo = async (userId: string, cloneUrl: string) => {
  const { data } = await MainClient.post<GetReposResponse>(`/users/${userId}`, {
    cloneUrl,
  });

  return data;
};
