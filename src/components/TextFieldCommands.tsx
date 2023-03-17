import { Box, Typography } from "@mui/material";

import { Form, TextField } from "./@shared";

type ITextFieldCommands = {
  installCommand: string | undefined;
  buildCommand: string | undefined;
};

function TextFieldCommands({
  installCommand,
  buildCommand,
}: ITextFieldCommands) {
  return (
    <Box display="flex" sx={{ flexDirection: "row" }}>
      <Box sx={{ width: "50%" }}>
        <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
          Install Command
        </Typography>
        <Box sx={{ width: "90%", marginTop: 1.5 }}>
          <Form>
            <TextField
              value={installCommand || ""}
              placeholder="`npm install`"
              disabled={true}
            />
          </Form>
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
          <Form>
            <TextField
              value={buildCommand || ""}
              placeholder="`npm run build`"
              disabled={true}
            />
          </Form>
        </Box>
      </Box>
    </Box>
  );
}

export default TextFieldCommands;
