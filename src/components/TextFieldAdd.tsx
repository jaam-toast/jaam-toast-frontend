import { ChangeEvent, useState } from "react";
import { Box, FormControl, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import TextField from "./@shared/TextField";

import { EnvsState } from "../types";

function TextFieldAdd({ envsState }: EnvsState) {
  const { envs, setEnvs } = envsState;
  const [curEnvKey, setCurEnvKey] = useState<string>("");
  const [curEnvValue, setCurEnvValue] = useState<string>("");

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
    const newEnv = {
      key: curEnvKey,
      value: curEnvValue,
    };

    setEnvs(prevEnvs => [...prevEnvs, newEnv]);
    setCurEnvKey("");
    setCurEnvValue("");
  };

  return (
    <Box display="flex" sx={{ flexDirection: "row", width: "100%" }}>
      <Box sx={{ width: "40%" }}>
        <FormControl size="small" fullWidth>
          <TextField
            label="Key"
            size="small"
            inputProps={{ sx: { fontSize: "small" } }}
            InputLabelProps={{ sx: { fontSize: "small" } }}
            value={curEnvKey}
            placeholder="EXAMPLE_KEY"
            onChange={handleKeyChange}
          />
        </FormControl>
      </Box>
      <Box sx={{ width: "55%", marginLeft: 2 }}>
        <FormControl size="small" fullWidth>
          <TextField
            label="Value"
            size="small"
            inputProps={{ sx: { fontSize: "small" } }}
            InputLabelProps={{ sx: { fontSize: "small" } }}
            value={curEnvValue}
            placeholder="fd1c1c36245869e5c0bb0d"
            onChange={handleValueChange}
          />
        </FormControl>
      </Box>
      <IconButton
        sx={{
          padding: "0",
          marginLeft: "1",
          color: "#808080",
          ":hover": {
            color: "#000",
          },
        }}
        onClick={handleClickEnvAdd}
        disabled={!curEnvKey || !curEnvValue}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default TextFieldAdd;
