import { ButtonProps, Button as ButtonMui } from "@mui/material";

function Button({ ...props }: ButtonProps) {
  return (
    <ButtonMui variant="contained" {...props}>
      {props.children}
    </ButtonMui>
  );
}

export default Button;
