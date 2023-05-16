import { useQuery } from "@tanstack/react-query";

import { getProject } from "../@utils/api";

export function useProjectQuery(projectName: string) {
  return useQuery({
    queryKey: ["project", projectName],
    queryFn: () => getProject(projectName),
  });
}
