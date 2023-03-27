import { Box, Container, Divider, Typography } from "@mui/material";

import PreviewCommandsTextField from "src/components/Preview/PreviewCommandsTextField";
import PreviewEnvList from "src/components/Preview/PreviewEnvList";
import BuildingLog from "src/components/@shared/BuildingLog";
import { BorderBox } from "src/components/@shared";

import type { Project } from "src/components/ProjectList/ProjectCardList";
import type { GetServerSideProps } from "next";

type ProjectDetailPageProps = {
  project: Project;
};

function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const { installCommand, buildCommand, deployedUrl, envList, buildingLog } =
    project ?? {};

  return (
    <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
      <BorderBox sx={{ boxShadow: 24, p: 4 }}>
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <Box sx={{ width: "50%" }}>
            <Typography id="modal-title" variant="h6" component="h3">
              Preview
            </Typography>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box sx={{ ...IframeBoxStyle }}>
            <Box sx={{ ...IframeStyle }}>
              <iframe
                title="jaam-toast-preview"
                src={`https://${deployedUrl as string}`}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                sandbox="allow-scripts"
                loading="eager"
                frameBorder="0"
              />
            </Box>
          </Box>
          <Typography id="preview-url" variant="h6" component="h4">
            {`https://${deployedUrl as string}`}
          </Typography>
          <PreviewCommandsTextField
            installCommand={installCommand}
            buildCommand={buildCommand}
          />
          <PreviewEnvList envsList={envList} />
          <BuildingLog buildingLog={buildingLog} />
        </Box>
      </BorderBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<
  ProjectDetailPageProps
> = async () => {
  // TODO: fetch project id.
  const project = {
    space: "mock data",
    repoName: "mock data",
    deployedUrl: "mock data",
    lastCommitMessage: "mock data",
    repoUpdatedAt: "mock data",
  };

  return {
    props: {
      project,
    },
  };
};

const IframeBoxStyle = {
  position: "relative",
  width: "100%",
  height: 0,
  paddingBottom: "56.25%",
};

const IframeStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  left: 0,
  top: 0,
};

export default ProjectDetailPage;
