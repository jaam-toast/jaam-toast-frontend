import { useQuery } from "@tanstack/react-query";

import { ContentsAPIClient } from "../@utils/contentsAPI";

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
  const contentsAPI = new ContentsAPIClient().setToken(token);

  return useQuery({
    queryKey: ["contentsList", schemaName],
    queryFn: () =>
      contentsAPI.getContentsList({
        schemaName,
        page,
        pageLength,
        sort,
        order,
      }),
    suspense: true,
  });
}
