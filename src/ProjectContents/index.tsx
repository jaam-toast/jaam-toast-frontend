import { useMemo, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Modal, SelectBox } from "../@shared";
import {
  useProjectQuery,
  useCheckboxState,
  useDeleteContentsMutation,
} from "../@hooks";
import { ContentsList } from "./ContentsList";
import * as css from "./index.css";

import type { SortMode, OrderMode } from "../@types/cms";

export function ProjectContents() {
  const params = useParams();
  const navigate = useNavigate();
  const { projectName } = params;
  const [sortOption, setSortOption] = useState<SortMode>("createdAt");
  const [orderOption, setOrderOption] = useState<OrderMode>("ascending");
  const [currentSchemaIndex, setCurrentSchemaIndex] = useState<number>(0);
  const { values: checkboxValues } = useCheckboxState();

  if (!projectName) {
    return <Navigate to="/error" />;
  }

  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    return <Navigate to="/error" />;
  }

  const { schemaList, storageKey: token } = project;
  const schema = useMemo(
    () => (schemaList.length ? schemaList[currentSchemaIndex] : null),
    [currentSchemaIndex],
  );

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

  const handleDelete = ({ contentIds }: { contentIds: string[] }) => {
    if (window.confirm("Do you want to delete the field?")) {
      deleteContents.mutate({
        token,
        schemaName: schemaList[currentSchemaIndex].schemaName,
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
              <SelectBox
                options={schemaList?.map(data => data.schemaName) || ["Preset"]}
                defaultSelect={
                  !!schemaList.length
                    ? schemaList[currentSchemaIndex].schemaName
                    : "Preset"
                }
                onSelectionChange={(_, index) => {
                  setCurrentSchemaIndex(index);
                }}
                label={"Schema"}
              />
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
          <div className={css.selectOptionField}>
            <div>{`${checkboxValues.size} selected`}</div>
            <BsFillTrashFill
              onClick={() => handleDelete({ contentIds: [...checkboxValues] })}
              className={css.optionIcon}
            />
          </div>
        )}
      </div>
      <ContentsList
        schemaName={schema && schema.schemaName}
        token={token}
        orderOption={orderOption}
        sortOption={sortOption}
      />
    </div>
  );
}
