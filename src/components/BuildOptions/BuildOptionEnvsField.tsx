import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Container, Divider, IconButton, TextField } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Box } from "@mui/system";

import { BLACK, GREY } from "src/constants/colors";

import type { Env } from "types/build";

type BuildOptionEnvsFieldProps = {
  defaultEnvs?: Env[];
  onEnvsChange: (envs: Env[]) => void;
};

function BuildOptionEnvsField({
  defaultEnvs = [],
  onEnvsChange,
}: BuildOptionEnvsFieldProps) {
  const [envKey, setEnvKey] = useState<string>("");
  const [envValue, setEnvValue] = useState<string>("");
  const [envs, setEnvs] = useState<Env[]>(defaultEnvs);

  const handleAddEnv = () => {
    if (!envKey || !envValue) {
      return;
    }

    const newEnvs = envs.concat({ key: envKey, value: envValue });

    setEnvs(newEnvs);
    onEnvsChange(newEnvs);
    setEnvKey("");
    setEnvValue("");
  };

  const handleEnvFieldKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    handleAddEnv();
  };

  const handleRemoveEnv = (envIdx: number) => {
    const newEnvs = envs.filter((env: Env, idx: number) => idx !== envIdx);

    setEnvs(newEnvs);
    onEnvsChange(newEnvs);
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

      {envs.length > 0 && <Divider sx={{ margin: "1rem 0" }} />}

      {envs
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
