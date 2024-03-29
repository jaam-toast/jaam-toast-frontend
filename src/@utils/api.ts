import axios from "axios";
import Cookies from "js-cookie";

import Config from "../@config";

import type { Repo, Space, User } from "../@types/user";
import type { BuildOptions } from "../@types/build";
import type { Project, ProjectId } from "../@types/project";
import type { SchemaData, Webhook } from "../@types/cms";

type Response<Result> = {
  message: string;
  result: Result;
};

export type CreateProjectOptions = BuildOptions & {
  space: string;
  repoName: string;
  repoCloneUrl: string;
};

export type AddProjectOptions = {
  customDomain: string;
  webhook: Webhook;
};

export type UpdateProjectBuildOptions = Omit<
  BuildOptions,
  "projectName" | "framework" | "nodeVersion"
>;

export type DeleteProjectOptions = {
  customDomain: string;
  webhook: Webhook[];
};

const client = axios.create({
  withCredentials: true,
  baseURL: Config.SERVER_URL_API,
  params: {},
  timeout: 2500,
});

export async function logout(): Promise<string> {
  try {
    const { data } = await client.get<Response<string>>(`/logout`);

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function getSpaces(): Promise<Space[]> {
  try {
    const { data } = await client.get<Response<Space[]>>(`/user/spaces`);

    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function getSpaceRepos(space: Space): Promise<Repo[]> {
  try {
    const { data } = await client.get<Response<Repo[]>>(
      `/user/spaces/${space.installId}/repos`,
    );

    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function getUserData(): Promise<User> {
  try {
    const { data } = await client.get<Response<User>>(`/user`);

    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function getProjectList(): Promise<string[]> {
  try {
    const { data } = await client.get<Response<string[]>>(`users/projects`);

    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function getProject(projectName: string): Promise<Project> {
  try {
    const { data } = await client.get<Response<Project>>(
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
export async function createProject(
  createProjectOptions: CreateProjectOptions,
): Promise<ProjectId> {
  try {
    const { data } = await client.post<Response<ProjectId>>(
      "/projects",
      createProjectOptions,
    );

    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function addProjectOption<
  Option extends Partial<AddProjectOptions>,
>({
  projectName,
  updateOption,
}: {
  projectName: string;
  updateOption: Option;
  webhookId?: string;
}): Promise<string> {
  try {
    const { data } = await client.patch<Response<string>>(
      `/projects/${projectName}/options`,
      updateOption,
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function updateProjectWebhookOption({
  projectName,
  updateOption,
}: {
  projectName: string;
  updateOption: Webhook;
}): Promise<string> {
  try {
    const { data } = await client.patch<Response<string>>(
      `/projects/${projectName}/options/${updateOption.webhookId}`,
      updateOption,
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function updateProjectBuildOption({
  projectName,
  updateBuildOption,
}: {
  projectName: string;
  updateBuildOption: Partial<UpdateProjectBuildOptions>;
}): Promise<string> {
  try {
    const { data } = await client.post<Response<string>>(
      `/projects/${projectName}/options`,
      updateBuildOption,
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function deleteProject(projectName: string): Promise<string> {
  try {
    const { data } = await client.delete<Response<string>>(
      `/projects/${projectName}`,
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function deleteProjectOption({
  projectName,
  deleteOption,
}: {
  projectName: string;
  deleteOption: Partial<DeleteProjectOptions>;
}): Promise<string> {
  try {
    const { data } = await client.delete<Response<string>>(
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
export async function getSchema({
  projectName,
}: {
  projectName: string;
}): Promise<SchemaData[]> {
  try {
    const { data } = await client.get<Response<SchemaData[]>>(
      `/projects/${projectName}/schemas`,
    );

    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function createSchema({
  projectName,
  options,
}: {
  projectName: string;
  options: SchemaData;
}): Promise<string> {
  try {
    const { data } = await client.post<Response<string>>(
      `/projects/${projectName}/schemas`,
      options,
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function updateSchema({
  projectName,
  schemaName,
  options,
}: {
  projectName: string;
  schemaName: string;
  options: SchemaData;
}): Promise<string> {
  try {
    const { data } = await client.put<Response<string>>(
      `/projects/${projectName}/schemas/${schemaName}`,
      options,
    );

    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function deleteSchema({
  projectName,
  schemaNames,
}: {
  projectName: string;
  schemaNames: string[];
}): Promise<string> {
  try {
    const { data } = await client.delete<Response<string>>(
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
