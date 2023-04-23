import { useEffect, useState } from "react";

import { SchemaProperties } from "./SchemaProperties";
import { FieldTitle } from "./FieldTitle";
import { FieldInput } from "./FieldInput";
import { PropertyEditor } from "./PropertyEditor";
import { useUpdateSchemaMutation } from "./useSchemaMutation";
import { useSchemaState, useSetSchemaState } from "./useSchemaStore";
import * as css from "./ModalSchemaProperties.css";

import type { Schema, SchemaFieldType } from "../@types/schema";

type Options = {
  min?: number;
  max?: number;
  required?: boolean;
};
type SchemaField = {
  name: string;
  type: SchemaFieldType;
  options: Options;
};

const defaultFieldData: SchemaField = {
  name: "",
  type: "text",
  options: {},
};

export function ModalSchemaProperties({
  currentSchema,
  projectName,
}: {
  currentSchema: Schema;
  projectName: string;
}) {
  const [isFieldEditMode, setIsFieldEditMode] = useState<boolean>(false);
  const [isClickTypeIcon, setIsClickTypeIcon] = useState<boolean>(false);
  const [currentProperty, setCurrentProperty] =
    useState<SchemaField>(defaultFieldData);
  const [currentEditPropertyName, setCurrentEditPropertyName] = useState<
    null | string
  >(null);

  const { setState, addProperty, editProperty, deleteProperty, reset } =
    useSetSchemaState();
  const schema = useSchemaState();

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
    addProperty(currentProperty);
    setIsFieldEditMode(false);
    setCurrentProperty(defaultFieldData);
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
    setCurrentProperty(prev => ({
      ...prev,
      name: e.target.value,
    }));
  };

  /**
   * schema에 저장하고 나면 string은 minLength, number는 minimum의 형태로
   * 저장됩니다. 수정모드 일 때는 모두 min, max의 형태로 통일하고 서버로 보낼 때 minLength로 변경하는 후작업을 거치도록 해놓았습니다.
   */
  const handleClickEditIcon = ({ propertyName }: { propertyName: string }) => {
    const { minLength, minimum, maxLength, maximum } =
      schema.properties[propertyName];
    setCurrentProperty({
      name: propertyName,
      type: schema.properties[propertyName].type,
      options: {
        ...((minLength || minimum) && { min: minLength || minimum }),
        ...((maxLength || maximum) && { max: maxLength || maximum }),
        required: schema.required?.includes(propertyName),
      },
    });
    setCurrentEditPropertyName(propertyName);
    setIsFieldEditMode(true);
  };

  const handleClickEdit = () => {
    editProperty({
      targetTitle: currentEditPropertyName!,
      updateField: currentProperty,
    });
    setCurrentEditPropertyName(null);
    setIsFieldEditMode(false);
    setCurrentProperty(defaultFieldData);
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
        {(isFieldEditMode || !!hasContentsWithCurrentSchema) && (
          <>
            <FieldInput
              type={currentProperty.type || "text"}
              isEditMode={isFieldEditMode}
              inputValue={currentProperty.name}
              changeInputHandler={handleChangePropertyName}
              clickTypeHandler={() => setIsClickTypeIcon(!isClickTypeIcon)}
              editHandler={handleClickEdit}
              addHandler={handleClickAdd}
            />
          </>
        )}
      </header>
      <div className={css.wrapper}>
        {isFieldEditMode || isClickTypeIcon ? (
          <PropertyEditor
            currentProperty={currentProperty}
            setCurrentProperty={setCurrentProperty}
          />
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
              setCurrentProperty(defaultFieldData);
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
