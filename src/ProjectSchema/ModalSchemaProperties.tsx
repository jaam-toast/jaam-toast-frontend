import { useEffect, useState } from "react";

import { SchemaProperties } from "./SchemaProperties";
import { FieldTitle } from "./FieldTitle";
import { FieldInput } from "./FieldInput";
import { PropertyEditor } from "./PropertyEditor";
import { useUpdateSchemaMutation } from "./useSchemaMutation";
import {
  useCurrentEditProperty,
  useSchemaState,
  useSetSchemaState,
} from "./useSchemaStore";
import * as css from "./ModalSchemaProperties.css";

import type { Schema } from "../@types/schema";

export function ModalSchemaProperties({
  currentSchema,
  projectName,
}: {
  currentSchema: Schema;
  projectName: string;
}) {
  const [isFieldEditMode, setIsFieldEditMode] = useState<boolean>(false);
  const [isClickTypeIcon, setIsClickTypeIcon] = useState<boolean>(false);
  const [currentEditPropertyName, setCurrentEditPropertyName] = useState<
    null | string
  >(null);

  const {
    setState,
    setCurrentEditProperty,
    addProperty,
    editProperty,
    deleteProperty,
  } = useSetSchemaState();
  const schema = useSchemaState();
  const currentEditProperty = useCurrentEditProperty();

  useEffect(() => {
    setState(currentSchema);
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
  const hasContentsWithCurrentSchema = true;

  const handleClickAdd = () => {
    addProperty(currentEditProperty);
    setIsFieldEditMode(false);
    setCurrentEditProperty({ type: "reset" });
    setIsClickTypeIcon(false);
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

  const handleChangePropertyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEditProperty({
      type: "update",
      updateData: { ...currentEditProperty, name: e.target.value },
    });
  };

  const handleClickEditIcon = ({ propertyName }: { propertyName: string }) => {
    setCurrentEditProperty({ type: "set", propertyName });
    setCurrentEditPropertyName(propertyName);
    setIsFieldEditMode(true);
  };

  const handleClickEdit = () => {
    editProperty({
      targetTitle: currentEditPropertyName!,
      updateField: currentEditProperty,
    });
    setCurrentEditPropertyName(null);
    setIsFieldEditMode(false);
    setCurrentEditProperty({ type: "reset" });
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
      {(isFieldEditMode || !!hasContentsWithCurrentSchema) && (
        <>
          <FieldInput
            type={currentEditProperty.type || "text"}
            isEditMode={isFieldEditMode}
            inputValue={currentEditProperty.name}
            changeInputHandler={handleChangePropertyName}
            clickTypeHandler={() => setIsClickTypeIcon(!isClickTypeIcon)}
            editHandler={handleClickEdit}
            addHandler={handleClickAdd}
          />
        </>
      )}
      <div className={css.wrapper}>
        {isFieldEditMode || isClickTypeIcon ? (
          <PropertyEditor />
        ) : (
          <section>
            <FieldTitle>Field List</FieldTitle>
            <div className={css.fieldList}>
              <SchemaProperties
                schema={schema}
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