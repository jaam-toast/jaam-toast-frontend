import { useState } from "react";
import { Container, Divider, IconButton, TextField } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Box } from "@mui/system";

import {
  useBuildOptions,
  useSetBuildOptions,
} from "src/hooks/useBuildOptionsStore";
import { BLACK, GREY } from "src/theme/colors";

import type { ChangeEvent, KeyboardEvent } from "react";

function BuildOptionEnvsField() {
  const [envKey, setEnvKey] = useState<string>("");
  const [envValue, setEnvValue] = useState<string>("");
  const { envList } = useBuildOptions();
  const setEnv = useSetBuildOptions()("envList");

  const handleAddEnv = () => {
    if (!envKey || !envValue) {
      return;
    }
    // TODO
    setEnv(prev =>
      prev.concat({
        key: envKey,
        value: envValue,
      }),
    );
    setEnvKey("");
    setEnvValue("");
  };

  const handleRemoveEnv = (envIdx: number) => {
    setEnv(prev => prev.filter((env, idx) => idx !== envIdx));
  };

  const handleEnvFieldKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    handleAddEnv();
  };

  return (
    <Container disableGutters>
      <Box
        display="flex"
        sx={{ flexDirection: "row", marginBottom: 1.5, gap: "0.5rem" }}
      >
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEnvKey(e.target.value)
          }
          onKeyDown={handleEnvFieldKeyPress}
          placeholder="Key"
          value={envKey}
          size="small"
          sx={{ fontSize: "small", width: "100%", marginTop: 1.5 }}
        />
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEnvValue(e.target.value)
          }
          onKeyDown={handleEnvFieldKeyPress}
          placeholder="Value"
          value={envValue}
          size="small"
          sx={{ fontSize: "small", width: "100%", marginTop: 1.5 }}
        />
        <IconButton onClick={handleAddEnv} sx={{ marginTop: 1 }}>
          <AddIcon
            sx={{
              padding: "0",
              color: GREY,
              ":hover": {
                color: BLACK,
              },
            }}
          />
        </IconButton>
      </Box>

      {envList.length > 0 && <Divider sx={{ margin: "1rem 0" }} />}

      {envList
        .slice()
        .reverse()
        .map((env, idx, arr) => (
          <Box
            key={`${env.key}-${idx}`}
            display="flex"
            sx={{ flexDirection: "row", marginBottom: 1.5, gap: "0.5rem" }}
          >
            <TextField
              value={env.key}
              size="small"
              disabled
              sx={{ fontSize: "small", width: "100%", marginTop: 0.5 }}
            />
            <TextField
              value={env.value}
              size="small"
              disabled
              sx={{ fontSize: "small", width: "100%", marginTop: 0.5 }}
            />
            <IconButton onClick={() => handleRemoveEnv(arr.length - idx - 1)}>
              <RemoveIcon
                sx={{
                  padding: "0",
                  color: GREY,
                  ":hover": {
                    color: BLACK,
                  },
                }}
              />
            </IconButton>
          </Box>
        ))}
    </Container>
  );
}

export default BuildOptionEnvsField;
