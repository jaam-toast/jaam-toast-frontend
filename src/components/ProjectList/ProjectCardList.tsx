import { Card, Grid } from "@mui/material";

import ProjectCard from "./ProjectCard";
import { useProjectListQuery } from "src/hooks/useProjectListQuery";

type ProjectCardListProps = {
  searchword: string;
};

function ProjectCardList({ searchword }: ProjectCardListProps) {
  const { data: projects } = useProjectListQuery();

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        height: "80vh",
        overflow: "auto",
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
