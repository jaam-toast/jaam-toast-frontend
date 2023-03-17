import { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";

import TextFieldCommands from "./TextFieldCommands";
import AccordionEnvs from "./AccordionEnvs";
import AccordionBuildingLog from "./AccordionBuildingLog";

import type { UserDeploymentData } from "../types/deployment";
import type { Env } from "../types/projectOption";

interface IUserDeploymentData {
  previewData: UserDeploymentData;
}

function ModalPreview({ ...modalProps }: IUserDeploymentData) {
  const [envs, setEnvs] = useState<Env[]>(modalProps.previewData?.envList);

  // TODO ModalPreview 페이지 진입 전에 modalProps.previewData 없을 경우 대응 추가

  const {
    previewData: {
      buildingLog: curBuildingLog,
      installCommand,
      buildCommand,
      deployedUrl,
    },
  } = modalProps;

  return (
    <Box sx={WrapperBoxStyle}>
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
      <a
        href={`https://${deployedUrl as string}`}
        style={{ color: "#03336a", textDecoration: "none" }}
        target="_blank"
        rel="noreferrer"
      >
        <Typography id="preview-url" variant="h6" component="h4">
          {`https://${deployedUrl as string}`}
        </Typography>
      </a>
      <TextFieldCommands
        installCommand={installCommand}
        buildCommand={buildCommand}
      />
      <AccordionEnvs envs={envs} setEnvs={setEnvs} />
      <AccordionBuildingLog buildingLog={curBuildingLog || []} />
    </Box>
  );
}

const WrapperBoxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "85vh",
  width: "70vw",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
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

export default ModalPreview;
