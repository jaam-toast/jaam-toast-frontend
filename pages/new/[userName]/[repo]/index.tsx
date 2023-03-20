import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Accordion,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import {
  Button,
  BorderBox,
  CenterBox,
  FlexRowCenterBox,
} from "src/components/@shared";
import ButtonDeploy from "src/components/ButtonDeploy";
import BuildStepCard from "src/components/build/BuildStepCards";
import BuildOptionProjectName from "src/components/build/BuildOptionProjectName";
import BuildOptionSelectBox from "src/components/build/BuildOptionSelectBox";
import BuildOptionTextBox from "src/components/build/BuildOptionTextBox";
import BuildOptionEnvsField from "src/components/build/BuildOptionEnvsField";
import { buildOptionsState, buildStepState } from "src/lib/recoil/buildOptions";
import loginState from "src/lib/recoil/auth";

import { LoginData } from "types/auth";
import { BuildOptions } from "types/projectOption";

function BuildOption() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const buildOption = useRecoilValue<BuildOptions>(buildOptionsState);
  const setBuildStep = useSetRecoilState<number>(buildStepState);
  const router = useRouter();
  const userId = data._id;

  const isButtonNext = () => {
    return buildOption.nodeVersion !== "" && buildOption.buildType !== "";
  };

  const handleClickPrev = () => {
    setBuildStep(1);
    router.back();
  };

  return (
    <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
      <>
        <Box>
          <Typography id="modal-title" variant="h4" component="h3">
            You're almost done.
          </Typography>
          <Typography id="modal-title" variant="body2" gutterBottom>
            Please follow the steps to configure your Project and deploy it.
          </Typography>
        </Box>
        <BuildStepCard />
        <CenterBox>
          <BorderBox sx={{ boxShadow: 24, p: 4 }}>
            <Box sx={{ width: "100%", maxWidth: 800 }}>
              <FlexRowCenterBox>
                <Button color="light" onClick={handleClickPrev}>
                  Prev
                </Button>
                {isButtonNext() ? <ButtonDeploy userId={userId} /> : null}
              </FlexRowCenterBox>
              <BuildOptionProjectName />
              <Box sx={{ width: "100%" }}>
                <Typography
                  id="modal-description"
                  variant="body2"
                  sx={{ mt: 2 }}
                >
                  Node Version *
                </Typography>
                <Box sx={{ marginTop: 1.5 }}>
                  <BuildOptionSelectBox
                    label="Node Version"
                    type="nodeVersionChange"
                    datas={[
                      { version: "14.x", versionText: "Node.js 14.x" },
                      { version: "16.x", versionText: "Node.js 16.x" },
                    ]}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography
                    id="modal-description"
                    variant="body2"
                    sx={{ mt: 2 }}
                  >
                    CRA / Next Options *
                  </Typography>
                  <Box sx={{ marginTop: 1.5 }}>
                    <BuildOptionSelectBox
                      label="CRA / Next.js"
                      type="buildTypeChange"
                      datas={[
                        { type: "Create React App - SPA" },
                        { type: "Next.js App - SSR" },
                      ]}
                    />
                  </Box>
                </Box>
              </Box>
              <Box display="flex" sx={{ flexDirection: "row" }}>
                <BuildOptionTextBox
                  title="Install Command"
                  type="installCommandChange"
                  placeholder="`npm install`"
                  sx={{ width: "100%" }}
                />
              </Box>
              <Divider sx={{ mt: 2 }} />
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography id="modal-description" variant="body2">
                    Environment Variable
                  </Typography>
                </AccordionSummary>
                <Divider />
                <BuildOptionEnvsField />
              </Accordion>
            </Box>
          </BorderBox>
        </CenterBox>
      </>
    </Container>
  );
}

export default BuildOption;
