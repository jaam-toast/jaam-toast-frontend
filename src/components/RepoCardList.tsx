import { useRecoilValue } from "recoil";
import { Card, Grid } from "@mui/material";

import RepoCard from "./RepoCard";
import userDeploymentsState from "lib/recoil/userDeployments";
import searchWordState from "lib/recoil/searchWord/atom";

function RepoCardList() {
  const userDeploymentList = useRecoilValue(userDeploymentsState);

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
      {userDeploymentList.map((cardData, index) => {
        return (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card variant="elevation">
              <RepoCard cardData={cardData} />
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default RepoCardList;
