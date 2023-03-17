import { ReactNode } from "react";
import { FormControl, InputLabel } from "@mui/material";

interface FormProps {
  children: ReactNode;
  label?: string;
}

function Form({ children, label }: FormProps) {
  return (
    <FormControl size="small" fullWidth>
      {label && (
        <InputLabel id="select-label" sx={{ fontSize: "small" }}>
          {label}
        </InputLabel>
      )}
      {children}
    </FormControl>
  );
}

export default Form;
