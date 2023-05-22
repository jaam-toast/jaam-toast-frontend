import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import omit from "lodash/omit";

import {
  createContent,
  deleteContents,
  updateContent,
  addAssets,
  deleteAsset,
} from "../@utils/contentsAPI";
import { ValidationError } from "../@utils/createError";
import { ERROR, SUCCESS } from "../@config/message";
import { useContentsState } from "./useContentsStore";

export function useCreateContentMutation() {
  const { content } = useContentsState();

  return useMutation(
    ["content-create"],
    async ({ token, schemaName }: { token: string; schemaName: string }) => {
      if (!content) {
        throw new ValidationError(ERROR.NOT_FOUND.CONTENT_DATA);
      }

      return createContent({ token, schemaName, content });
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

      return updateContent({
        token,
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
      if (!contentIds.length) {
        throw new ValidationError("Content id data not found. Please check.");
      }

      return deleteContents({ token, schemaName, contentIds });
    },
    {
      onSuccess: () => toast.success(SUCCESS.DELETE),
    },
  );
}

export function useCreateAssetContentMutation() {
  return useMutation(
    ["asset-create"],
    async ({ token, assets }: { token: string; assets: FormData }) => {
      if (!assets) {
        throw new ValidationError("Cannot find assets data");
      }

      return addAssets({
        token,
        assets,
      });
    },
    {
      onSuccess: () => toast.success(SUCCESS.CREATE),
    },
  );
}

export function useDeleteAssetContentMutation() {
  return useMutation(
    ["asset-delete"],
    async ({
      token,
      assetPath,
      contentId,
    }: {
      token: string;
      assetPath: string;
      contentId: string;
    }) =>
      deleteAsset({
        token,
        assetPath,
        contentId,
      }),
    {
      onSuccess: () => toast.success(SUCCESS.DELETE),
    },
  );
}
