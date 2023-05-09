import dayjs from "dayjs";

import type { JaamSchemaPropertyType } from "@jaam-schema/src";

export const ASSET_SCHEMA = {
  title: "assets",
  type: "object",
  properties: {
    url: {
      type: "string",
      format: "url",
    },
    name: {
      type: "string",
    },
    size: {
      type: "number",
    },
  },
};

export const DEFAULT_VALUE_FOR_TYPE: Record<
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

export type SortMode = "createdAt" | "updatedAt";

export type OrderMode = "ascending" | "descending";

export type AssetInfoForEditing = {
  url?: string;
  name?: string;
  size?: number;
};

export type WebhookEvent =
  | "DEPLOYMENT_UPDATED"
  | "CONTENT_CREATED"
  | "CONTENT_UPDATED"
  | "CONTENT_DELETED";

export const WEBHOOK_EVENTS_RECORD: Record<WebhookEvent, string> = {
  DEPLOYMENT_UPDATED: "Deployment Updated",
  CONTENT_CREATED: "Content Created",
  CONTENT_UPDATED: "Content Updated",
  CONTENT_DELETED: "Content Deleted",
};

export type WebhookForEditing = {
  name: string;
  url: string;
  events: Set<string>;
};
