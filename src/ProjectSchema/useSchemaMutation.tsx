import { useMutation } from "@tanstack/react-query";
import { jaamSchemaToJsonSchema } from "../@packages/jaam-schema/src";

import { useAuth } from "../@shared";
import APIClient from "../@utils/api";
import { useSchemaState } from "./useSchemaStore";

type Options = {
  onSuccess?: (data?: string) => Promise<unknown> | unknown;
  onError?: (error?: unknown) => Promise<unknown> | unknown;
};

export function useCreateSchemaMutation({ onSuccess, onError }: Options) {
  const schema = useSchemaState();
  const { title, type, properties } = schema;
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  const convertedSchema = jaamSchemaToJsonSchema(schema);

  return useMutation(
    ["schema-create"],
    async ({ projectName }: { projectName: string }) => {
      if (!title || !type || !Object.keys(properties).length) {
        return;
      }

      const options = {
        schemaName: title,
        schema: convertedSchema,
      };

      return api.createSchema({ projectName, options });
    },
    {
      onSuccess,
      onError,
    },
  );
}

export function useUpdateSchemaMutation({ onSuccess, onError }: Options) {
  const schema = useSchemaState();
  const { type, properties } = schema;
  const { user } = useAuth();

  const api = new APIClient()
    .setUserId(user?.id)
    .setAccessToken(user?.accessToken)
    .setGithubAccessToken(user?.githubAccessToken);

  const convertedSchema = jaamSchemaToJsonSchema(schema);

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
        schemaName: schemaName,
        schema: convertedSchema,
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
