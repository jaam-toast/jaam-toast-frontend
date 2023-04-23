import axios, { AxiosInstance } from "axios";
import Config from "../@config";
import {
  CreateProjectOptions,
  Project,
  ProjectId,
  Repo,
  Response,
  Space,
  SchemaList,
} from "../@types/api";

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

  async createProject(
    createProjectOptions: CreateProjectOptions,
  ): Promise<ProjectId> {
    try {
      const { data } = await this.client().post<Response<ProjectId>>(
        "/projects",
        createProjectOptions,
      );
      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async getUserRepos(): Promise<Repo[]> {
    try {
      const { data } = await this.client().get<Response<Repo[]>>(
        `/users/${this.userId}/repos`,
      );
      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async getOrgs(): Promise<Space[]> {
    try {
      const { data } = await this.client().get<Response<Space[]>>(
        `/users/${this.userId}/orgs`,
      );
      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async getOrgRepos(space: string): Promise<Repo[]> {
    try {
      const { data } = await this.client().get<Response<Repo[]>>(
        `/users/${this.userId}/orgs/${space}/repos`,
      );
      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async getProjectList(): Promise<Project[]> {
    try {
      const { data } = await this.client().get<Response<Project[]>>(
        `users/${this.userId}/projects`,
      );
      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async getProject(projectName: string): Promise<Project> {
    try {
      const { data } = await this.client().get<Response<Project>>(
        `/projects/${projectName}`,
      );

      return data.result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * schema
   */
  async getSchema({
    projectName,
  }: {
    projectName: string;
  }): Promise<SchemaList[]> {
    try {
      const { data } = await this.client().get(
        `/projects/${projectName}/schemas`,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async createSchema({
    projectName,
    options,
  }: {
    projectName: string;
    options: SchemaList;
  }): Promise<string> {
    try {
      const { data } = await this.client().post(
        `/projects/${projectName}/schemas`,
        options,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async updateSchema({
    projectName,
    schemaName,
    options,
  }: {
    projectName: string;
    schemaName: string;
    options: SchemaList;
  }): Promise<string> {
    try {
      const { data } = await this.client().post(
        `/projects/${projectName}/schemas/${schemaName}`,
        options,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async deleteSchema({
    projectName,
    schemaName,
  }: {
    projectName: string;
    schemaName: string;
  }): Promise<string> {
    try {
      const { data } = await this.client().delete(
        `/projects/${projectName}/schemas/${schemaName}`,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }
}

export default APIClient;
