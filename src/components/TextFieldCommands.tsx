import { Box, FormControl, TextField, Typography } from "@mui/material";

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
              id="outlined-basic"
              value={installCommand}
              variant="outlined"
              size="small"
              autoComplete="off"
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
              id="outlined-basic"
              value={buildCommand}
              variant="outlined"
              size="small"
              autoComplete="off"
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
