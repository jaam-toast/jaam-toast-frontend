export const SCHEMA_PROPERTY_TYPES: string[] = [
  "text",
  "textarea",
  "email",
  "link",
  "date",
  "number",
  "boolean",
];

export type JsonSchema = {
  title: string;
  description?: string;
  type: "object";
  properties: Record<string, JsonSchemaProperties>;
  required?: string[];
};

export type JsonSchemaProperties = {
  type: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  description?: string;
  format?: string;
};

export type JaamSchema = {
  title: string;
  description?: string;
  type: "object";
  properties: Record<string, JaamSchemaProperties>;
  required?: string[];
};

export type JaamSchemaProperties = {
  type: SchemaPropertyType;
  min?: number;
  max?: number;
  description?: string;
  format?: string;
};

export type SchemaPropertyType = typeof SCHEMA_PROPERTY_TYPES[number];
