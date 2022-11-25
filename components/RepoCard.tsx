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
    <CardActionArea onClick={handleCardClick}>
      <CardContent
        sx={{ position: "relative", padding: "1.5rem", height: 180 }}
      >
        <CloseIcon sx={{ ...CloseIconStyle }} onClick={handleCloseClick} />
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <ChangeHistoryIcon fontSize="medium" />
          <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
            <Typography sx={{ fontSize: "large", fontWeight: "bold" }}>
              {cardData.repoName}
            </Typography>
            <Typography sx={{ fontSize: "medium" }}>
              {cardData.deployedUrl}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: "small", fontWeight: "medium", mt: 2 }}>
          {cardData.lastCommitMessage}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography sx={{ fontSize: "small", fontWeight: "medium" }}>
            {repoUpdatedSince} ago via
          </Typography>
          <GitHubIcon sx={{ fontSize: "small", marginLeft: 0.5 }} />
        </Box>
      </CardContent>
    </CardActionArea>
  );
}

const CloseIconStyle = {
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  color: "rgba(51, 51, 51, 0.8)",
  width: "1.2rem",
  "&:hover": {
    color: "rgba(255, 83, 83, 0.8)",
    backgroundColor: "white",
  },
};

export default RepoCard;
