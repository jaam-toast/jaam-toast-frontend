import { useState } from "react";

import { TextField } from "../@shared";
import { useProjectQuery, usePutProjectMutaion } from "../@hooks";
import { ValidationError } from "../@utils/createError";
import * as css from "./index.css";

import type { PutProjectOptions } from "../@types/api";

export function CommandSectionList({ projectName }: { projectName: string }) {
  const [buildCommand, setBuildCommand] = useState<string>("");
  const [installCommand, setInstallCommand] = useState<string>("");
  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new ValidationError("projectName not found");
  }

  const updateCommand = usePutProjectMutaion();

  const handleSaveClick = (
    data: Partial<Pick<PutProjectOptions, "buildCommand" | "installCommand">>,
  ) => {
    if (!data || (!data.buildCommand && !data.installCommand)) {
      // TODO toast
      alert("Command data not found.");
    }
    // TODO error handle
    try {
      updateCommand.mutateAsync({ projectName, option: data });
    } catch (error) {}
  };

  return (
    <>
      <section className={css.settingOptionSection}>
        <div className={css.sectionHead}>
          <span className={css.sectionTitle}>Build Command</span>
          <button
            onClick={() => handleSaveClick({ buildCommand })}
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
            onClick={() => handleSaveClick({ installCommand })}
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
