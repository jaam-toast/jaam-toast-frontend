export const JAAM_SCHEMA_PROPERTY_TYPES = [
  "text",
  "textarea",
  "email",
  "link",
  "date",
  "number",
  "boolean",
] as const;

export type JaamSchemaPropertyType = typeof JAAM_SCHEMA_PROPERTY_TYPES[number];

export type JaamSchema = {
  title: string;
  description?: string;
  type: "object";
  properties: Record<string, JaamSchemaProperties>;
};

export type JaamSchemaProperties = {
  type: JaamSchemaPropertyType;
  min?: number;
  max?: number;
  required?: boolean;
};

export type JaamSchemaContentProperty = string | number | boolean;

export type JaamSchemaContent = {
  [propertyName: string]: JaamSchemaContentProperty;
} & { _id?: string; _createdAt?: string; _updatedAt?: string };
