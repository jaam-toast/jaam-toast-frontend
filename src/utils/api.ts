import axios, { AxiosInstance } from "axios";
import Config from "src/config";
import { Project, Repo, Response, Space } from "types/api";

class APIClient {
  private accessToken: string = "";
  private githubAccessToken: string = "";
  private userId: string = "";

  private client = (): AxiosInstance => {
    const client = axios.create({
      baseURL: Config.SERVER_URL_API,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {},
      timeout: 2500,
    });

    client.interceptors.request.use(config => {
      config.params = {
        githubAccessToken: this.githubAccessToken,
        ...config.params,
      };
      return config;
    });

    return client;
  };

  setAccessToken(accessToken?: string): APIClient {
    this.accessToken = accessToken ?? "";
    return this;
  }

  setGithubAccessToken(githubAccessToken?: string): APIClient {
    this.githubAccessToken = githubAccessToken ?? "";
    return this;
  }

  setUserId(userId?: string): APIClient {
    this.userId = userId ?? "";
    return this;
  }

  async getUserRepos(): Promise<Repo[]> {
    const { data } = await this.client().get<Response<Repo[]>>(
      `/users/${this.userId}/repos`,
    );
    return data.result;
  }

  async getOrgs(): Promise<Space[]> {
    const { data } = await this.client().get<Response<Space[]>>(
      `/users/${this.userId}/orgs`,
    );
    return data.result;
  }

  async getOrgRepos(space: string): Promise<Repo[]> {
    const { data } = await this.client().get<Response<Repo[]>>(
      `/users/${this.userId}/orgs/${space}/repos`,
    );
    return data.result;
  }

  async getProjectList(): Promise<Project[]> {
    const { data } = await this.client().get<Response<Project[]>>(
      `users/${this.userId}/projects`,
    );
    return data.result;
  }
  async getProject(projectName: string): Promise<Project> {
    const { data } = await this.client().get<Response<Project>>(
      `/projects/${projectName}`,
    );
    return data.result;
  }
}

export default APIClient;
