import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import { Box, CardContent, CardActionArea, Typography } from "@mui/material";
import {
  ChangeHistory as ChangeHistoryIcon,
  Close as CloseIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

import timeSince from "../lib/utils/timeSince";
import useModal from "../lib/hooks/useModal";

import { UserDeploymentData } from "../types";

function RepoCard({ cardData }: { cardData: UserDeploymentData }) {
  const updatedMilliseconds = new Date(cardData.repoUpdatedAt).valueOf();
  const repoUpdatedSince = timeSince(updatedMilliseconds);

  return (
    <CardActionArea>
      <CardContent sx={{ padding: 0, margin: 2 }}>
        <Box display="flex" sx={{ flexDirection: "row", alignItems: "center" }}>
          <ChangeHistoryIcon fontSize="medium" />
          <Box display="flex" sx={{ flexDirection: "column", marginLeft: 1 }}>
            <Typography fontSize="large" fontWeight="bold">
              {cardData.repoName}
            </Typography>
            <Typography fontSize="medium">{cardData.deployedUrl}</Typography>
          </Box>
        </Box>
        <Typography fontSize="small" fontWeight="medium" sx={{ marginTop: 2 }}>
          {cardData.lastCommitMessage}
        </Typography>
        <Box
          display="flex"
          sx={{ flexDirection: "row", marginTop: 2, alignItems: "center" }}
        >
          <Typography fontSize="small" fontWeight="medium">
            {repoUpdatedSince} ago via
          </Typography>
          <GitHubIcon fontSize="small" sx={{ marginLeft: 0.5 }} />
        </Box>
      </CardContent>
    </CardActionArea>
  );
}

export default RepoCard;
