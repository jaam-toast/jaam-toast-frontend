import { TextField as TextFieldMui } from "@mui/material";
import { TextFieldProps } from "@mui/material";

function TextField({ ...props }: TextFieldProps) {
  return (
    <TextFieldMui
      id="outlined-basic"
      variant="outlined"
      autoComplete="off"
      {...props}
    />
  );
}

export default TextField;
