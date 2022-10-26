import { useState } from "react";

// import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function ModalBuild() {
  const [version, setVersion] = useState("");
  // const [repository, setRepository] = useState("");

  const isButtonNext = () => {
    return version !== ""; // && repository !== ""
  };

  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value);
  };
  // const handleSecondChange = (event: SelectChangeEvent) => {
  //   setRepository(event.target.value);
  // };

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
            m: 1,
            bgcolor: "#FFF",
            color: "#000",
            ":hover": {
              bgcolor: "#000",
              color: "#FFF",
            },
          }}
        >
          Prev
        </Button>
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
          >
            Next
          </Button>
        ) : null}
      </Box>
      <Box sx={{ width: "50%" }}>
        <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
          Node Version
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
      {/* <Box display="flex" sx={{ flexDirection: "column" }}> */}
      <Box display="flex" sx={{ flexDirection: "row" }}>
        <Box sx={{ width: "50%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            Install Command
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormControl size="small" fullWidth>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                autoComplete="false"
                sx={{ fontSize: "small" }}
              />
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography
            id="modal-description"
            variant="body2"
            sx={{ mt: 2, marginLeft: 2 }}
          >
            Build Command
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5, marginLeft: 2 }}>
            <FormControl size="small" fullWidth>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                autoComplete="false"
                sx={{ fontSize: "small" }}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
      {/* </Box> */}
      {/* <Box display="flex" sx={{ flexDirection: "column" }}> */}
      <Box display="flex" sx={{ flexDirection: "row" }}>
        <Box sx={{ width: "40%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            Environment Variable
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormControl size="small" fullWidth>
              <TextField
                id="outlined-basic"
                label="Key"
                variant="outlined"
                size="small"
                autoComplete="false"
                sx={{ fontSize: "small" }}
              />
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ width: "50%", marginTop: 4.5 }}>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormControl size="small" fullWidth>
              <TextField
                id="outlined-basic"
                label="Value"
                variant="outlined"
                size="small"
                autoComplete="false"
                sx={{ fontSize: "small" }}
              />
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

export default ModalBuild;
