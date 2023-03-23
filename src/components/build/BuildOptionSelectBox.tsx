import { useState } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { Box } from "@mui/system";

import { Form } from "../@shared";
import useDeployEventHandler from "src/hooks/useDeployEventHandler";

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
  datas: GitNamespace[] | Repo[] | NodeVersion[] | BuildType[] | string[];
  userId?: string;
  handleOptionClick?: () => Promise<void>;
}

const MenuItemPropTypes: Record<EventHandlerForSelect, MenuItemProp> = {
  spaceChange: { value: "spaceUrl", text: "spaceName" },
  nodeVersionChange: { value: "version", text: "versionText" },
  buildTypeChange: { value: "type", text: "type" },
};

function BuildOptionSelectBox({
  type,
  label,
  datas,
  ...props
}: BuildOptionSelectBoxProps) {
  const [inputValue, setInputValue] = useState<string>("");
  // const eventHandler = useDeployEventHandler(type, userId) as (
  //   e: SelectChangeEvent,
  // ) => void;

  const { value, text } = MenuItemPropTypes[type];
  // const defaultValue = datas[0][text];

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    // eventHandler(e as SelectChangeEvent);

    setInputValue(e.target.value as string);
  };

  return (
    <Box>
      <Form label={label}>
        <Select
          // renderValue={() => firstDataText || }
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

export default BuildOptionSelectBox;
