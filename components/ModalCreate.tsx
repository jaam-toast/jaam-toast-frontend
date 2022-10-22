import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import useModal from "../lib/hooks/useModal";

function ModalCreate() {
  const { showModal } = useModal();
  const [organization, setOrganization] = useState("");
  const [repository, setRepository] = useState("");

  const isButtonNext = () => {
    return organization !== "" && repository !== "";
  };

  const handleClickModalBuild = () => {
    showModal({
      modalType: "ModalBuild",
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setOrganization(event.target.value);
  };
  const handleSecondChange = (event: SelectChangeEvent) => {
    setRepository(event.target.value);
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
        <Typography id="modal-title" variant="h6" component="h3">
          Create Site
        </Typography>
        {isButtonNext() ? (
          <Button
            variant="contained"
            sx={{
              m: 1,
              bgcolor: "#000",
              ":hover": {
                bgcolor: "#FFF",
                color: "#000",
              },
            }}
            onClick={handleClickModalBuild}
          >
            Next
          </Button>
        ) : null}
      </Box>
      <Box display="flex" sx={{ flexDirection: "row" }}>
        <Box sx={{ width: "50%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            Organization
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="select-label" sx={{ fontSize: "small" }}>
                Organization
              </InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={organization}
                label="Organization"
                sx={{ fontSize: "small" }}
                onChange={handleChange}
              >
                <MenuItem value={0} sx={{ fontSize: "small" }}>
                  Room-Planet
                </MenuItem>
                <MenuItem value={1} sx={{ fontSize: "small" }}>
                  Bumper-Dosi
                </MenuItem>
                <MenuItem value={2} sx={{ fontSize: "small" }}>
                  Design-Pattern
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography
            id="modal-description"
            variant="body2"
            sx={{ mt: 2, marginLeft: 2 }}
          >
            Repository
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5, marginLeft: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="select-label" sx={{ fontSize: "small" }}>
                Repository
              </InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={repository}
                label="Repository"
                sx={{ fontSize: "small" }}
                onChange={handleSecondChange}
              >
                <MenuItem value={3} sx={{ fontSize: "small" }}>
                  Room-Planet
                </MenuItem>
                <MenuItem value={4} sx={{ fontSize: "small" }}>
                  Bumper-Dosi
                </MenuItem>
                <MenuItem value={5} sx={{ fontSize: "small" }}>
                  Design-Pattern
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
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

export default ModalCreate;
