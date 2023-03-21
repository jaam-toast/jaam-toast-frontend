import { useRecoilValue } from "recoil";
import { Card, Grid } from "@mui/material";

import ProjectCard from "./ProjectCard";
import searchWordState from "src/recoil/searchWord/atom";
import useFetchDeployment from "src/hooks/useFetchDeployment";

interface RepoCardListPropsProps {
  userId: string;
}

function ProjectList({ userId }: RepoCardListPropsProps) {
  const userDeploymentList = useFetchDeployment(userId);
  const searchWord = useRecoilValue(searchWordState);

  return (
    <>
      {userDeploymentList && (
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
          {userDeploymentList
            .filter(deploymentItem =>
              searchWord ? deploymentItem.repoName.includes(searchWord) : true,
            )
            .map((cardData, index) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card variant="elevation">
                    <ProjectCard cardData={cardData} />
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      )}
    </>
  );
}

export default ProjectList;
