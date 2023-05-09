import { useState } from "react";

import { TextField } from "../@shared";
import { useProjectQuery, useUpdateBuildOptionMutation } from "../@hooks";
import { ValidationError } from "../@utils/createError";
import * as css from "./index.css";

import type {
  UpdateProjectBuildOption,
  UpdateProjectBuildOptions,
} from "../@types/api";

export function CommandSectionList({ projectName }: { projectName: string }) {
  const [buildCommand, setBuildCommand] = useState<string>("");
  const [installCommand, setInstallCommand] = useState<string>("");
  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new ValidationError("projectName not found");
  }

  const handleSaveClick = <
    T extends keyof Omit<UpdateProjectBuildOptions, "envList">,
  >(
    option: UpdateProjectBuildOption<T>,
  ) => {
    if (!option) {
      alert("Command data not found.");
      return;
    }
    // TODO error handle
    try {
      useUpdateBuildOptionMutation<T>().mutateAsync({
        projectName,
        option,
      });
    } catch (error) {}
  };

  return (
    <>
      <section className={css.settingOptionSection}>
        <div className={css.sectionHead}>
          <span className={css.sectionTitle}>Build Command</span>
          <button
            onClick={() => handleSaveClick<"buildCommand">({ buildCommand })}
            className={css.saveButton}
          >
            save
          </button>
        </div>
        <TextField
          onTextFieldChange={setBuildCommand}
          placeholder={project.buildCommand}
        />
      </section>
      <section className={css.settingOptionSection}>
        <div className={css.sectionHead}>
          <span className={css.sectionTitle}>Install Command</span>
          <button
            onClick={() =>
              handleSaveClick<"installCommand">({ installCommand })
            }
            className={css.saveButton}
          >
            save
          </button>
        </div>
        <TextField
          onTextFieldChange={setInstallCommand}
          placeholder={project.installCommand}
        />
      </section>
    </>
  );
}
