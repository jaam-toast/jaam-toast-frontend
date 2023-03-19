import { Box } from "@mui/material";

import { Form, TextField } from "./@shared";

import { EnvsState } from "types/projectOption";

function TextFieldPreview({ envIndex, envsState }: EnvsState) {
  const { envs, setEnvs } = envsState;

  return (
    <Box display="flex" sx={{ flexDirection: "row", width: "100%" }}>
      <Box sx={{ width: "50%" }}>
        <Form>
          <TextField
            label="Key"
            InputProps={{ sx: { fontSize: "small" } }}
            InputLabelProps={{ sx: { fontSize: "small" } }}
            style={{ color: "#333" }}
            value={envs[envIndex].key}
            disabled
          />
        </Form>
      </Box>
      <Box sx={{ width: "50%", marginLeft: 2 }}>
        <Form>
          <TextField
            label="Value"
            InputProps={{ sx: { fontSize: "small" } }}
            InputLabelProps={{ sx: { fontSize: "small" } }}
            style={{ color: "#333" }}
            value={envs[envIndex].value}
            disabled
          />
        </Form>
      </Box>
    </Box>
  );
}

export default TextFieldPreview;
