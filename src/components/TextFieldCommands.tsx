import { Box, FormControl, Typography } from "@mui/material";

import TextField from "./@shared/TextField";

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
          <FormControl size="small" fullWidth>
            <TextField
              value={installCommand}
              size="small"
              sx={{ fontSize: "small" }}
              placeholder="`npm install`"
              disabled
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
              value={buildCommand}
              size="small"
              sx={{ fontSize: "small" }}
              placeholder="`npm run build`"
              disabled
            />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default TextFieldCommands;
