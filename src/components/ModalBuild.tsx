import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import { Button, FormSelectBox, FormTextBox } from "./@shared";
import TextFieldAdd from "./TextFieldAdd";
import TextFieldSaved from "./TextFieldSaved";
import loginState from "lib/recoil/auth";
import { cloneUrlState } from "lib/recoil/git";
import buildOptionsState from "lib/recoil/userBuildOptions";
import useModal from "lib/hooks/useModal";
import useDeployEventHandler from "lib/hooks/useDeployEventHandler";

import { LoginData } from "types/auth";
import { BuildOptions } from "types/projectOption";
import { UserDeploymentData } from "types/deployment";

function ModalBuild() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const buildOption = useRecoilValue<BuildOptions>(buildOptionsState);
  const resetBuildOptions = useResetRecoilState(buildOptionsState);
  const resetCloneUrl = useResetRecoilState(cloneUrlState);
  const [timer, setTimer] = useState<number>(0);
  const { showModal } = useModal();
  const userId = data._id;
  const runDeploy = useDeployEventHandler(
    "deployClick",
    userId,
  ) as () => Promise<UserDeploymentData | undefined>;

  useEffect(() => {
    if (!timer) return;

    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  const isButtonNext = () => {
    return buildOption.nodeVersion !== "" && buildOption.buildType !== "";
  };

  const handleClickModalCreate = () => {
    resetBuildOptions();
    resetCloneUrl();
    showModal({
      modalType: "ModalCreate",
    });
  };

  const handleClickModalDeploy = async () => {
    showModal({
      modalType: "ModalDeploy",
    });

    const userDeploymentData = await runDeploy();

    // TODO userDeploymentData 데이터 없거나 에러났을 경우 대응 필요
    const timer = window.setTimeout(
      () =>
        showModal({
          modalType: "ModalPreview",
          modalProps: {
            previewData: userDeploymentData,
          },
        }),
      4000,
    );

    setTimer(timer);
  };

  return (
    <Box sx={style}>
      <Box
        display="flex"
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="light"
          onClick={handleClickModalCreate}
        >
          Prev
        </Button>
        {isButtonNext() ? (
          <Button
            variant="contained"
            color="light"
            onClick={handleClickModalDeploy}
          >
            Deploy
          </Button>
        ) : null}
      </Box>
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "100%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            Node Version *
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormSelectBox
              label="Node Version"
              type="nodeVersionChange"
              datas={[
                { version: "14.x", versionText: "Node.js 14.x" },
                { version: "16.x", versionText: "Node.js 16.x" },
              ]}
            />
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            CRA / Next Options *
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormSelectBox
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
        <Box sx={{ width: "50%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            Install Command
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormTextBox
              placeholder="`npm install`"
              type="installCommandChange"
            />
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography
            id="modal-description"
            variant="body2"
            sx={{ mt: 2, marginLeft: 3 }}
          >
            Build Command
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5, marginLeft: 3 }}>
            <FormTextBox
              placeholder="`npm run build`"
              type="buildCommandChange"
            />
          </Box>
        </Box>
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
        <AccordionDetails sx={{ mt: 1 }}>
          <>
            <TextFieldAdd />
            <Divider sx={{ marginTop: 2.5, marginBottom: 2.5 }} />
            {buildOption?.envList.map((env, index) => (
              <Box
                key={`${env.key}-${index}`}
                display="flex"
                sx={{ flexDirection: "row", marginBottom: 1.5 }}
              >
                <TextFieldSaved
                  envIndex={index}
                  envsState={buildOption.envList}
                />
              </Box>
            ))}
          </>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ModalBuild;
