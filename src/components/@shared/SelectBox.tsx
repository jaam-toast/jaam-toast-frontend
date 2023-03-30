import { useState } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { Box } from "@mui/system";

import { Form } from ".";

type SelectBoxProps<T> = SelectProps & {
  label: string;
  options: T[];
  onSelectionChange: (option: T) => void;
  defaultSelect?: T;
};

function SelectBox<T>({
  label,
  options,
  onSelectionChange,
  defaultSelect,
  ...props
}: SelectBoxProps<T>) {
  const [inputValue, setInputValue] = useState<T | null>(defaultSelect ?? null);

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const selection = e.target.value as T;
    onSelectionChange(selection);
    setInputValue(selection);
  };

  return (
    <Box>
      <Form label={label}>
        <Select
          labelId="select-label"
          id="select"
          sx={{
            fontSize: "small",
            width: "100%",
          }}
          label={label}
          value={inputValue}
          onChange={handleChange}
          {...props}
        >
          {options?.map((option: T) => (
            <MenuItem key={option} value={option} sx={{ fontSize: "small" }}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Form>
    </Box>
  );
}

export default SelectBox;
