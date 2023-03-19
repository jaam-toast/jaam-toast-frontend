import { useRecoilValue } from "recoil";
import { Box, Container, Typography } from "@mui/material";

import { BorderBox, CenterBox, FlexRowCenterBox } from "src/components/@shared";
import BuildingLog from "src/components/build/BuildingLog";
import PreviewCommandsTextField from "src/components/preview/PreviewCommandsTextField";
import PreviewEnvList from "src/components/preview/PreviewEnvList";

import userDeploymentsState from "lib/recoil/userDeployments";

import test from "../../../../test.json";

function Preview() {
  const deploymentData = useRecoilValue(userDeploymentsState);

  // * test mock 데이터 적용 (위 deploymentData로 바꾸면 됨)
  const deploymentDataTest = test;

  const {
    buildingLog: curBuildingLog,
    envList,
    installCommand,
    buildCommand,
    deployedUrl,
  } = deploymentDataTest[deploymentDataTest.length - 1];

  return (
    <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
      <>
        <Box>
          <Typography id="modal-title" variant="h4" component="h3">
            Congratulations!
          </Typography>
          <Typography id="modal-title" variant="body2" gutterBottom>
            You just deployed a new Project to Vercel.
          </Typography>
        </Box>
        <CenterBox>
          <BorderBox sx={{ boxShadow: 24, p: 4 }}>
            <Box sx={{ width: "100%", maxWidth: 800 }}>
              <FlexRowCenterBox>
                <Box>
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
                  <PreviewCommandsTextField
                    installCommand={installCommand}
                    buildCommand={buildCommand}
                  />
                  <PreviewEnvList envsList={envList} />
                  <BuildingLog buildingLog={curBuildingLog || []} />
                </Box>
              </FlexRowCenterBox>
            </Box>
          </BorderBox>
        </CenterBox>
      </>
    </Container>
  );
}

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

export default Preview;
