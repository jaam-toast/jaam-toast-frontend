import { ButtonProps, Button as ButtonMui } from "@mui/material";

function Button({ ...props }: ButtonProps) {
  return (
    <ButtonMui
      variant="contained"
      {...props}
      sx={{ borderRadius: "50px", ...props.sx }}
    >
      {props.children}
    </ButtonMui>
  );
}

export default Button;
