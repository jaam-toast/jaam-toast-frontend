import { JaamSchema, JsonSchema } from "./types";

export function jaamSchemaToJsonSchema(schema: JaamSchema): JsonSchema {
  return Object.entries(schema.properties).reduce(
    (schema: JsonSchema, [propName, options]) => {
      const { type } = options;
      const formattedType =
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

        return null;
      })();
      const min = type === "number" ? "minimum" : "minLength";
      const max = type === "number" ? "maximum" : "maxLength";

      const fieldOptions = {
        ...(options.min !== undefined && { [min]: options.min }),
        ...(options.max !== undefined && { [max]: options.max }),
      };

      schema.properties[propName] = {
        type: formattedType,
        ...fieldOptions,
        ...((type === "text" || type === "textarea") && { description: type }),
        ...(format && { format }),
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
