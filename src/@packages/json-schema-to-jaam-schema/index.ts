import { JaamSchema, JsonSchema } from "./types";

export default function jsonSchemaToJaamSchema(schema: JsonSchema): JaamSchema {
  return Object.entries(schema.properties).reduce(
    (schema, [propName, options]) => {
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
      })();

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
    } as JsonSchema,
  );
}
