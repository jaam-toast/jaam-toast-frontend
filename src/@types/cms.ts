import dayjs from "dayjs";

import type { JaamSchemaPropertyType, JsonSchema } from "@jaam-schema/src";

export type SortMode = "createdAt" | "updatedAt";

export type OrderMode = "ascending" | "descending";

/**
 * Schema
 */
export type SchemaData = {
  schemaName: string;
  schema: JsonSchema;
};

export const ASSET_SCHEMA: JsonSchema = {
  title: "assets",
  type: "object",
  properties: {
    url: {
      type: "string",
      format: "url",
    },
    path: {
      type: "string",
      description: "text",
    },
    size: {
      type: "number",
    },
  },
  required: [],
};

export const SCHEMA_DEFAULT_VALUE_FOR_TYPE: Record<
  JaamSchemaPropertyType,
  string | number | boolean
> = {
  text: "",
  textarea: "",
  email: "",
  link: "",
  date: dayjs().format("YYYY-MM-DD"),
  number: 0,
  boolean: false,
};

/**
 * Content
 */
export type ContentsData = {
  contents: Content[];
  totalCounts: number;
};

export type ContentType = string | number | boolean;

export type Content = {
  _id: string;
  [key: string]: ContentType;
  _createdAt: string;
  _updatedAt: string;
};

/**
 * Asset
 */
export type Asset = {
  _id: string;
  name: string;
  url: string;
  path: string;
  size: number;
} & Pick<Content, "_id" | "_createdAt" | "_updatedAt">;

export const WEBHOOK_EVENTS_RECORD = {
  DEPLOYMENT_UPDATED: "Deployment Updated",
  CONTENT_CREATED: "Content Created",
  CONTENT_UPDATED: "Content Updated",
  CONTENT_DELETED: "Content Deleted",
} as const;

export type WebhookEvent = keyof typeof WEBHOOK_EVENTS_RECORD;

/**
 * Webhook
 */
export type Webhook = {
  webhookId?: string;
  name: string;
  url: string;
  events: WebhookEvent[];
};

export type WebhookForEditing = {
  name: string;
  url: string;
  events: Set<string>;
};
