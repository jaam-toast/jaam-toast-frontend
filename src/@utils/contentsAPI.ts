import axios, { AxiosInstance } from "axios";

import Config from "../@config";

import type { Response } from "../@types/api";
import type { Content, ContentsData } from "../@types/cms";
import type { JaamSchemaContent } from "@jaam-schema/src";

export class ContentsAPIClient {
  private token: string = "";

  private client = (): AxiosInstance => {
    const client = axios.create({
      baseURL: Config.SERVER_URL_API,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {},
      timeout: 2500,
    });

    return client;
  };

  setToken(token?: string): ContentsAPIClient {
    this.token = token ?? "";
    return this;
  }

  async getContentsList({
    schemaName,
    page = 1,
    pageLength = 20,
    sort = "createAt",
    order = "ascending",
  }: {
    schemaName: string;
    page?: number;
    pageLength?: number;
    sort?: string;
    order?: string;
  }): Promise<ContentsData> {
    try {
      const { data } = await this.client().get<Response<ContentsData>>(
        `/storage/${schemaName}/contents`,
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

  async getContent({
    schemaName,
    contentId,
  }: {
    schemaName: string;
    contentId?: string;
  }): Promise<Content> {
    try {
      const { data } = await this.client().get<Response<Content>>(
        `/storage/${schemaName}/contents/${contentId}`,
      );

      return data.result;
    } catch (error) {
      throw error;
    }
  }

  async createContent({
    schemaName,
    content,
  }: {
    schemaName: string;
    content: JaamSchemaContent;
  }): Promise<string> {
    try {
      const { data } = await this.client().post<Response<string>>(
        `/storage/${schemaName}/contents`,
        content,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async updateContent({
    schemaName,
    content,
    contentId,
  }: {
    schemaName: string;
    content: JaamSchemaContent;
    contentId: string;
  }): Promise<string> {
    try {
      const { data } = await this.client().put<Response<string>>(
        `/storage/${schemaName}/contents/${contentId}`,
        content,
      );

      return data.message;
    } catch (error) {
      throw error;
    }
  }

  async deleteContents({
    schemaName,
    contentIds,
  }: {
    schemaName: string;
    contentIds: string[];
  }): Promise<string> {
    try {
      const { data } = await this.client().delete<Response<string>>(
        `/storage/${schemaName}/contents`,
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
}
