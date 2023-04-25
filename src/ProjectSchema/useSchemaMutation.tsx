import Ajv from "ajv";
import addFormats from "ajv-formats";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../@shared";
import APIClient from "../@utils/api";
import { useSchemaState } from "./useSchemaStore";

import type { Schema } from "../@types/schema";

type Options = {
  onSuccess?: (data?: string) => Promise<unknown> | unknown;
  onError?: (error?: unknown) => Promise<unknown> | unknown;
};

const formatingForJsonSchema = ({
  properties,
  title,
  description,
  required,
}: {
  properties: Schema["properties"];
  title: string;
  description?: string;
  required?: string[];
}) => {
  return Object.entries(properties).reduce(
    (schema: Schema, [propName, options]) => {
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
        if (type === "email" || type === "dates") {
          return type;
        }

        if (type === "link") {
          return "uri-template";
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
      title,
      type: "object",
      properties: {},
      ...(description && { description }),
      ...(required?.length && { required }),
    } as Schema,
  );
};

export function useCreateSchemaMutation({ onSuccess, onError }: Options) {
  const { title, description, type, properties, required } = useSchemaState();
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  const schema = formatingForJsonSchema({
    title,
    description,
    properties,
    required,
  });

  return useMutation(
    ["schema-create"],
    async ({ projectName }: { projectName: string }) => {
      if (!title || !type || !Object.keys(properties).length) {
        return;
      }

      const options = {
        schema_name: title,
        schema,
      };

      // * test 용도 - 이후에 지우겠습니다.
      try {
        const ajv = new Ajv();
        addFormats(ajv);
        const test = ajv.compile(schema);
        console.log({ test });
      } catch (error) {
        console.log(error);
      }

      return api.createSchema({ projectName, options });
    },
    {
      onSuccess,
      onError,
    },
  );
}

export function useUpdateSchemaMutation({ onSuccess, onError }: Options) {
  const { title, description, type, properties, required } = useSchemaState();
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  const schema = formatingForJsonSchema({
    title,
    description,
    properties,
    required,
  });

  return useMutation(
    ["schema-update"],
    async ({
      projectName,
      schemaName,
    }: {
      projectName: string;
      schemaName: string;
    }) => {
      if (!schemaName || !type || !Object.keys(properties).length) {
        return;
      }

      const options = {
        schema_name: schemaName,
        schema,
      };

      return api.updateSchema({ projectName, schemaName, options });
    },
    {
      onSuccess,
      onError,
    },
  );
}

export function useDeleteSchemaMutation({ onSuccess, onError }: Options) {
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(
    ["schema-delete"],
    async ({
      projectName,
      schemaNames,
    }: {
      projectName: string;
      schemaNames: string[];
    }) => {
      return api.deleteSchema({ projectName, schemaNames });
    },
    {
      onSuccess,
      onError,
    },
  );
}
