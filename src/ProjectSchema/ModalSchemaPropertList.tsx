import { useEffect, useState } from "react";

import { PropertyList } from "./PropertyList";
import { FieldTitle } from "./FieldTitle";
import { PropertyEditor } from "./PropertyEditor";
import { useUpdateSchemaMutation } from "./useSchemaMutation";
import {
  useCurrentEditProperty,
  useSchemaState,
  useSetSchemaState,
} from "./useSchemaStore";
import { TypeIcon, useModal } from "../@shared";
import * as css from "./ModalSchemaPropertList.css";

import type { JsonSchema } from "@jaam-schema/src/index";

export function ModalSchemaPropertList({
  currentSchema,
  projectName,
}: {
  currentSchema: JsonSchema;
  projectName: string;
}) {
  const [isFieldEditMode, setIsFieldEditMode] = useState<boolean>(false);
  const [isClickTypeIcon, setIsClickTypeIcon] = useState<boolean>(false);

  const {
    setSchema,
    setCurrentEditProperty,
    addProperty,
    editProperty,
    deleteProperty,
    reset,
  } = useSetSchemaState();
  const schema = useSchemaState();
  const currentEditProperty = useCurrentEditProperty();
  const { setCloseHandler: setHandlerTriggeredModalClose } = useModal();

  useEffect(() => {
    setSchema(currentSchema);
    setHandlerTriggeredModalClose(reset);
  }, []);

  const updateSchema = useUpdateSchemaMutation({
    onSuccess: () => {
      alert("Success schema update");
    },
    onError: () => {
      alert("Failed to create schema. Please try again.");
    },
  });

  const deleteSchema = useUpdateSchemaMutation({
    onSuccess: () => {
      alert("Success schema delete");
    },
    onError: () => {
      alert("Failed to delete schema. Please try again.");
    },
  });

  // TODO 해당 스키마에 해당되는 콘텐츠 있는지 체크

  const handleChangePropertyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEditProperty({
      type: "update",
      updateData: { ...currentEditProperty, name: e.target.value },
    });
  };

  const handleClickAdd = () => {
    if (!currentEditProperty.name) {
      alert("The name field must not be empty.");
    }

    addProperty();
    setIsFieldEditMode(false);
    setCurrentEditProperty({ type: "reset" });
    setIsClickTypeIcon(false);
  };

  const handleClickEditIcon = ({ propertyName }: { propertyName: string }) => {
    setCurrentEditProperty({ type: "set", propertyName });
    setIsFieldEditMode(true);
  };

  const handleClickEdit = () => {
    if (!currentEditProperty.name) {
      alert("The name field must not be empty.");
    }

    editProperty();
    setIsFieldEditMode(false);
    setCurrentEditProperty({ type: "reset" });
  };

  const handleClickUpdate = () => {
    const { title, type, properties } = schema;

    if (!title || !type || !Object.keys(properties).length) {
      return;
    }

    updateSchema.mutate({ projectName, schemaName: title });
  };

  const handleClickDelete = ({ propertyName }: { propertyName: string }) => {
    deleteProperty({ propertyName });
    deleteSchema.mutate({ projectName, schemaName: schema.title });
  };

  return (
    <section className={css.container}>
      <header className={css.header}>
        <div className={css.headerFirstLine}>
          <h3>
            Schema
            <span className={css.schemaName}> {schema.title}</span>
          </h3>
        </div>
        <p className={css.fieldSubText}>{schema.description || ""}</p>
      </header>
      {isFieldEditMode && (
        <section className={css.fieldNameSection}>
          <div className={css.fieldNameWrapper}>
            <input
              className={css.fieldNameInput}
              value={currentEditProperty?.name || ""}
              onChange={handleChangePropertyName}
            />
            <div
              className={css.typeButton}
              onClick={() => setIsClickTypeIcon(!isClickTypeIcon)}
            >
              <TypeIcon
                size="small"
                type={currentEditProperty?.options?.type || "text"}
              />
            </div>
            {isFieldEditMode ? (
              <button onClick={handleClickEdit} className={css.addButton}>
                Edit
              </button>
            ) : (
              <button
                onClick={
                  currentEditProperty.warningMessage ? () => {} : handleClickAdd
                }
                className={css.addButton}
              >
                Add
              </button>
            )}
          </div>
          <p className={css.warningMessage}>
            {currentEditProperty.warningMessage}
          </p>
        </section>
      )}
      <div className={css.wrapper}>
        {isFieldEditMode || isClickTypeIcon ? (
          <PropertyEditor />
        ) : (
          <section>
            <FieldTitle>Field List</FieldTitle>
            <div className={css.fieldList}>
              <PropertyList
                propertyList={schema.properties}
                editHandler={handleClickEditIcon}
                deleteHandler={({ propertyName }: { propertyName: string }) =>
                  handleClickDelete({ propertyName })
                }
              />
            </div>
          </section>
        )}
      </div>
      <footer className={css.footer}>
        <button onClick={handleClickUpdate} className={css.saveButton}>
          Update
        </button>
        {(isFieldEditMode || isClickTypeIcon) && (
          <button
            onClick={() => {
              setIsClickTypeIcon(false);
              setIsFieldEditMode(false);
              setCurrentEditProperty({ type: "reset" });
            }}
            className={css.saveButton}
          >
            Prev
          </button>
        )}
      </footer>
    </section>
  );
}
