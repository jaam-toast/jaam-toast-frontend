import { useQuery } from "@tanstack/react-query";

import { ContentsAPIClient } from "../@utils/contentsAPI";

export function useContentQuery({
  schemaName,
  token,
  contentId,
}: {
  schemaName: string;
  token: string;
  contentId?: string;
}) {
  const contentsAPI = new ContentsAPIClient().setToken(token);

  return useQuery({
    queryKey: ["contents", schemaName],
    queryFn: () => contentsAPI.getContent({ schemaName, contentId }),
  });
}

export function useContentsListQuery({
  schemaName,
  token,
  page,
  sort,
  order,
}: {
  schemaName: string;
  token: string;
  page?: number;
  sort?: string;
  order?: string;
}) {
  const contentsAPI = new ContentsAPIClient().setToken(token);

  return useQuery({
    queryKey: ["contents", schemaName],
    queryFn: () =>
      contentsAPI.getContentsList({ schemaName, page, sort, order }),
    suspense: true,
  });
}
