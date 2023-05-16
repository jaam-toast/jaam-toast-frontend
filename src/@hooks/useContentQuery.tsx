import { useQuery } from "@tanstack/react-query";

import { getContent } from "../@utils/contentsAPI";

export function useContentQuery({
  schemaName,
  token,
  contentId,
}: {
  schemaName: string;
  token: string;
  contentId?: string;
}) {
  return useQuery({
    queryKey: ["content", schemaName, contentId],
    queryFn: () => getContent({ token, schemaName, contentId }),
  });
}
