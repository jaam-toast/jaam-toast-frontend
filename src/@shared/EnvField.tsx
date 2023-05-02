import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";

import {
  useBuildOptions,
  useSetBuildOptions,
} from "../@hooks/useBuildOptionsStore";
import { TextField } from "./";
import * as css from "./EnvField.css";

import type { KeyboardEvent } from "react";
import { Env } from "../@types/build";

type EnvFieldProps = {
  envs?: Env[];
};

export function EnvField({ envs }: EnvFieldProps) {
  const [envKey, setEnvKey] = useState<string>("");
  const [envValue, setEnvValue] = useState<string>("");
  const { envList } = useBuildOptions();
  const setEnv = useSetBuildOptions()("envList");

  useEffect(() => {
    if (!envs) {
      return;
    }

    setEnv(envs);
  }, []);

  const handleAddEnv = () => {
    if (!envKey || !envValue) {
      return;
    }

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
            onTextFieldChange={(key: string) => setEnvKey(key)}
            onKeyDown={handleEnvFieldKeyPress}
            placeholder="Key"
            value={envKey}
            key={envKey}
          />
        </div>
        <div className={css.addEnvValue}>
          <TextField
            onTextFieldChange={(value: string) => setEnvValue(value)}
            onKeyDown={handleEnvFieldKeyPress}
            placeholder="Value"
            value={envValue}
            key={envValue}
          />

          <button onClick={handleAddEnv} className={css.addEnvButton}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
