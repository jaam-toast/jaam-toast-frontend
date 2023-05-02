import { Suspense, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Modal, SelectBox } from "../@shared";
import {
  useCheckboxState,
  useDeleteContentsMutation,
  useProjectQuery,
} from "../@hooks";
import { ContentsList, ContentsListSkeleton } from "./ContentsList";
import { ContentsDeleteBox } from "./ContentsDeleteBox";
import * as css from "./index.css";

import type { SortMode, OrderMode } from "../@types/cms";

export function ProjectContents() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<SortMode>("createdAt");
  const [orderOption, setOrderOption] = useState<OrderMode>("ascending");
  const { values: checkboxValues } = useCheckboxState();
  const [currentSchemaName, setCurrentSchemaName] = useState<string>("");

  if (!projectName) {
    return <Navigate to="/error" />;
  }

  const { data: project } = useProjectQuery(projectName);

  // TODO error handling
  if (!project) {
    return <Navigate to="/error" state={{ code: 404, message: "" }} />;
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

  const handleDelete = ({
    contentIds,
    token,
  }: {
    contentIds: string[];
    token: string;
  }) => {
    if (window.confirm("Do you want to delete the field?")) {
      deleteContents.mutate({
        token,
        schemaName: currentSchemaName,
        contentIds,
      });
    }
  };

  return (
    <div className={css.container}>
      <Modal />
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
          <ContentsDeleteBox
            projectName={projectName}
            onDelete={handleDelete}
          />
        )}
      </div>
      <Suspense fallback={<ContentsListSkeleton />}>
        <ContentsList
          token={token}
          schemaName={currentSchemaName}
          projectName={projectName}
          orderOption={orderOption}
          sortOption={sortOption}
        />
      </Suspense>
    </div>
  );
}
