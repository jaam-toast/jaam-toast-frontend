import { useQuery } from "@tanstack/react-query";

import { getContentsList } from "../@utils/contentsAPI";
import { ValidationError } from "../@utils/createError";

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
