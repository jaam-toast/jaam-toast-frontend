import { useRecoilValue } from "recoil";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import Button from "./@shared/Button";
import FormSelectBox from "./@shared/FormSelectBox";
import FormTextBox from "./@shared/FormTextBox";
import TextFieldAdd from "./TextFieldAdd";
import TextFieldSaved from "./TextFieldSaved";
import useModal from "../lib/hooks/useModal";
import useDeployEventHandler from "src/lib/hooks/useDeployEventHandler";
import loginState from "../lib/recoil/auth";
import buildOptionState from "src/lib/recoil/userBuildOptions";

import { BuildOption, LoginData } from "../types";

function ModalBuild() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const buildOption = useRecoilValue<BuildOption>(buildOptionState);

  const { showModal } = useModal();

  const userId = data._id;
  const handleClickModalDeploy = useDeployEventHandler("deployClick", userId);

  const isButtonNext = () => {
    return buildOption.nodeVersion !== "" && buildOption.buildType !== "";
  };

  const handleClickModalCreate = () => {
    showModal({
      modalType: "ModalCreate",
    });
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
            onClick={handleClickModalDeploy as () => Promise<void>}
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
            {buildOption?.envs.map((env, index) => (
              <Box
                key={`${env.key}-${index}`}
                display="flex"
                sx={{ flexDirection: "row", marginBottom: 1.5 }}
              >
                <TextFieldSaved envIndex={index} envsState={buildOption.envs} />
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
