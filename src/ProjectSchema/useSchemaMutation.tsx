import Ajv from "ajv";
import { useMutation } from "@tanstack/react-query";

import { useSchemaState } from "./useSchemaStore";

import { useAuth } from "../@shared";
import APIClient from "../@utils/api";
import { Schema } from "../@types/schema";

type Options = {
  onSuccess?: (data?: string) => Promise<unknown> | unknown;
  onError?: (error?: unknown) => Promise<unknown> | unknown;
};

// TODO 서버, 프론트 - schema_name or schemaName으로 맞추기
export function useCreateSchemaMutation({ onSuccess, onError }: Options) {
  const { title, description, type, properties, required } = useSchemaState();
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  const schema = Object.entries(properties).reduce(
    (schema: Schema, [propName, options]) => {
      const { type } = options;
      const min = type === "string" ? "minLength" : "minimum";
      const max = type === "string" ? "maxLength" : "maximum";

      const fieldOptions = {
        ...(options.min !== undefined && { [min]: options.min }),
        ...(options.max !== undefined && { [max]: options.max }),
      };

      schema.properties[propName] = {
        type: type === "text" || type === "textarea" ? "string" : type,
        ...fieldOptions,
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

      // * test 용도
      try {
        const ajv = new Ajv();
        ajv.compile(schema);
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

  const schema = Object.entries(properties).reduce(
    (schema: Schema, [propName, options]) => {
      const { type } = options;
      const min = type === "string" ? "minLength" : "minimum";
      const max = type === "string" ? "maxLength" : "maximum";

      const fieldOptions = {
        ...(options.min !== undefined && { [min]: options.min }),
        ...(options.max !== undefined && { [max]: options.max }),
      };

      schema.properties[propName] = {
        type: type === "text" || type === "textarea" ? "string" : type,
        ...fieldOptions,
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

      // * test 용도
      try {
        const ajv = new Ajv();
        ajv.compile(schema);
      } catch (error) {
        console.log(error);
      }

      return api.updateSchema({ projectName, schemaName, options });
    },
    {
      onSuccess,
      onError,
    },
  );
}

export function useDeleteSchemaMutation({ onSuccess, onError }: Options) {
  const { title } = useSchemaState();
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  return useMutation(
    ["schema-delete"],
    async ({
      projectName,
      schemaName,
    }: {
      projectName: string;
      schemaName: string;
    }) => {
      return api.deleteSchema({ projectName, schemaName });
    },
    {
      onSuccess,
      onError,
    },
  );
}
