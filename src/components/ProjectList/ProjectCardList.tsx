import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card, Grid } from "@mui/material";

import ProjectCard from "./ProjectCard";
import useUser from "src/hooks/useUser";
import Config from "src/config";

import type { Env } from "types/projectOption";

export type Project = {
  repoOwner: string;
  repoName: string;
  deployedUrl: string;
  lastCommitMessage: string;
  projectUpdatedAt: string;
  installCommand?: string;
  buildCommand?: string;
  envList?: Env[];
  buildingLog?: string[];
  projectName: string;
};

type ProjectCardListProps = {
  searchword: string;
};

type GetProjectsResponse = {
  message: string;
  result?: Project[];
};

function ProjectCardList({ searchword }: ProjectCardListProps) {
  const { user } = useUser();
  const { data: projects } = useQuery({
    queryKey: ["projects-page", "projects"],
    queryFn: async () => {
      const { data } = await axios.get<GetProjectsResponse>(
        `${Config.SERVER_URL_API}/users/${user?.id}/projects?githubAccessToken=${user?.githubAccessToken}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );

      return data.result;
    },
  });

  console.log(projects);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        height: "80vh",
        overflow: "auto",
        // paddingRight: "0.1rem",
        // paddingLeft: "0.1rem",
      }}
    >
      {projects
        ?.filter(project =>
          searchword ? project.repoName.includes(searchword) : true,
        )
        .map(project => (
          <Grid item xs={2} sm={4} md={4} key={project.deployedUrl}>
            <Card variant="elevation">
              <ProjectCard project={project} />
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

export default ProjectCardList;
