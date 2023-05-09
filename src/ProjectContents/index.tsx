import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SelectBox, CheckDeleteBox } from "../@shared";
import {
  useCheckboxState,
  useDeleteContentsMutation,
  useProjectQuery,
  useSetConfirmModal,
} from "../@hooks";
import { ContentsList, ContentsListSkeleton } from "./ContentsList";
import * as css from "./index.css";

import type { SortMode, OrderMode } from "../@types/cms";
import { ValidationError } from "../@utils/createError";
import { AsyncBoundary } from "../Error/AsyncBoundary";

export function ProjectContents() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<SortMode>("createdAt");
  const [orderOption, setOrderOption] = useState<OrderMode>("ascending");
  const { values: checkboxValues } = useCheckboxState();
  const [currentSchemaName, setCurrentSchemaName] = useState<string>("");
  const { openConfirm } = useSetConfirmModal();

  if (!projectName) {
    throw new ValidationError("projectName not found");
  }

  const { data: project } = useProjectQuery(projectName);

  // TODO error handling
  if (!project) {
    throw new ValidationError("project data not found");
  }

  const token = project.storageKey;
  const schemaList = project.schemaList;

  useEffect(() => {
    setCurrentSchemaName(schemaList[0].schemaName);
  }, []);

  // TODO 삭제시 체크 해제 스토어에 반영
  const deleteContents = useDeleteContentsMutation({
    onSuccess: () => {
      alert("Success contents delete");
    },
    onError: () => {
      alert("Failed to delete contents. Please try again.");
    },
  });

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
                    schemaList?.map(data => data.schemaName) || ["Preset"]
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
