import type { JaamSchema, JsonSchema, JaamSchemaPropertyType } from "./types";

export function jsonSchemaToJaamSchema(schema: JsonSchema): JaamSchema {
  return Object.entries(schema.properties).reduce(
    (schema: JaamSchema, [propName, options]) => {
      const { type, description, format } = options;
      const formattedType = (() => {
        if (type === "string" && description) {
          return description;
        }

        if (type === "string" && format) {
          if (format === "url") {
            return "link";
          }

          return format;
        }

        return type;
      })() as JaamSchemaPropertyType;

      schema.properties[propName] = {
        ...options,
        type: formattedType,
      };

      return schema;
    },
    {
      title: schema.title,
      type: "object",
      properties: {},
      ...(schema.description && { description: schema.description }),
      ...(schema.required?.length && { required: schema.required }),
    },
  );
}
