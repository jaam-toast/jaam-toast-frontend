import { useState } from "react";

import { Card, Grid } from "@mui/material";

import RepoCard from "./RepoCard";

import { UserDeploymentData } from "../types";

function RepoCardList({
  userDeploymentsList,
}: {
  userDeploymentsList: UserDeploymentData[];
}) {
  const [cardDataList] = useState<UserDeploymentData[]>(userDeploymentsList);

  return (
    <Box display="flex" sx={{ flexDirection: "row" }}>
      {cardDataList.map((cardData, index) => {
        return (
          <Box
            key={index}
            sx={{
              padding: 1,
              margin: 1,
            }}
          >
            <Card variant="elevation">
              <RepoCard cardData={cardData} />
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}

export default RepoCardList;
