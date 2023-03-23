import { useState } from "react";
import { useRouter } from "next/router";
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

import type { BuildOptions } from "types/projectOption";

type BuildOptionProps = {
  defaultSubDomain: string;
};

function BuildOption({ defaultSubDomain }: BuildOptionProps) {
  const router = useRouter();

  const [buildOptions, setBuildOptions] = useState<BuildOptions>({
    subDomain: defaultSubDomain,
    nodeVersion: null,
    envList: [],
  });

  const handleClickPrev = () => {
    router.back();
  };

  const handleClickDeploy = async () => {
    const { userName, repo } = router.query;

    // setBuildStep(3);
    router.push(`/new/${userName}/${repo}/deploy`);

    try {
      // const userDeploymentData = await runDeploy();
      // if (!userDeploymentData) throw new Error("error");
      // setDeploymentList(prev => [...prev, userDeploymentData]);
    } catch (err) {
      //TODO error 토스트
    }
  };

  const isButtonNext =
    buildOptions.nodeVersion !== null && buildOptions.buildType !== "";

  // TODO: fetch default domain & check duplication check logic.
  return (
    <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
      <Box>
        <Typography id="modal-title" variant="h4" component="h3">
          You're almost done.
        </Typography>
        <Typography id="modal-title" variant="body2" gutterBottom>
          Please follow the steps to configure your Project and deploy it.
        </Typography>
      </Box>
      <BuildStepCard step={2} />
      <CenterBox>
        <BorderBox sx={{ boxShadow: 24, p: 4 }}>
          <Box sx={{ width: "100%", maxWidth: 800 }}>
            <FlexRowCenterBox>
              <Button color="light" onClick={handleClickPrev}>
                Prev
              </Button>
              {isButtonNext && <ButtonDeploy />}
            </FlexRowCenterBox>
            <BuildOptionProjectName />
            <Box sx={{ width: "100%" }}>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Node Version *
              </Typography>
              <Box sx={{ marginTop: 1.5 }}>
                <BuildOptionSelectBox
                  label="Node Version"
                  type="nodeVersionChange"
                  options={[
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
                    options={[
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
            <Box display="flex" sx={{ flexDirection: "row" }}>
              <BuildOptionTextBox
                title="Build Command"
                type="installCommandChange"
                placeholder="`npm start`"
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
    </Container>
  );
}

export default BuildOption;
