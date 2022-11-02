import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

function TextFieldAdd() {
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
          />
        </FormControl>
      </Box>
    </Box>
  );
}

export default TextFieldAdd;
