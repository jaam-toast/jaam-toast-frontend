import dayjs from "dayjs";

import type { JaamSchemaPropertyType } from "@jaam-schema/src";

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
  | "UPDATE_BUILD"
  | "CREATE_CONTENT"
  | "UPDATE_CONTENT"
  | "DELETE_CONTENT";

export const WEBHOOK_EVENTS_RECORD: Record<WebhookEvent, string> = {
  UPDATE_BUILD: "Update Build",
  CREATE_CONTENT: "Create Content",
  UPDATE_CONTENT: "Update Content",
  DELETE_CONTENT: "Delete content",
};

export type Webhook = {
  name: string;
  url: string;
  events?: string[];
};

export type WebhookForEditing = Omit<Webhook, "events"> & {
  events: Set<string>;
};
