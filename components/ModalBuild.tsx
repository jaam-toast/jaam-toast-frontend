/* eslint-disable react/no-array-index-key */
import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import RemoveIcon from "@mui/icons-material/Remove";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import TextFieldAdd from "./TextFieldAdd";
import useModal from "../lib/hooks/useModal";

type Env = {
  key: string;
  value: string;
};

function ModalBuild() {
  const { showModal } = useModal();
  const [version, setVersion] = useState<string>("");
  const [install, setInstall] = useState<string>("");
  const [build, setBuild] = useState<string>("");
  const [envs, setEnvs] = useState<Env[]>([{ key: "", value: "" }]);

  const isButtonNext = () => {
    return version !== "" && install !== "" && build !== "";
  };

  const handleClickModalCreate = () => {
    showModal({
      modalType: "ModalCreate",
    });
  };

  const handleClickModalDeploy = () => {
    showModal({
      modalType: "ModalDeploy",
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value);
  };

  const handleClickEnvAdd = () => {
    const newEnv = {
      key: "",
      value: "",
    };

    setEnvs(prevEnvs => [...prevEnvs, newEnv]);
  };

  const handleClickEnvRemove = (envIndex: number) => {
    setEnvs(prevEnvs => prevEnvs.filter((_, index) => index !== envIndex));
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
      <Box sx={{ width: "50%" }}>
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
              onChange={handleChange}
            >
              <MenuItem value={0} sx={{ fontSize: "small" }}>
                Node.js 17.0.0
              </MenuItem>
              <MenuItem value={1} sx={{ fontSize: "small" }}>
                Node.js 16.18.0
              </MenuItem>
              <MenuItem value={2} sx={{ fontSize: "small" }}>
                Node.js 16.17.1
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box display="flex" sx={{ flexDirection: "row" }}>
        <Box sx={{ width: "50%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            Install Command *
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
            Build Command *
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
            Environment Varialbe
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ mt: 1 }}>
          <>
            {envs.map((env, index) => (
              <Box key={index} display="flex" sx={{ flexDirection: "row" }}>
                <TextFieldAdd />
                {index === 0 ? (
                  <IconButton
                    sx={{
                      padding: "0",
                      marginLeft: "1",
                      color: "#808080",
                      ":hover": {
                        color: "#000",
                      },
                    }}
                    onClick={handleClickEnvAdd}
                  >
                    <AddIcon />
                  </IconButton>
                ) : null}
                {index !== 0 ? (
                  <IconButton
                    sx={{
                      padding: "0",
                      marginLeft: "1",
                      color: "#808080",
                      ":hover": {
                        color: "#000",
                      },
                    }}
                    onClick={() => handleClickEnvRemove(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                ) : null}
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
