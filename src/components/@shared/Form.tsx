import { ReactNode } from "react";
import { FormControl, InputLabel } from "@mui/material";

function Form({ children, label }: { children: ReactNode; label?: string }) {
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
