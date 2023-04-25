import { useState } from "react";

import { TextField, useModal } from "../@shared";
import { FieldTitle } from "./FieldTitle";
import { FieldInput } from "./FieldInput";
import { PropertyEditor } from "./PropertyEditor";
import { SchemaProperties } from "./SchemaProperties";
import {
  useCurrentEditProperty,
  useSchemaState,
  useSetSchemaState,
} from "./useSchemaStore";
import { useCreateSchemaMutation } from "./useSchemaMutation";
import * as css from "./ModalNewSchema.css";

import type { SchemaList } from "../@types/api";

type Options = {
  projectName: string;
  schemaList?: SchemaList[];
};

export function ModalNewSchema({ projectName, schemaList }: Options) {
  const [isFieldEditMode, setIsFieldEditMode] = useState<boolean>(false);
  const [isClickTypeIcon, setIsClickTypeIcon] = useState<boolean>(false);
  const [currentMenu, setCurrentMenu] = useState<string>("schema");
  const [currentEditPropertyName, setCurrentEditPropertyName] = useState<
    null | string
  >(null);

  const {
    setTitle,
    setDescription,
    setCurrentEditProperty,
    addProperty,
    editProperty,
    deleteProperty,
    reset,
  } = useSetSchemaState();
  const schema = useSchemaState();
  const currentEditProperty = useCurrentEditProperty();
  const { offModal } = useModal();

  const createSchema = useCreateSchemaMutation({
    onSuccess: () => {
      reset();
      alert("Success schema creation");
      offModal();
    },
    onError: () => {
      alert("Failed to create schema. Please try again.");
    },
  });

  const handleChangePropertyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEditProperty({
      type: "update",
      updateData: {
        ...currentEditProperty,
        name: e.target.value,
      },
    });
  };

  /**
   * Add field to schema handler
   */
  const handleClickAdd = () => {
    addProperty(currentEditProperty);
    setIsFieldEditMode(false);
    setCurrentEditProperty({ type: "reset" });
    setIsClickTypeIcon(false);
  };

  /**
   * change edit mode
   * edit 아이콘을 누르면 현재 선택한 프로퍼티 정보를 state(useState)에 저장합니다.
   */
  const handleClickEditIcon = ({ propertyName }: { propertyName: string }) => {
    setCurrentEditProperty({ type: "set", propertyName });
    setCurrentEditPropertyName(propertyName);
    setIsFieldEditMode(true);
  };

  /**
   * save edit field
   * edit 버튼을 눌렀을 때 저장한 프로퍼티 정보에서 업데이트 된 정보를 zustand store에 업데이트합니다.
   */
  const handleClickEdit = () => {
    editProperty({
      targetTitle: currentEditPropertyName!,
      updateField: currentEditProperty,
    });
    setCurrentEditPropertyName(null);
    setIsFieldEditMode(false);
    setCurrentEditProperty({ type: "reset" });
  };

  const handleClickSave = () => {
    const { title, type, properties } = schema;

    if (!title || !type || !Object.keys(properties).length) {
      return;
    }

    createSchema.mutate({ projectName });
  };

  const handleClickDelete = ({ propertyName }: { propertyName: string }) => {
    if (window.confirm("Do you want to delete the field?")) {
      deleteProperty({ propertyName });
    }
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <div className={css.headerFirstLine}>
          <h3>
            Create new schema
            <span className={css.schemaName}> {schema.title}</span>
          </h3>
        </div>
        <span className={css.fieldSubText}>
          Schema is a model for formatting your content.
        </span>
        <nav className={css.nav}>
          <div
            className={`${currentMenu === "schema" ? css.highlightMenu : ""} ${
              css.menu
            }`}
            onClick={() => setCurrentMenu("schema")}
          >
            Schema
          </div>
          <div
            className={`${currentMenu === "fields" ? css.highlightMenu : ""} ${
              css.menu
            }`}
            onClick={() => setCurrentMenu("fields")}
          >
            Fields
          </div>
        </nav>
      </header>
      {currentMenu === "schema" && (
        <section className={css.schemaNameSection}>
          {/**
           * schema name input
           */}
          <div
            className={
              schemaList?.some(data => data.schema.title === schema.title)
                ? css.unavailableOption
                : ""
            }
          >
            <FieldTitle>Schema name</FieldTitle>
            {schemaList?.some(data => data.schema.title === schema.title) && (
              <p className={css.warningMessage}>
                Your Schema Name is duplicated.
              </p>
            )}
            <TextField
              value={schema.title}
              onTextFieldChange={setTitle}
              delay={0}
            />
            <p className={css.fieldSubText}>
              Write down the name you want to use for the schema name.
            </p>
          </div>
          <div>
            {/**
             * schema description input
             */}
            <FieldTitle>Description (optional)</FieldTitle>
            <TextField onTextFieldChange={setDescription} delay={0} />
            <p className={css.fieldSubText}>Description of the schema</p>
          </div>
        </section>
      )}
      {currentMenu === "fields" && (
        <>
          {/**
           * field name input
           */}
          <FieldInput
            type={currentEditProperty.type}
            isEditMode={isFieldEditMode}
            inputValue={currentEditProperty.name}
            warningMessage={
              currentEditPropertyName !== currentEditProperty.name &&
              Object.keys(schema.properties).includes(currentEditProperty.name)
                ? "Your Property name is duplicated."
                : ""
            }
            changeInputHandler={handleChangePropertyName}
            clickTypeHandler={() => setIsClickTypeIcon(!isClickTypeIcon)}
            editHandler={handleClickEdit}
            addHandler={handleClickAdd}
          />
          <div className={css.wrapper}>
            {/**
             * field edit input
             */}
            {isFieldEditMode || isClickTypeIcon ? (
              <PropertyEditor />
            ) : (
              <section>
                <FieldTitle>Field List</FieldTitle>
                <div className={css.fieldList}>
                  <SchemaProperties
                    schema={schema}
                    editHandler={handleClickEditIcon}
                    deleteHandler={handleClickDelete}
                  />
                </div>
              </section>
            )}
          </div>
        </>
      )}
      <footer className={css.footer}>
        <button
          onClick={handleClickSave}
          className={`${css.saveButton} ${
            schema.title &&
            !!Object.keys(schema.properties).length &&
            schema.type
              ? ""
              : css.disable
          }`}
        >
          Save
        </button>
      </footer>
    </div>
  );
}
