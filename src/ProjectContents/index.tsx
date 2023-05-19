import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SelectBox, CheckDeleteBox } from "../@shared";
import {
  useCheckboxState,
  useDeleteContentsMutation,
  useProjectQuery,
  useSetConfirmModal,
} from "../@hooks";
import { NotFoundError } from "../@utils/createError";
import { ERROR } from "../@config/message";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import { ContentsList, ContentsListSkeleton } from "./ContentsList";
import * as css from "./index.css";

import type { SortMode, OrderMode } from "../@types/cms";

export function ProjectContents() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<SortMode>("createdAt");
  const [orderOption, setOrderOption] = useState<OrderMode>("ascending");
  const { values: checkboxValues } = useCheckboxState();
  const { openConfirm } = useSetConfirmModal();
  const deleteContents = useDeleteContentsMutation();

  if (!projectName) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_NAME);
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
    schemaList[0].schemaName,
  );

  const handleAddClick = () => {
    navigate("new");
  };

  const handleDeleteClick = (contentIds: string[]) => {
    openConfirm({
      message: "Do you want to delete the field?",
      onConfirm: () =>
        deleteContents.mutate({
          token,
          schemaName: currentSchemaName,
          contentIds,
        }),
    });
  };

  // TODO preset 없애기
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
