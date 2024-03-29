import axios, { AxiosInstance } from "axios";

import Config from "../@config";

import type { Content, ContentsData } from "../@types/cms";
import type { JaamSchemaContent } from "@jaam-schema/src";

type Response<Result> = {
  message: string;
  result: Result;
};

const getClient = (token: string): AxiosInstance =>
  axios.create({
    baseURL: `${Config.SERVER_URL_API}/storage`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {},
    timeout: 2500,
  });

export async function getContentsList({
  token,
  schemaName,
  page = 1,
  pageLength = 20,
  sort = "createAt",
  order = "ascending",
}: {
  token: string;
  schemaName: string;
  page?: number;
  pageLength?: number;
  sort?: string;
  order?: string;
}): Promise<ContentsData> {
  try {
    const { data } = await getClient(token).get<Response<ContentsData>>(
      `/${schemaName}/contents`,
      {
        params: {
          page,
          pageLength,
          sort: sort === "createAt" ? "_createdAt" : "_updatedAt",
          order,
        },
      },
    );

    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function getContent({
  token,
  schemaName,
  contentId,
}: {
  token: string;
  schemaName: string;
  contentId?: string;
}): Promise<Content> {
  try {
    const { data } = await getClient(token).get<Response<Content>>(
      `/${schemaName}/contents/${contentId}`,
    );

    return data.result;
  } catch (error) {
    throw error;
  }
}

export async function createContent({
  token,
  schemaName,
  content,
}: {
  token: string;
  schemaName: string;
  content: JaamSchemaContent;
}): Promise<string> {
  try {
    const { data } = await getClient(token).post<Response<string>>(
      `/${schemaName}/contents`,
      content,
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function updateContent({
  token,
  schemaName,
  content,
  contentId,
}: {
  token: string;
  schemaName: string;
  content: JaamSchemaContent;
  contentId: string;
}): Promise<string> {
  try {
    const { data } = await getClient(token).put<Response<string>>(
      `/${schemaName}/contents/${contentId}`,
      content,
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function deleteContents({
  token,
  schemaName,
  contentIds,
}: {
  token: string;
  schemaName: string;
  contentIds: string[];
}): Promise<string> {
  try {
    const { data } = await getClient(token).delete<Response<string>>(
      `/${schemaName}/contents`,
      {
        params: {
          contentId: contentIds,
        },
      },
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function addAssets({
  token,
  assets,
}: {
  token: string;
  assets: FormData;
}): Promise<string> {
  try {
    const { data } = await getClient(token).post<Response<string>>(
      `/assets/contents`,
      assets,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}

export async function deleteAsset({
  token,
  contentId,
  assetPath,
}: {
  token: string;
  contentId: string;
  assetPath: string;
}): Promise<string> {
  try {
    const { data } = await getClient(token).delete<Response<string>>(
      `/assets/contents/${contentId}`,
      {
        data: {
          assetPath,
        },
      },
    );

    return data.message;
  } catch (error) {
    throw error;
  }
}
