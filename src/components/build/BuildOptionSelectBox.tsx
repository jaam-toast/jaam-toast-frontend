import { useState } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { Box } from "@mui/system";

import { Form } from "../@shared";

import {
  GitNamespace,
  NodeVersion,
  Repo,
  BuildType,
  EventHandlerForSelect,
} from "types/projectOption";

interface MenuItemProp {
  value: string;
  text: string;
}

interface BuildOptionSelectBoxProps extends SelectProps {
  type: EventHandlerForSelect;
  label?: string;
  options: GitNamespace[] | Repo[] | NodeVersion[] | BuildType[] | string[];
  userId?: string;
  handleOptionClick?: (option: string) => void;
}

const MenuItemPropTypes: Record<EventHandlerForSelect, MenuItemProp> = {
  spaceChange: { value: "spaceUrl", text: "spaceName" },
  nodeVersionChange: { value: "version", text: "versionText" },
  buildTypeChange: { value: "type", text: "type" },
};

function BuildOptionSelectBox({
  type,
  label,
  options,
  handleOptionClick,
  ...props
}: BuildOptionSelectBoxProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const { value, text } = MenuItemPropTypes[type];

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    setInputValue(e.target.value as string);
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
          {options &&
            options.map((data: any) => (
              <MenuItem
                key={`${data[value]}`}
                value={`${data[value]}`}
                sx={{ fontSize: "small" }}
              >
                {`${data[text]}`}
              </MenuItem>
            ))}
        </Select>
      </Form>
    </Box>
  );
}

export default BuildOptionSelectBox;
