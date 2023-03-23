import { useRecoilValue } from "recoil";
import { Card, Grid } from "@mui/material";

import ProjectCard from "./ProjectCard";
import searchWordState from "src/recoil/searchWord/atom";
import { Env } from "types/projectOption";

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
interface ProjectListProps {
  projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
  // const searchWord = useRecoilValue(searchWordState);

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
        // .filter(project =>
        //   searchWord ? project.repoName.includes(searchWord) : true,
        // )
        .map((cardData, index) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card variant="elevation">
                <ProjectCard project={cardData} />
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default ProjectList;
