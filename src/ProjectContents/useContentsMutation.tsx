import { useMutation } from "@tanstack/react-query";

import { ContentsAPIClient } from "../@utils/contentsAPI";
import { useContentsState } from "./useContentsStore";

type Options = {
  onSuccess?: (data?: string) => Promise<unknown> | unknown;
  onError?: (error?: unknown) => Promise<unknown> | unknown;
};

export function useCreateContentMutation({ onSuccess, onError }: Options) {
  const { content } = useContentsState();

  return useMutation(
    ["content-create"],
    async ({ token, schemaName }: { token: string; schemaName: string }) => {
      if (!token || !schemaName) {
        return;
      }

      const contentsAPI = new ContentsAPIClient().setToken(token);

      return contentsAPI.createContent({ schemaName, content });
    },
    {
      onSuccess,
      onError,
    },
  );
}

export function useUpdateContentMutation({ onSuccess, onError }: Options) {
  const { content } = useContentsState();

  return useMutation(
    ["content-create"],
    async ({ token, schemaName }: { token: string; schemaName: string }) => {
      if (!token || !schemaName) {
        return;
      }

      const contentsAPI = new ContentsAPIClient().setToken(token);

      return contentsAPI.updateContent({ schemaName, content });
    },
    {
      onSuccess,
      onError,
    },
  );
}

export function useDeleteContentsMutation({ onSuccess, onError }: Options) {
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
      if (!token || !schemaName) {
        return;
      }

      const contentsAPI = new ContentsAPIClient().setToken(token);

      return contentsAPI.deleteContents({ schemaName, contentIds });
    },
    {
      onSuccess,
      onError,
    },
  );
}
