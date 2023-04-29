import { jaamSchemaToJsonSchema } from "./jaamSchemaToJsonSchema";

import type { JaamSchema } from "./types";

test("test", () => {
  const schema: JaamSchema = {
    title: "post",
    type: "object",
    properties: {
      picture: { type: "text" },
      title: { type: "textarea" },
      email: { type: "email" },
      link: { type: "link" },
      date: { type: "date", required: true },
      boolean: { type: "boolean", required: true },
    },
  };

  const convertedSchema = jaamSchemaToJsonSchema(schema);

  const jsonSchema = {
    title: "post",
    type: "object",
    properties: {
      picture: {
        type: "string",
        description: "text",
      },
      title: {
        type: "string",
        description: "textarea",
      },
      email: {
        type: "string",
        format: "email",
      },
      link: {
        type: "string",
        format: "url",
      },
      date: {
        type: "string",
        format: "date",
      },
      boolean: {
        type: "boolean",
      },
    },
    required: ["date", "boolean"],
  };

  expect(convertedSchema).toEqual(jsonSchema);
});
