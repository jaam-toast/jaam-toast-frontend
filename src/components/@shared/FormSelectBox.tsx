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

interface Mode {
  [index: string]: MenuItemOption;
  spaceChange: MenuItemOption;
  repoChange: MenuItemOption;
  buildTypeChange: MenuItemOption;
}

type MenuItemOption = {
  key: string;
  value: string;
  text: string;
};

const Mode: Mode = {
  spaceChange: {
    key: "spaceName",
    value: "spaceUrl",
    text: "spaceName",
  },
  repoChange: {
    key: "repoName",
    value: "repoCloneUrl",
    text: "repoName",
  },
  nodeVersionChange: {
    key: "version",
    value: "version",
    text: "versionText",
  },
  buildTypeChange: {
    key: "type",
    value: "type",
    text: "type",
  },
};

interface Prop {
  label: string;
  userId?: string;
  type: EventHandlerType;
  datas: GitNamespace[] | Repo[] | NodeVersion[] | BuildType[];
}

function FormSelectBox({ label, userId, type, datas, ...props }: Prop) {
  const [inputValue, setInputValue] = useState<string>("");
  const eventHandler = useDeployEventHandler(type, userId);

  const { key, value, text } = Mode[type];

  const handleChange = (e: SelectChangeEvent) => {
    if (eventHandler) eventHandler(e);

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
                key={`${data[key]}`}
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
