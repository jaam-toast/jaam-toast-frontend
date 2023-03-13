import { Box, FormControl, TextField } from "@mui/material";

import { EnvsState } from "../types";

function TextFieldPreview({ envIndex, envsState }: EnvsState) {
  const { envs, setEnvs } = envsState;

  return (
    <Box display="flex" sx={{ flexDirection: "row", width: "100%" }}>
      <Box sx={{ width: "50%" }}>
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
      <Box sx={{ width: "50%", marginLeft: 2 }}>
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
    </Box>
  );
}

export default TextFieldPreview;
