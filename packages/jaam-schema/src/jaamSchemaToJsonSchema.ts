import { JaamSchema, JsonSchema } from "./types";

export function jaamSchemaToJsonSchema(schema: JaamSchema): JsonSchema {
  return Object.entries(schema.properties).reduce(
    (schema: JsonSchema, [propName, options]) => {
      const { type } = options;
      const convertedType =
        type === "text" ||
        type === "textarea" ||
        type === "email" ||
        type === "link" ||
        type === "date"
          ? "string"
          : type;
      const format = (() => {
        if (type === "email" || type === "date") {
          return type;
        }

        if (type === "link") {
          return "url";
        }
      })();
      const min = type === "number" ? "minimum" : "minLength";
      const max = type === "number" ? "maximum" : "maxLength";

      const fieldOptions = {
        ...(typeof options.min === "number" && { [min]: options.min }),
        ...(typeof options.max === "number" && { [max]: options.max }),
      };

      return {
        ...schema,
        properties: {
          ...schema.properties,
          [propName]: {
            type: convertedType,
            ...fieldOptions,
            ...((type === "text" || type === "textarea") && {
              description: type,
            }),
            ...(format && { format }),
          },
        },
        required: options.required
          ? [...schema.required, propName]
          : schema.required,
      };
    },
    {
      title: schema.title,
      type: "object",
      properties: {},
      ...(schema.description && { description: schema.description }),
      required: [],
    },
  );
}
