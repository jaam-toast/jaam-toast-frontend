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
    queryKey: ["content", schemaName, contentId],
    queryFn: () => contentsAPI.getContent({ schemaName, contentId }),
  });
}
