import { useState } from "react";

import {
  useBuildOptions,
  useSetBuildOptions,
} from "../BuildOptionSelect/useBuildOptionsStore";
import { TextField } from "./";
import isEmpty from "../utils/isEmpty";
import * as css from "./EnvField.css";

import type { ChangeEvent, KeyboardEvent } from "react";

export function EnvField() {
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
      {!isEmpty(envList) && (
        <ul className={css.envList}>
          {envList.map((env, idx, arr) => (
            <li key={`${env.key}-${idx}`} className={css.addEnvSection}>
              <p className={css.envKey}>{env.key}</p>
              <p className={css.envValue}>{env.value}</p>
              <button
                onClick={() => handleRemoveEnv(idx)}
                className={css.removeEnvButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={css.addEnvSection}>
        <div className={css.addEnvKey}>
          <TextField
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEnvKey(e.target.value)
            }
            onKeyDown={handleEnvFieldKeyPress}
            placeholder="Key"
            value={envKey}
          />
        </div>
        <div className={css.addEnvValue}>
          <TextField
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEnvValue(e.target.value)
            }
            onKeyDown={handleEnvFieldKeyPress}
            placeholder="Value"
            value={envValue}
          />

          <button onClick={handleAddEnv} className={css.addEnvButton}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
