import { useQueries, useQuery } from "@tanstack/react-query";

import { getContentsList } from "../@utils/contentsAPI";
import { ValidationError } from "../@utils/createError";

import type { ContentsData, SchemaData } from "../@types/cms";

export function useContentsListQuery({
  token,
  schemaName,
  page = 1,
  pageLength = 20,
  sort = "createAt",
  order = "ascending",
}: {
  token: string;
  schemaName: string;
  page?: number;
  pageLength?: number;
  sort?: string;
  order?: string;
}) {
  if (!token) {
    throw new ValidationError("Token not found. Please check.");
  }

  return useQuery({
    queryKey: ["contentsList", schemaName, sort, order],
    queryFn: () =>
      getContentsList({
        token,
        schemaName,
        page,
        pageLength,
        sort,
        order,
      }),
    enabled: !!schemaName,
  });
}

export function useContentsCountQuery({
  schemaList,
  token,
}: {
  schemaList: SchemaData[];
  token: string;
}) {
  if (!token) {
    throw new ValidationError("Token not found. Please check.");
  }

  if (!schemaList) {
    throw new ValidationError("Schema List not found. Please check.");
  }

  return useQueries({
    queries: schemaList.map(data => ({
      queryKey: ["content", data.schemaName],
      queryFn: () =>
        getContentsList({
          token,
          schemaName: data.schemaName,
        }),
      select: (contents: ContentsData) => contents.totalCounts,
    })),
  });
}
