export const JSON_SCHEMA_PROPERTY_TYPES = [
  "string",
  "number",
  "boolean",
] as const;

export type JSONSchemaPropertyType = typeof JSON_SCHEMA_PROPERTY_TYPES[number];

export type JsonSchema = {
  title: string;
  description?: string;
  type: "object";
  properties: Record<string, JsonSchemaProperties>;
  required?: string[];
};

export type JsonSchemaProperties = {
  type: JSONSchemaPropertyType;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  description?: string;
  format?: string;
};

export type JsonSchemaContentProperty = string | number | boolean;

export type JsonSchemaContent = {
  [propertyName in string]: JsonSchemaContentProperty;
};
