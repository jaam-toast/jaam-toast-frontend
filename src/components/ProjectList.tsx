import { Card, Grid } from "@mui/material";

import ProjectCard from "./ProjectCard";

import type { Env } from "types/projectOption";

export type Project = {
  repoOwner: string;
  repoName: string;
  deployedUrl: string;
  lastCommitMessage: string;
  repoUpdatedAt: string;
  installCommand?: string;
  buildCommand?: string;
  envList?: Env[];
  buildingLog?: string[];
};

type ProjectListProps = {
  searchword: string;
};

function ProjectList({ searchword }: ProjectListProps) {
  // TODO: fetch project List;
  const projects = [
    {
      repoOwner: "repoOwner example 1",
      repoName: "repoName example 1",
      deployedUrl: "www.example-deployed-1.com",
      lastCommitMessage: "lats commit message example 1",
      repoUpdatedAt: "repo updated at example 1",
    },
    {
      repoOwner: "repoOwner example 2",
      repoName: "repoName example 2",
      deployedUrl: "www.example-deployed-2.com",
      lastCommitMessage: "lats commit message example 2",
      repoUpdatedAt: "repo updated at example 2",
    },
  ];

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        height: "80vh",
        overflow: "auto",
        paddingRight: "0.1rem",
        paddingLeft: "0.1rem",
      }}
    >
      {projects
        .filter(project =>
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

export default ProjectList;
