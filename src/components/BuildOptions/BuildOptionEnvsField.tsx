import { useState } from "react";

import {
  useBuildOptions,
  useSetBuildOptions,
} from "src/hooks/useBuildOptionsStore";
import { BLACK, GREY } from "src/config/colors";

import type { ChangeEvent, KeyboardEvent } from "react";
import { TextField } from "../@shared";

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
    <div>
      <div>
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEnvKey(e.target.value)
          }
          onKeyDown={handleEnvFieldKeyPress}
          placeholder="Key"
          value={envKey}
        />
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEnvValue(e.target.value)
          }
          onKeyDown={handleEnvFieldKeyPress}
          placeholder="Value"
          value={envValue}
        />
        <button onClick={handleAddEnv}>
          {/* <AddIcon
            sx={{
              padding: "0",
              color: GREY,
              ":hover": {
                color: BLACK,
              },
            }}
          /> */}
        </button>
      </div>

      {envList.length > 0 && "divider"}

      {envList
        .slice()
        .reverse()
        .map((env, idx, arr) => (
          <div key={`${env.key}-${idx}`}>
            <TextField value={env.key} disabled />
            <TextField value={env.value} disabled />
            {/* <IconButton onClick={() => handleRemoveEnv(arr.length - idx - 1)}>
              <RemoveIcon
                sx={{
                  padding: "0",
                  color: GREY,
                  ":hover": {
                    color: BLACK,
                  },
                }}
              />
            </IconButton> */}
          </div>
        ))}
    </div>
  );
}

export default BuildOptionEnvsField;
