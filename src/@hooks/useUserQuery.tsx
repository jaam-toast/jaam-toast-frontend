import { useQuery } from "@tanstack/react-query";

import { getUserData } from "../@utils/api";

export function useUserQuery() {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: () => getUserData(),
  });
}
