import { TextField as TextFieldMui } from "@mui/material";
import { TextFieldProps } from "@mui/material";

function TextField({ ...props }: TextFieldProps) {
  return (
    <TextFieldMui
      id="outlined-basic"
      variant="outlined"
      autoComplete="off"
      size="small"
      sx={{ fontSize: "small" }}
      {...props}
    />
  );
}

export default TextField;
