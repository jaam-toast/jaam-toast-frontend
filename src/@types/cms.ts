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
