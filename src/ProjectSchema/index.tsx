import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

import { TextField, SelectBox } from "../@shared";
import { useModal, useCheckboxState, useSetConfirmModal } from "../@hooks";
import { NotFoundError } from "../@utils/createError";
import { ModalNewSchema } from "./ModalNewSchema";
import { SchemaList, SchemaListSkeleton } from "./SchemaList";
import { useDeleteSchemaMutation } from "../@hooks/useSchemaMutation";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import { ModalSchemaInfoSkeleton } from "./ModalSchemaInfo";
import * as css from "./index.css";

import type { OrderMode } from "../@types/cms";

export function ProjectSchema() {
  const { projectName } = useParams();
  const [searchword, setSearchword] = useState<string>("");
  const [orderMode, setOrderMode] = useState<OrderMode>("ascending");
  const { values: checkboxValues } = useCheckboxState();
  const { openModal } = useModal();
  const { openConfirm } = useSetConfirmModal();

  if (!projectName) {
    throw new NotFoundError("projectName not found");
  }

  const deleteSchema = useDeleteSchemaMutation();

  const handleAddClick = () => {
    openModal({
      component: (
        <AsyncBoundary suspenseFallback={<ModalSchemaInfoSkeleton />}>
          <ModalNewSchema projectName={projectName} />
        </AsyncBoundary>
      ),
      location: "right",
      animation: "slideToLeft",
    });
  };

  const handleDeleteClick = (schemaNames: string[]) => {
    if (schemaNames.includes("assets")) {
      return toast.error("You cannot delete the assets schema.");
    }

    openConfirm({
      message: "Do you want to delete the field?",
      onConfirm: () => deleteSchema.mutate({ projectName, schemaNames }),
    });
  };

  return (
    <div className={css.container}>
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
              onClick={() => handleDeleteClick([...checkboxValues])}
              className={css.optionIcon}
            />
          </div>
        )}
      </div>
      <AsyncBoundary suspenseFallback={<SchemaListSkeleton />}>
        <SchemaList
          projectName={projectName}
          orderOption={orderMode}
          searchword={searchword}
          onDelete={handleDeleteClick}
        />
      </AsyncBoundary>
    </div>
  );
}
