import type {
  JaamSchema,
  JsonSchema,
  JaamSchemaPropertyType,
  JsonSchemaProperties,
} from "./types";

export function jsonSchemaToJaamSchema(jsonSchema: JsonSchema): JaamSchema {
  return Object.entries(jsonSchema.properties).reduce(
    (
      schema: JaamSchema,
      [propName, options]: [string, JsonSchemaProperties],
    ) => {
      const {
        type,
        description,
        format,
        minLength,
        maxLength,
        minimum,
        maximum,
      } = options;
      const convertedType: JaamSchemaPropertyType = (() => {
        if (type === "string" && description) {
          return description as "text" | "textarea";
        }

        if (type === "string") {
          if (format === "url") {
            return "link";
          }

          return format as "email";
        }

        return type;
      })();
      const min = (() => {
        if (typeof minLength === "number") {
          return minLength;
        }
        if (typeof minimum === "number") {
          return minimum;
        }
      })();
      const max = (() => {
        if (typeof maxLength === "number") {
          return maxLength;
        }
        if (typeof maximum === "number") {
          return maximum;
        }
      })();
      const required =
        jsonSchema.required && jsonSchema.required.includes(propName);

      return {
        ...schema,
        properties: {
          ...schema.properties,
          [propName]: {
            type: convertedType,
            ...(typeof min === "number" && { min }),
            ...(typeof max === "number" && { max }),
            ...(required && { required }),
          },
        },
      };
    },
    {
      title: jsonSchema.title,
      type: "object",
      properties: {},
      ...(jsonSchema.description && { description: jsonSchema.description }),
    },
  );
}
