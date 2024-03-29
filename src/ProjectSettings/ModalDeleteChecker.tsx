import { useState } from "react";
import { TextField } from "../@shared";
import { useDeleteProjectMutaion, useModal } from "../@hooks";
import * as css from "./ModalDeleteChecker.css";

export function ModalDeleteChecker({ projectName }: { projectName: string }) {
  const [userCode, setUserCode] = useState<string>("");
  const { closeModal } = useModal();
  const deleteProject = useDeleteProjectMutaion();

  const handleCancelClick = () => {
    closeModal();
  };

  const handleDeleteClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userCode !== `delete ${projectName}`) {
      return;
    }

    deleteProject.mutate(projectName);
  };

  return (
    <div className={css.container}>
      <header className={css.sectionHeader}>
        <h2>Delete Project</h2>
      </header>
      <div className={css.wrapper}>
        <p className={css.sectionDescription}>
          Deleting the project results in permanent loss and cannot be
          recovered.
        </p>
        <form className={css.sectionForm} onSubmit={handleDeleteClick}>
          <label className={css.sectionLabel}>
            Please enter{" "}
            <span className={css.sectionLabelPoint}>delete {projectName}</span>
          </label>
          <TextField
            pattern={`delete ${projectName}`}
            required
            onTextFieldChange={setUserCode}
          />
          <div className={css.buttonWrapper}>
            <button type="submit" className={css.sectionDeleteButton}>
              Delete
            </button>
            <button
              onClick={handleCancelClick}
              className={css.sectionCancelButton}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
