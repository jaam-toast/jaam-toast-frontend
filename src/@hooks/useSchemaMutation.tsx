import { useMutation } from "@tanstack/react-query";
import { jaamSchemaToJsonSchema } from "@jaam-schema/src";
import { toast } from "react-toastify";

import { useAuth } from "./useAuth";
import { useSchemaState } from "./useSchemaStore";
import APIClient from "../@utils/api";
import { ValidationError } from "../@utils/createError";
import { ERROR, SUCCESS } from "../@config/message";

export function useCreateSchemaMutation() {
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
        throw new ValidationError("Cannot find project name");
      }

      if (!title || !type || !Object.keys(properties).length) {
        throw new ValidationError("Cannot find schema data");
      }

      const options = {
        schemaName: title,
        schema: jaamSchemaToJsonSchema(schema),
      };

      return api.createSchema({ projectName, options });
    },
    {
      onSuccess: () => toast.success(SUCCESS.CREATE),
    },
  );
}

export function useUpdateSchemaMutation() {
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
        throw new ValidationError("Cannot find project name");
      }

      if (!schemaName) {
        throw new ValidationError("Cannot find schema name");
      }

      if (!type || !Object.keys(properties).length) {
        throw new ValidationError("Cannot find schema data");
      }

      const options = {
        schemaName: schemaName,
        schema: jaamSchemaToJsonSchema(schema),
      };

      return api.updateSchema({ projectName, schemaName, options });
    },
    {
      onSuccess: () => toast.success(SUCCESS.UPDATE),
    },
  );
}

export function useDeleteSchemaMutation() {
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
        throw new ValidationError(ERROR.NOT_FOUND.PROJECT_NAME);
      }

      if (!schemaNames) {
        throw new ValidationError(ERROR.NOT_FOUND.SCHEMA_NAME);
      }

      if (!!Array.isArray(schemaNames)) {
        throw new ValidationError("Schema names must be array.");
      }

      return api.deleteSchema({ projectName, schemaNames });
    },
    {
      onSuccess: () => toast.success(SUCCESS.DELETE),
    },
  );
}
