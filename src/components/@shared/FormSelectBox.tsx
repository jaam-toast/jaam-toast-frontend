import { useState } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";

import Form from "./Form";
import useDeployEventHandler from "../../lib/hooks/useDeployEventHandler";

import {
  GitNamespace,
  NodeVersion,
  Repo,
  BuildType,
  EventHandlerForSelect,
} from "../../types/projectOption";

interface MenuItemProp {
  value: string;
  text: string;
}

interface FormSelectBoxProps {
  type: EventHandlerForSelect;
  label: string;
  datas: GitNamespace[] | Repo[] | NodeVersion[] | BuildType[];
  userId?: string;
}

const MenuItemPropTypes: Record<EventHandlerForSelect, MenuItemProp> = {
  spaceChange: { value: "spaceUrl", text: "spaceName" },
  repoChange: { value: "repoCloneUrl", text: "repoName" },
  nodeVersionChange: { value: "version", text: "versionText" },
  buildTypeChange: { value: "type", text: "type" },
};

function FormSelectBox({
  type,
  label,
  datas,
  userId,
  ...props
}: FormSelectBoxProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const eventHandler = useDeployEventHandler(type, userId) as (
    e: SelectChangeEvent,
  ) => void;

  const { value, text } = MenuItemPropTypes[type];

  const handleChange = (e: SelectChangeEvent) => {
    eventHandler(e);

    setInputValue(e.target.value);
  };

  return (
    <Box>
      <Form label={label}>
        <Select
          labelId="select-label"
          id="select"
          sx={{ fontSize: "small" }}
          label={label}
          value={inputValue}
          onChange={handleChange}
          {...props}
        >
          {datas &&
            datas.map((data: any) => (
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

export default FormSelectBox;
