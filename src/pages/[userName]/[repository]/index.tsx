import { useRecoilValue } from "recoil";
import { Box, Container, Divider, Typography } from "@mui/material";

import PreviewCommandsTextField from "src/components/preview/PreviewCommandsTextField";
import PreviewEnvList from "src/components/preview/PreviewEnvList";
import BuildingLog from "src/components/build/BuildingLog";
import { BorderBox } from "src/components/@shared";
import { selectedProject } from "src/recoil/userDeployments";
import { Project } from "src/components/ProjectList";
import { GetServerSideProps } from "next";

type ProjectDashBoardProps = {
  project: Project;
};

function ProjectDashBoard({ project }: ProjectDashBoardProps) {
  // const currentProject = useRecoilValue(selectedProject);
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

export const getServerSideProps: GetServerSideProps<any> = async () => {
  return {
    props: {},
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

export default ProjectDashBoard;
