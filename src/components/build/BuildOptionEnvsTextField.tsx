import { ChangeEvent, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { Form } from "../@shared";
import useDeployEventHandler from "src/hooks/useDeployEventHandler";
import { BLACK, GREY } from "src/constants/colors";

function BuildOptionEnvsTextField() {
  const [curEnvKey, setCurEnvKey] = useState<string>("");
  const [curEnvValue, setCurEnvValue] = useState<string>("");
  const addEnvClick = useDeployEventHandler("addEnvClick") as (
    key: string,
    value: string,
  ) => void;

  const handleKeyChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const targetKey = e.target.value;

    setCurEnvKey(targetKey.trim());
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const targetValue = e.target.value;

    setCurEnvValue(targetValue.trim());
  };

  const handleClickEnvAdd = () => {
    addEnvClick(curEnvKey, curEnvValue);

    setCurEnvKey("");
    setCurEnvValue("");
  };

  return (
    <Box display="flex" sx={{ flexDirection: "row", marginBottom: 1 }}>
      <Box display="flex" sx={{ flexDirection: "row", width: "100%" }}>
        <Box sx={{ width: "40%" }}>
          <Form>
            <TextField
              label="Key"
              placeholder="EXAMPLE_KEY"
              value={curEnvKey}
              onChange={handleKeyChange}
              InputProps={{ sx: { fontSize: "small" } }}
              InputLabelProps={{ sx: { fontSize: "small" } }}
              size="small"
              sx={{ fontSize: "small" }}
            />
          </Form>
        </Box>
        <Box sx={{ width: "55%", marginLeft: 2 }}>
          <Form>
            <TextField
              label="Value"
              placeholder="fd1c1c36245869e5c0bb0d"
              value={curEnvValue}
              onChange={handleValueChange}
              InputProps={{ sx: { fontSize: "small" } }}
              InputLabelProps={{ sx: { fontSize: "small" } }}
              size="small"
              sx={{ fontSize: "small" }}
            />
          </Form>
        </Box>
        <IconButton
          sx={{
            padding: "0",
            marginLeft: "1",
            color: GREY,
            ":hover": {
              color: BLACK,
            },
          }}
          onClick={handleClickEnvAdd}
          disabled={!curEnvKey || !curEnvValue}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default BuildOptionEnvsTextField;
