/* eslint-disable react/no-array-index-key */
import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

function RepoCard() {
  return (
    <CardActionArea>
      <CardContent sx={{ padding: 0, margin: 2 }}>
        <Box display="flex" sx={{ flexDirection: "row", alignItems: "center" }}>
          <ChangeHistoryIcon fontSize="medium" />
          <Box display="flex" sx={{ flexDirection: "column", marginLeft: 1 }}>
            <Typography fontSize="large" fontWeight="bold">
              repository-name
            </Typography>
            <Typography fontSize="medium">site-url</Typography>
          </Box>
        </Box>
        <Typography fontSize="small" fontWeight="medium" sx={{ marginTop: 2 }}>
          📝[docs] Update README
        </Typography>
        <Box
          display="flex"
          sx={{ flexDirection: "row", marginTop: 2, alignItems: "center" }}
        >
          <Typography fontSize="small" fontWeight="medium">
            22h ago via
          </Typography>
          <GitHubIcon fontSize="small" sx={{ marginLeft: 0.5 }} />
        </Box>
      </CardContent>
    </CardActionArea>
  );
}

function Content() {
  const [cardList] = useState([]);

  return (
    <Box display="flex" sx={{ flexDirection: "row" }}>
      {cardList.map((card, index) => {
        return (
          <Box
            key={index}
            sx={{
              padding: 1,
              margin: 1,
            }}
          >
            <Card variant="elevation">
              <RepoCard />
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}

export default Content;
