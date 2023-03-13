import { Box, FormControl, IconButton, TextField } from "@mui/material";
import { Remove as RemoveIcon } from "@mui/icons-material";

import { EnvsState } from "../types";

function TextFieldSaved({ envIndex, envsState }: EnvsState) {
  const { envs, setEnvs } = envsState;

  const handleClickEnvRemove = (curIndex: number) => {
    setEnvs(prevEnvs => prevEnvs.filter((_, index) => index !== curIndex));
  };

  return (
    <Box display="flex" sx={{ flexDirection: "row", width: "100%" }}>
      <Box sx={{ width: "40%" }}>
        <FormControl size="small" fullWidth>
          <TextField
            id="outlined-basic"
            label="Key"
            variant="outlined"
            size="small"
            autoComplete="off"
            inputProps={{ sx: { fontSize: "small" } }}
            InputLabelProps={{ sx: { fontSize: "small" } }}
            style={{ color: "#333" }}
            value={envs[envIndex].key}
            disabled
          />
        </FormControl>
      </Box>
      <Box sx={{ width: "55%", marginLeft: 2 }}>
        <FormControl size="small" fullWidth>
          <TextField
            id="outlined-basic"
            label="Value"
            variant="outlined"
            size="small"
            autoComplete="off"
            inputProps={{ sx: { fontSize: "small" } }}
            InputLabelProps={{ sx: { fontSize: "small" } }}
            style={{ color: "#333" }}
            value={envs[envIndex].value}
            disabled
          />
        </FormControl>
      </Box>
      <IconButton
        sx={{
          padding: "0",
          marginLeft: "1",
          color: "#808080",
          ":hover": {
            color: "#000",
          },
        }}
        onClick={() => handleClickEnvRemove(envIndex)}
      >
        <RemoveIcon />
      </IconButton>
    </Box>
  );
}

export default TextFieldSaved;
