export type Properties = {
  type: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  min?: number;
  max?: number;
  description?: string;
  format?: string;
};

export type Schema = {
  title: string;
  description?: string;
  type?: "object";
  properties: {
    [propertyName in string]: Properties;
  };
  required?: string[];
};

export const SCHEMA_FIELD_TYPE: string[] = [
  "text",
  "textarea",
  "email",
  "link",
  "date",
  "number",
  "boolean",
];

export type SchemaFieldType = typeof SCHEMA_FIELD_TYPE[number];
