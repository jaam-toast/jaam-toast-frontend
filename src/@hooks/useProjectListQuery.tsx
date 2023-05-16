import { useQuery } from "@tanstack/react-query";

import { getProjectList } from "../@utils/api";

export function useProjectListQuery() {
  return useQuery({
    queryKey: ["projectList"],
    queryFn: () => getProjectList(),
  });
}
