import Ajv, { DefinedError } from "ajv";
import addFormats from "ajv-formats";

import type { JsonSchema, JsonSchemaContent } from ".";

const ajv = new Ajv();
addFormats(ajv);

export function jsonSchemaValidator({
  content,
  schema,
}: {
  content: JsonSchemaContent;
  schema: JsonSchema;
}) {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const isPassValidate = validate(content);

  if (!isPassValidate) {
    const { keyword, message, instancePath } = (
      validate.errors as DefinedError[]
    )[0];

    switch (keyword) {
      case "required": {
        return {
          result: isPassValidate,
          message: message,
        };
      }
      case "format": {
        return {
          result: isPassValidate,
          message: `must match format ${instancePath.slice(1)}`,
        };
      }
      default: {
        return {
          result: isPassValidate,
          message: instancePath
            ? `"${instancePath.slice(1)}" property ${message}`
            : message,
        };
      }
    }
  }

  return {
    result: isPassValidate,
  };
}
