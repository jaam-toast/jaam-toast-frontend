import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { SelectBox, CheckDeleteBox } from "../@shared";
import {
  useCheckboxState,
  useDeleteContentsMutation,
  useProjectQuery,
  useSetConfirmModal,
  useSetContentsState,
} from "../@hooks";
import { NotFoundError } from "../@utils/createError";
import { ERROR } from "../@config/message";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import { ContentsList, ContentsListSkeleton } from "./ContentsList";
import * as css from "./index.css";

import type { SortMode, OrderMode } from "../@types/cms";

export function ProjectContents() {
  const { userName, projectName } = useParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<SortMode>("createdAt");
  const [orderOption, setOrderOption] = useState<OrderMode>("ascending");
  const { setIsContentChanged, reset } = useSetContentsState();
  const { values: checkboxValues } = useCheckboxState();
  const { openConfirm } = useSetConfirmModal();
  const deleteContents = useDeleteContentsMutation();

  if (!userName || !projectName) {
    throw new NotFoundError(ERROR.NOT_FOUND.ALL);
  }

  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_DATA);
  }

  const token = project.storageKey;
  const schemaList = project.schemaList.filter(
    schema => schema.schemaName !== "assets",
  );

  const [currentSchemaName, setCurrentSchemaName] = useState<string>(
    schemaList[0]?.schemaName,
  );

  const handleAddClick = () => {
    if (!schemaList.length) {
      navigate(`/${userName}/${projectName}/schema`);

      return toast.error(
        "No schema has been created, please create a schema first.",
      );
    }
    navigate("new");
  };

  const handleDeleteClick = (contentIds: string[]) => {
    openConfirm({
      message: "Do you want to delete the field?",
      onConfirm: async () => {
        await deleteContents.mutateAsync({
          token,
          schemaName: currentSchemaName,
          contentIds,
        });
        setIsContentChanged();
        reset();
      },
    });
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <button onClick={handleAddClick} className={css.newButton}>
          + New Contents
        </button>
      </header>
      <div className={css.inputContainer}>
        {checkboxValues.size === 0 ? (
          <>
            <div className={css.schemaInputBox}>
              <div className={css.schemaInputBox}>
                <SelectBox
                  options={
                    schemaList.length
                      ? schemaList.map(data => data.schemaName)
                      : ["Preset"]
                  }
                  defaultSelect={
                    schemaList && !!schemaList.length
                      ? schemaList[0].schemaName
                      : "Preset"
                  }
                  onSelectionChange={setCurrentSchemaName}
                  label={"Schema"}
                />
              </div>
            </div>
            <div className={css.sortOrderInputWrapper}>
              <div className={css.sortOrderInputBox}>
                <SelectBox
                  options={["createdAt", "updatedAt"]}
                  defaultSelect={"createdAt"}
                  onSelectionChange={setSortOption}
                  label={"Sort"}
                />
              </div>
              <div className={css.sortOrderInputBox}>
                <SelectBox
                  options={["ascending", "descending"]}
                  defaultSelect={"ascending"}
                  onSelectionChange={setOrderOption}
                  label={"Order"}
                />
              </div>
            </div>
          </>
        ) : (
          <CheckDeleteBox onDelete={handleDeleteClick} />
        )}
      </div>
      <AsyncBoundary suspenseFallback={<ContentsListSkeleton />}>
        <ContentsList
          token={token}
          schemaName={currentSchemaName}
          projectName={projectName}
          orderOption={orderOption}
          sortOption={sortOption}
        />
      </AsyncBoundary>
    </div>
  );
}
