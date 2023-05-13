import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import omit from "lodash/omit";

import { ContentsAPIClient } from "../@utils/contentsAPI";
import { useContentsState } from "./useContentsStore";
import { ValidationError } from "../@utils/createError";
import { ERROR, SUCCESS } from "../@config/message";

export function useCreateContentMutation() {
  const { content } = useContentsState();

  return useMutation(
    ["content-create"],
    async ({ token, schemaName }: { token: string; schemaName: string }) => {
      if (!content) {
        throw new ValidationError(ERROR.NOT_FOUND.CONTENT_DATA);
      }

      if (!token) {
        throw new ValidationError("Cannot find api key.");
      }

      if (!schemaName) {
        throw new ValidationError(ERROR.NOT_FOUND.SCHEMA_NAME);
      }

      const contentsAPI = new ContentsAPIClient().setToken(token);

      return contentsAPI.createContent({ schemaName, content });
    },
    {
      onSuccess: () => toast.success(SUCCESS.CREATE),
    },
  );
}

export function useUpdateContentMutation() {
  const { content } = useContentsState();

  return useMutation(
    ["content-create"],
    async ({
      token,
      schemaName,
      contentId,
    }: {
      token: string;
      schemaName: string;
      contentId: string;
    }) => {
      if (!content) {
        throw new ValidationError(ERROR.NOT_FOUND.CONTENT_DATA);
      }

      if (!token) {
        throw new ValidationError("Cannot find api key.");
      }

      if (!schemaName) {
        throw new ValidationError(ERROR.NOT_FOUND.SCHEMA_NAME);
      }

      const contentsAPI = new ContentsAPIClient().setToken(token);

      return contentsAPI.updateContent({
        schemaName,
        content: omit(content, ["_createAt", "_updatedAt", "_id"]),
        contentId,
      });
    },
    {
      onSuccess: () => toast.success(SUCCESS.UPDATE),
    },
  );
}

export function useDeleteContentsMutation() {
  return useMutation(
    ["content-create"],
    async ({
      token,
      schemaName,
      contentIds,
    }: {
      token: string;
      schemaName: string;
      contentIds: string[];
    }) => {
      if (!token) {
        throw new ValidationError("Api key not found. Please check");
      }

      if (!schemaName) {
        throw new ValidationError(ERROR.NOT_FOUND.SCHEMA_NAME);
      }

      const contentsAPI = new ContentsAPIClient().setToken(token);

      return contentsAPI.deleteContents({ schemaName, contentIds });
    },
    {
      onSuccess: () => toast.success(SUCCESS.DELETE),
    },
  );
}
