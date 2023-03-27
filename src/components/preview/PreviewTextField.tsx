import { Box } from "@mui/material";

import { Form, TextField } from "../@shared";
import { BLACK } from "src/constants/colors";
import { Env } from "types/build";

type PreviewTextFieldProps = {
  envIndex: number;
  envsList: Env[];
};

function PreviewTextField({ envIndex, envsList }: PreviewTextFieldProps) {
  return (
    <Box display="flex" sx={{ flexDirection: "row", width: "100%" }}>
      <Box sx={{ width: "50%" }}>
        <Form>
          <TextField
            label="Key"
            InputProps={{ sx: { fontSize: "small" } }}
            InputLabelProps={{ sx: { fontSize: "small" } }}
            style={{ color: BLACK }}
            value={envsList[envIndex].key}
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
            style={{ color: BLACK }}
            value={envsList[envIndex].value}
            disabled
          />
        </Form>
      </Box>
    </Box>
  );
}

export default PreviewTextField;
