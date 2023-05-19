import { useMutation } from "@tanstack/react-query";
import { jaamSchemaToJsonSchema } from "@jaam-schema/src";
import { toast } from "react-toastify";

import { createSchema, deleteSchema, updateSchema } from "../@utils/api";
import { ValidationError } from "../@utils/createError";
import { ERROR, SUCCESS } from "../@config/message";
import { useSchemaState } from "./useSchemaStore";

export function useCreateSchemaMutation() {
  const schema = useSchemaState();
  const { title, type, properties } = schema;

  return useMutation(
    ["schema-create"],
    async ({ projectName }: { projectName: string }) => {
      if (!title || !type || !Object.keys(properties).length) {
        throw new ValidationError("Cannot find schema data");
      }

      const options = {
        schemaName: title,
        schema: jaamSchemaToJsonSchema(schema),
      };

      return createSchema({ projectName, options });
    },
    {
      onSuccess: () => toast.success(SUCCESS.CREATE),
    },
  );
}

export function useUpdateSchemaMutation() {
  const schema = useSchemaState();
  const { type, properties } = schema;

  return useMutation(
    ["schema-update"],
    async ({
      projectName,
      schemaName,
    }: {
      projectName: string;
      schemaName: string;
    }) => {
      if (!type || !Object.keys(properties).length) {
        throw new ValidationError("Cannot find schema data");
      }

      const options = {
        schemaName: schemaName,
        schema: jaamSchemaToJsonSchema(schema),
      };

      return updateSchema({ projectName, schemaName, options });
    },
    {
      onSuccess: () => toast.success(SUCCESS.UPDATE),
    },
  );
}

export function useDeleteSchemaMutation() {
  return useMutation(
    ["schema-delete"],
    async ({
      projectName,
      schemaNames,
    }: {
      projectName: string;
      schemaNames: string[];
    }) => {
      if (!schemaNames.length) {
        throw new ValidationError(ERROR.NOT_FOUND.SCHEMA_NAME);
      }

      return deleteSchema({ projectName, schemaNames });
    },
    {
      onSuccess: () => toast.success(SUCCESS.DELETE),
    },
  );
}
