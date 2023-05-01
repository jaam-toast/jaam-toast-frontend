import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

import { Modal, TextField, SelectBox } from "../@shared";
import { useModal, useCheckboxState } from "../@hooks";
import { ModalNewSchema } from "./ModalNewSchema";
import { useDeleteSchemaMutation } from "../@hooks/useSchemaMutation";
import * as css from "./index.css";

import type { OrderMode } from "../@types/cms";
import { SchemaList } from "./SchemaList";

export function ProjectSchema() {
  const params = useParams();
  const { projectName } = params;
  const [searchword, setSearchword] = useState<string>("");
  const [orderMode, setOrderMode] = useState<OrderMode>("ascending");
  const { values: checkboxValues, isAllChecked } = useCheckboxState();
  const { openModal } = useModal();

  if (!projectName) {
    return <Navigate to="/error" />;
  }

  const deleteSchema = useDeleteSchemaMutation({
    onSuccess: () => {
      alert("Success schema delete");
    },
    onError: () => {
      alert("Failed to delete schema. Please try again.");
    },
  });

  const handleAddClick = () => {
    openModal({
      component: <ModalNewSchema projectName={projectName} />,
      location: "right",
      animation: "slideToLeft",
    });
  };

  const handleDelete = ({ schemaNames }: { schemaNames: string[] }) => {
    if (window.confirm("Do you want to delete the field?")) {
      deleteSchema.mutate({ projectName, schemaNames });
    }
  };

  return (
    <div className={css.container}>
      <Modal />
      <header className={css.header}>
        <button onClick={handleAddClick} className={css.newButton}>
          + New Schema
        </button>
      </header>
      <div className={css.inputContainer}>
        {checkboxValues.size === 0 ? (
          <>
            <TextField
              onTextFieldChange={setSearchword}
              placeholder="Search.."
            />
            <div className={css.orderInputBox}>
              <SelectBox
                options={["ascending", "descending"]}
                defaultSelect={"ascending"}
                onSelectionChange={setOrderMode}
                label={"Order"}
              />
            </div>
          </>
        ) : (
          <div className={css.selectOptionField}>
            <div>{`${checkboxValues.size} selected`}</div>
            <BsFillTrashFill
              onClick={() => handleDelete({ schemaNames: [...checkboxValues] })}
              className={css.optionIcon}
            />
          </div>
        )}
      </div>
      <SchemaList
        projectName={projectName}
        orderOption={orderMode}
        searchword={searchword}
        onDelete={handleDelete}
      />
    </div>
  );
}
