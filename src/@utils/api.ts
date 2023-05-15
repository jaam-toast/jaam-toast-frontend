import axios, { AxiosInstance } from "axios";

import Config from "../@config";

import type { Repo, Space, User } from "../@types/user";
import type {
  CreateProjectOptions,
  Response,
  AddProjectOptions,
  UpdateProjectBuildOptions,
  DeleteProjectOption,
  DeleteProjectOptions,
} from "../@types/api";
import type { Project, ProjectId } from "src/@types/project";
import type { SchemaData, Webhook } from "../@types/cms";

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
      // timeout: 2500,
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

  async getSpaces(): Promise<Space[]> {
    try {
      const { data } = await this.client().get<Response<Space[]>>(
        `/users/${this.userId}/spaces`,
      );

      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async getSpaceRepos(space: Space): Promise<Repo[]> {
    try {
      const { data } = await this.client().get<Response<Repo[]>>(
        `/users/${this.userId}/spaces/${space.installId}/repos`,
      );

      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async getUserData(userId: string): Promise<User> {
    try {
      const { data } = await this.client().get(`/users/${userId}`);

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

  async addProjectOption<Option extends Partial<AddProjectOptions>>({
    projectName,
    updateOption,
  }: {
    projectName: string;
    updateOption: Option;
    webhookId?: string;
  }): Promise<string> {
    try {
      console.log({ projectName });
      const { data } = await this.client().patch<Response<string>>(
        `/projects/${projectName}/options`,
        updateOption,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async updateProjectWebhookOption({
    projectName,
    updateOption,
  }: {
    projectName: string;
    updateOption: Webhook;
  }): Promise<string> {
    try {
      console.log({ updateOption });
      const { data } = await this.client().patch<Response<string>>(
        `/projects/${projectName}/options/${updateOption.webhookId}`,
        updateOption,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async updateProjectBuildOption({
    projectName,
    updateBuildOption,
  }: {
    projectName: string;
    updateBuildOption: Partial<UpdateProjectBuildOptions>;
  }): Promise<string> {
    try {
      const { data } = await this.client().post<Response<string>>(
        `/projects/${projectName}/options`,
        updateBuildOption,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(projectName: string): Promise<string> {
    try {
      const { data } = await this.client().delete<Response<string>>(
        `/projects/${projectName}`,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async deleteProjectOption<Option extends keyof DeleteProjectOptions>({
    projectName,
    deleteOption,
  }: {
    projectName: string;
    deleteOption: DeleteProjectOption<Option>;
  }): Promise<string> {
    try {
      const { data } = await this.client().delete<Response<string>>(
        `/projects/${projectName}/options`,
        {
          data: deleteOption,
        },
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
