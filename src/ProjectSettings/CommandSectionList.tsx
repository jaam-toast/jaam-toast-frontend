import { useState } from "react";

import { TextField } from "../@shared";
import {
  useBuildOptions,
  useProjectQuery,
  useSetBuildOptions,
  useUpdateBuildOptionMutation,
} from "../@hooks";
import { ERROR } from "../@config/message";
import { NotFoundError } from "../@utils/createError";
import * as css from "./index.css";

import type { BuildOptions } from "../@types/build";

export function CommandSectionList({ projectName }: { projectName: string }) {
  const [warningMessage, setWarningMessage] = useState({
    buildCommand: "",
    installCommand: "",
  });
  const setBuildOptions = useSetBuildOptions();
  const { buildCommand, installCommand } = useBuildOptions();
  const { data: project } = useProjectQuery(projectName);
  const updateCommand = useUpdateBuildOptionMutation();

  if (!project) {
    throw new NotFoundError(ERROR.NOT_FOUND.PARAMETER);
  }

  const handleSaveClick = async <
    CommandOption extends keyof Pick<
      BuildOptions,
      "installCommand" | "buildCommand"
    >,
  >(
    option: Pick<BuildOptions, CommandOption>,
  ) => {
    if (!option) {
      return;
    }

    if (
      "installCommand" in option &&
      installCommand !== "npm install" &&
      installCommand != "yarn"
    ) {
      setWarningMessage(prev => ({
        ...prev,
        installCommand: "It should be either `npm install` or `yarn`.",
      }));

      return;
    }

    setWarningMessage({
      buildCommand: "",
      installCommand: "",
    });

    updateCommand.mutate({
      projectName,
      option: option,
    });
  };

  return (
    <>
      <section className={css.commandOptionSection}>
        <div className={css.sectionHead}>
          <span className={css.sectionTitle}>Build Command</span>
          <button
            disabled={!buildCommand}
            onClick={() =>
              handleSaveClick<"buildCommand">({
                buildCommand: buildCommand ?? "",
              })
            }
            className={css.saveButton}
          >
            save
          </button>
        </div>
        <p
          className={
            warningMessage.buildCommand ? css.warningMessage : css.baseMessage
          }
        >
          {warningMessage.buildCommand}
        </p>
        <TextField
          delay={300}
          onTextFieldChange={setBuildOptions("buildCommand")}
          placeholder={project.buildCommand}
        />
      </section>
      <section className={css.commandOptionSection}>
        <div className={css.sectionHead}>
          <span className={css.sectionTitle}>Install Command</span>
          <button
            disabled={!installCommand}
            onClick={() =>
              handleSaveClick<"installCommand">({
                installCommand: installCommand ?? "",
              })
            }
            className={css.saveButton}
          >
            save
          </button>
        </div>
        <p
          className={
            warningMessage.installCommand ? css.warningMessage : css.baseMessage
          }
        >
          {warningMessage.installCommand}
        </p>
        <TextField
          delay={300}
          onTextFieldChange={setBuildOptions("installCommand")}
          placeholder={project.installCommand}
        />
      </section>
    </>
  );
}
