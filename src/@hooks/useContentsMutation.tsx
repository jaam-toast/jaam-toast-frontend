import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import omit from "lodash/omit";

import {
  createContent,
  deleteContents,
  updateContent,
  addAssets,
} from "../@utils/contentsAPI";
import { ValidationError } from "../@utils/createError";
import { AssetAPIClient } from "../@utils/assetsAPI";
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

      if (!token) {
        throw new ValidationError("Cannot find api key.");
      }

      if (!schemaName) {
        throw new ValidationError(ERROR.NOT_FOUND.SCHEMA_NAME);
      }

      return createContent({ token, schemaName, content });
    },
    {
      onSuccess: () => toast.success(SUCCESS.CREATE),
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

      if (!token) {
        throw new ValidationError("Cannot find api key.");
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
      if (!token) {
        throw new ValidationError("Api key not found. Please check");
      }

      if (!schemaName) {
        throw new ValidationError(ERROR.NOT_FOUND.SCHEMA_NAME);
      }

      return deleteContents({ token, schemaName, contentIds });
    },
    {
      onSuccess: () => toast.success(SUCCESS.DELETE),
    },
  );
}

export function useDeleteAssetContentMutation() {
  return useMutation(
    ["asset-create"],
    async ({
      token,
      path,
      assetId,
    }: {
      token: string;
      path: string;
      assetId: string;
    }) => {
      if (!token) {
        throw new ValidationError("Cannot find api key.");
      }

      if (!path || !assetId) {
        throw new ValidationError("Cannot find asset data");
      }

      const assetAPI = new AssetAPIClient();
      assetAPI.connect();
      const result = await assetAPI.deleteAsset({
        path,
      });

      if (!result) {
        throw new ValidationError("삭제 실패");
      }

      return deleteContents({
        token,
        schemaName: "assets",
        contentIds: [assetId],
      });
    },
  );
}
