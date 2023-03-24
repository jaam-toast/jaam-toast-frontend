import { useState } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { Box } from "@mui/system";

import { Form } from "../@shared";

type SelectBoxProps = SelectProps & {
  label: string;
  options: string[];
  handleOptionClick: (option: string) => void;
};

function SelectBox({
  label,
  options,
  handleOptionClick,
  ...props
}: SelectBoxProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const selection = e.target.value as string;
    handleOptionClick(selection);
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
          {options?.map((option: string) => (
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
