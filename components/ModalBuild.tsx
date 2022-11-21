import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { setCookie } from "cookies-next";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { deployRepo } from "../lib/api";
import useModal from "../lib/hooks/useModal";

import TextFieldAdd from "./TextFieldAdd";
import TextFieldSaved from "./TextFieldSaved";

import loginState from "../lib/recoil/auth";
import cloneUrlState, { cloneRepoName } from "../lib/recoil/git/clone";

import { Env, LoginData, UserDeploymentData } from "../types";
import userDeploymentsState from "../lib/recoil/userDeployments";

function ModalBuild() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const repoCloneUrl = useRecoilValue<string>(cloneUrlState);
  const repoName = useRecoilValue<string>(cloneRepoName);
  const [deploymentList, setDeploymentList] =
    useRecoilState<UserDeploymentData[]>(userDeploymentsState);

  const [version, setVersion] = useState<string>("");
  const [buildType, setBulidType] = useState<string>("");
  const [install, setInstall] = useState<string>("");
  const [build, setBuild] = useState<string>("");
  const [envs, setEnvs] = useState<Env[]>([{ key: "", value: "" }]);
  const { showModal } = useModal();

  const userId = data._id;
  const envsState = {
    envs,
    setEnvs,
  };

  const isButtonNext = () => {
    return version !== "" && buildType !== "";
  };

  const handleClickModalCreate = () => {
    showModal({
      modalType: "ModalCreate",
    });
  };

  const handleClickModalDeploy = async () => {
    const filteredEnvs = envs.filter((_, i) => i !== 0);

    const dayTime = new Date().toISOString();
    const formattedTime = `${dayTime.split("T")[0]} ${
      dayTime.split("T")[1].split(".")[0]
    }`;

    const userBuildOptions = {
      userId,
      repoName,
      repoCloneUrl,
      repoUpdatedAt: formattedTime,
      nodeVersion: version,
      installCommand: install,
      buildCommand: build,
      envList: filteredEnvs,
      buildType,
      lastCommitMessage: "",
    };

    showModal({
      modalType: "ModalDeploy",
    });

    const { data: userDeploymentData } = await deployRepo(userBuildOptions);

    const filteredUserDeployData = userDeploymentData;
    filteredUserDeployData.buildingLog = [];

    setDeploymentList([...deploymentList, userDeploymentData]);
    setCookie(
      "userDeployments",
      JSON.stringify([...deploymentList, filteredUserDeployData]),
    );
  };

  const handleVersionChange = (e: SelectChangeEvent) => {
    const curNodeVersion = e.target.value;

    setVersion(curNodeVersion);
  };

  const handleBuildTypeChange = (e: SelectChangeEvent) => {
    const curBuildType = e.target.value;

    setBulidType(curBuildType);
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
          sx={{
            bgcolor: "#FFF",
            color: "#000",
            ":hover": {
              bgcolor: "#000",
              color: "#FFF",
            },
          }}
          onClick={handleClickModalCreate}
        >
          Prev
        </Button>
        {isButtonNext() ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#000",
              ":hover": {
                bgcolor: "#FFF",
                color: "#000",
              },
            }}
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
            <FormControl size="small" fullWidth>
              <InputLabel id="select-label" sx={{ fontSize: "small" }}>
                Node Version
              </InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={version}
                label="version"
                sx={{ fontSize: "small" }}
                autoFocus
                onChange={handleVersionChange}
              >
                <MenuItem value="14.x" sx={{ fontSize: "small" }}>
                  Node.js 14.x
                </MenuItem>
                <MenuItem value="16.x" sx={{ fontSize: "small" }}>
                  Node.js 16.x
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            SSR Options *
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="select-label" sx={{ fontSize: "small" }}>
                Is it SPA? or need SSR?
              </InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={buildType}
                label="version"
                sx={{ fontSize: "small" }}
                autoFocus
                onChange={handleBuildTypeChange}
              >
                <MenuItem value="It is a SPA" sx={{ fontSize: "small" }}>
                  It is a SPA
                </MenuItem>
                <MenuItem
                  value="It needs SSR support"
                  sx={{ fontSize: "small" }}
                >
                  It needs SSR support
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box display="flex" sx={{ flexDirection: "row" }}>
        <Box sx={{ width: "50%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            Install Command
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormControl size="small" fullWidth>
              <TextField
                id="outlined-basic"
                value={install}
                variant="outlined"
                size="small"
                autoComplete="off"
                sx={{ fontSize: "small" }}
                onChange={event => {
                  setInstall(event.target.value);
                }}
                placeholder="`npm install`"
              />
            </FormControl>
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
            <FormControl size="small" fullWidth>
              <TextField
                id="outlined-basic"
                value={build}
                variant="outlined"
                size="small"
                autoComplete="off"
                sx={{ fontSize: "small" }}
                onChange={event => {
                  setBuild(event.target.value);
                }}
                placeholder="`npm run build`"
              />
            </FormControl>
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
            <Box display="flex" sx={{ flexDirection: "row", marginBottom: 1 }}>
              <TextFieldAdd envIndex={0} envsState={envsState} />
            </Box>
            <Divider sx={{ marginTop: 2.5, marginBottom: 2.5 }} />
            {envs.map((env, index) =>
              index === 0 ? null : (
                <Box
                  key={`${env.key}-${index}`}
                  display="flex"
                  sx={{ flexDirection: "row", marginBottom: 1.5 }}
                >
                  <TextFieldSaved envIndex={index} envsState={envsState} />
                </Box>
              ),
            )}
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
