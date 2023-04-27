import { SchemaPropertyType } from "../@packages/json-schema-to-jaam-schema/types";

export type PropertyOptionsForEditing = {
  min?: number;
  max?: number;
  required?: boolean;
};

export type PropertiesForEditing = {
  name: string;
  type: SchemaPropertyType;
  options: PropertyOptionsForEditing;
};

export type ContentType = string | number | boolean;

export type Contents = {
  [propertyName in string]: ContentType;
};

export type SortMode = "createdAt" | "updatedAt";

export type OrderMode = "ascending" | "descending";
