import { Box, IconButton } from "@mui/material";
import { Remove as RemoveIcon } from "@mui/icons-material";

import Form from "./@shared/Form";
import TextField from "./@shared/TextField";
import useDeployEventHandler from "../lib/hooks/useDeployEventHandler";

import { Env } from "../types/projectOption";

function TextFieldSaved({ envIndex, envsState }: EnvsState) {
  const handleRemoveEnvClick = useDeployEventHandler("removeEnvClick") as (
    curIndex: number,
  ) => void;

  return (
    <Box display="flex" sx={{ flexDirection: "row", width: "100%" }}>
      <Box sx={{ width: "40%" }}>
        <Form>
          <TextField
            label="Key"
            InputProps={{ sx: { fontSize: "small" } }}
            InputLabelProps={{ sx: { fontSize: "small" } }}
            style={{ color: "#333" }}
            value={envsState[envIndex].key}
            disabled
          />
        </Form>
      </Box>
      <Box sx={{ width: "55%", marginLeft: 2 }}>
        <Form>
          <TextField
            label="Value"
            InputProps={{ sx: { fontSize: "small" } }}
            InputLabelProps={{ sx: { fontSize: "small" } }}
            style={{ color: "#333" }}
            value={envsState[envIndex].value}
            disabled
          />
        </Form>
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
        onClick={() => handleRemoveEnvClick(envIndex)}
      >
        <RemoveIcon />
      </IconButton>
    </Box>
  );
}

export default TextFieldSaved;
