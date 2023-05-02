import axios, { AxiosInstance } from "axios";

import Config from "../@config";
import {
  CreateProjectOptions,
  UpdateProjectOptions,
  Project,
  ProjectId,
  Repo,
  Response,
  Space,
  SchemaData,
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

  async getProjectList(): Promise<string[]> {
    try {
      const { data } = await this.client().get<Response<string[]>>(
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
   * project
   */
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

  async updateProject(
    updateProjectOptions: UpdateProjectOptions,
  ): Promise<string> {
    try {
      const { data } = await this.client().put<Response<string>>(
        "/projects",
        updateProjectOptions,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject({
    projectName,
  }: {
    projectName: string;
  }): Promise<string> {
    try {
      const { data } = await this.client().delete<Response<string>>(
        `/projects/${projectName}`,
      );

      return data.message;
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
  }): Promise<SchemaData[]> {
    try {
      const { data } = await this.client().get<Response<SchemaData[]>>(
        `/projects/${projectName}/schemas`,
      );

      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async createSchema({
    projectName,
    options,
  }: {
    projectName: string;
    options: SchemaData;
  }): Promise<string> {
    try {
      const { data } = await this.client().post<Response<string>>(
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
    options: SchemaData;
  }): Promise<string> {
    try {
      const { data } = await this.client().put<Response<string>>(
        `/projects/${projectName}/schemas/${schemaName}`,
        options,
      );

      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async deleteSchema({
    projectName,
    schemaNames,
  }: {
    projectName: string;
    schemaNames: string[];
  }): Promise<string> {
    try {
      const { data } = await this.client().delete<Response<string>>(
        `/projects/${projectName}/schemas`,
        {
          params: {
            schemaName: schemaNames,
          },
        },
      );

      return data.result;
    } catch (error) {
      throw error;
    }
  }
}

export default APIClient;
