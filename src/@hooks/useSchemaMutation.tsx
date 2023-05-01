import { useMutation } from "@tanstack/react-query";
import { jaamSchemaToJsonSchema } from "@jaam-schema/src";

import { useAuth } from "./useAuth";
import { useSchemaState } from "./useSchemaStore";
import APIClient from "../@utils/api";

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

  return useMutation(
    ["schema-create"],
    async ({ projectName }: { projectName: string }) => {
      if (!projectName) {
        throw Error("Cannot find project name");
      }

      if (!title || !type || !Object.keys(properties).length) {
        throw Error("Cannot find schema data");
      }

      const options = {
        schemaName: title,
        schema: jaamSchemaToJsonSchema(schema),
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

  return useMutation(
    ["schema-update"],
    async ({
      projectName,
      schemaName,
    }: {
      projectName: string;
      schemaName: string;
    }) => {
      if (!projectName) {
        throw Error("Cannot find project name");
      }

      if (!schemaName) {
        throw Error("Cannot find schema name");
      }

      if (!type || !Object.keys(properties).length) {
        throw Error("Cannot find schema data");
      }

      const options = {
        schemaName: schemaName,
        schema: jaamSchemaToJsonSchema(schema),
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
      if (!projectName) {
        throw Error("Cannot find project name");
      }

      if (!schemaNames) {
        throw Error("Cannot find schema name");
      }

      if (!!Array.isArray(schemaNames)) {
        throw Error("schema names must be array");
      }

      return api.deleteSchema({ projectName, schemaNames });
    },
    {
      onSuccess,
      onError,
    },
  );
}
