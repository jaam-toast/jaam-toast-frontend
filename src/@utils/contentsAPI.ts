import axios, { AxiosInstance } from "axios";

import Config from "../@config";

import type { Content as ContentData } from "../@types/cms";
import type { Content, Response } from "../@types/api";

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
    sort,
    order,
  }: {
    schemaName: string;
    page?: number;
    sort?: string;
    order?: string;
  }): Promise<Content[]> {
    try {
      const { data } = await this.client().get<Response<Content[]>>(
        `/storage/${schemaName}/contents`,
        {
          params: {
            page,
            sort,
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
    content: ContentData;
  }): Promise<string> {
    try {
      const { data } = await this.client().post<Response<string>>(
        `/storage/${schemaName}/contents`,
        content,
      );

      return data.result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateContent({
    schemaName,
    content,
  }: {
    schemaName: string;
    content: ContentData;
  }): Promise<string> {
    try {
      const { data } = await this.client().put<Response<string>>(
        `/storage/${schemaName}`,
        content,
      );

      return data.result;
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
      const { data } = await this.client().get<Response<string>>(
        `/storage/${schemaName}`,
        {
          params: {
            contents_id: contentIds,
          },
        },
      );

      return data.result;
    } catch (error) {
      throw error;
    }
  }
}
