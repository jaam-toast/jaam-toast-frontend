import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { Box, CardContent, CardActionArea, Typography } from "@mui/material";
import {
  ChangeHistory as ChangeHistoryIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

import timeSince from "src/utils/timeSince";
import useModal from "src/hooks/useModal";
import { BLUE } from "src/config/colors";

import type { Project } from "types/api";
interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const updatedMilliseconds = new Date(project.projectUpdatedAt).valueOf();
  const repoUpdatedSince = timeSince(updatedMilliseconds);
  const router = useRouter();

  const handleCardClick = () => {
    const { space, repoName } = project;
    router.push(`/${space}/${repoName}`);
  };

  const handleClickUrl = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <CardActionArea onClick={handleCardClick}>
      <CardContent
        sx={{ position: "relative", padding: "1.5rem", height: 180 }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <ChangeHistoryIcon fontSize="medium" />
          <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
            <Typography sx={{ fontSize: "large", fontWeight: "bold" }}>
              {project.projectName}
            </Typography>
            <a
              href={`https://${project.deployedUrl as string}`}
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
                {project.deployedUrl}
              </Typography>
            </a>
          </Box>
        </Box>
        <Typography sx={{ fontSize: "small", fontWeight: "medium", mt: 2 }}>
          {project.lastCommitMessage}
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

export default ProjectCard;
