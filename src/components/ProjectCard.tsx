import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useSetRecoilState } from "recoil";
import { Box, CardContent, CardActionArea, Typography } from "@mui/material";
import {
  ChangeHistory as ChangeHistoryIcon,
  Close as CloseIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

import timeSince from "src/utils/timeSince";
import useModal from "src/hooks/useModal";
import { selectedProject } from "src/recoil/userDeployments";
import { BLUE } from "src/constants/colors";

import { UserDeploymentData } from "types/deployment";

interface IUserDeploymentData {
  cardData: UserDeploymentData;
}

function ProjectCard({ cardData }: IUserDeploymentData) {
  const setSelectedProject = useSetRecoilState(selectedProject);
  const { showModal } = useModal();

  const updatedMilliseconds = new Date(cardData.repoUpdatedAt).valueOf();
  const repoUpdatedSince = timeSince(updatedMilliseconds);
  const router = useRouter();

  const handleCardClick = () => {
    // showModal({
    //   modalType: "ModalRepoDetails",
    //   modalProps: {
    //     previewData: cardData,
    //   },
    // });

    const { repoOwner, repoName } = cardData;

    setSelectedProject(cardData);
    router.push(`/${repoOwner}/${repoName}`);
  };

  const handleCloseButtonClick = (e: MouseEvent) => {
    e.stopPropagation();

    showModal({
      modalType: "ModalDeleteConfirm",
      modalProps: {
        cardData,
      },
    });
  };

  const handleClickUrl = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <CardActionArea onClick={handleCardClick}>
      <CardContent
        sx={{ position: "relative", padding: "1.5rem", height: 180 }}
      >
        <CloseIcon
          sx={{ ...CloseIconStyle }}
          onClick={handleCloseButtonClick}
        />
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <ChangeHistoryIcon fontSize="medium" />
          <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
            <Typography sx={{ fontSize: "large", fontWeight: "bold" }}>
              {cardData.repoName}
            </Typography>
            <a
              href={`https://${cardData.deployedUrl as string}`}
              style={{ color: BLUE, textDecoration: "none" }}
              target="_blank"
              onClick={handleClickUrl}
              rel="noreferrer"
            >
              <Typography
                sx={{ fontSize: "medium" }}
                style={{ color: BLUE }}
                onClick={handleClickUrl}
              >
                {cardData.deployedUrl}
              </Typography>
            </a>
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

export default ProjectCard;
