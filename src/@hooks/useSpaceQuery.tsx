import { useQuery } from "@tanstack/react-query";

import { getSpaces } from "../@utils/api";

export function useSpaceQuery() {
  return useQuery({
    queryKey: ["spaces"],
    queryFn: () => getSpaces(),
  });
}
