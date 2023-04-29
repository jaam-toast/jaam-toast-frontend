import { jsonSchemaToJaamSchema } from "./jsonSchemaToJaamSchema";

import type { JsonSchema } from "./types";

test("test", () => {
  const schema: JsonSchema = {
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

  const convertedSchema = jsonSchemaToJaamSchema(schema);

  const jaamSchema = {
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

  expect(convertedSchema).toEqual(jaamSchema);
});
