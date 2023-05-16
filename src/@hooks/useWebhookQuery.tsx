import { useQuery } from "@tanstack/react-query";

import { getProject } from "../@utils/api";

export function useWebhookQuery(projectName: string) {
  return useQuery({
    queryKey: ["project", projectName],
    queryFn: () => getProject(projectName),
    select: project => project.webhookList,
  });
}
