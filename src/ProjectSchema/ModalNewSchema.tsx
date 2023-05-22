import { useState } from "react";
import { toast } from "react-toastify";

import { TextField, TypeIcon } from "../@shared";
import { TitleField } from "./TitleField";
import { PropertyEditor } from "./PropertyEditor";
import { PropertyList } from "./PropertyList";
import {
  useCurrentEditProperty,
  useSchemaState,
  useSetSchemaState,
  useProjectSchemaQuery,
  useSetConfirmModal,
} from "../@hooks";
import { useCreateSchemaMutation } from "../@hooks/useSchemaMutation";
import { NotFoundError } from "../@utils/createError";
import * as css from "./ModalNewSchema.css";

export function ModalNewSchema({ projectName }: { projectName: string }) {
  const [isFieldEditMode, setIsFieldEditMode] = useState<boolean>(false);
  const [isClickTypeIcon, setIsClickTypeIcon] = useState<boolean>(false);
  const [currentMenu, setCurrentMenu] = useState<string>("schema");
  const {
    setTitle,
    setDescription,
    setCurrentEditProperty,
    addProperty,
    editProperty,
    deleteProperty,
    setIsSchemaChanged,
  } = useSetSchemaState();
  const schema = useSchemaState();
  const currentEditProperty = useCurrentEditProperty();
  const { openConfirm } = useSetConfirmModal();

  const { data: schemaList } = useProjectSchemaQuery(projectName);

  if (!schemaList) {
    throw new NotFoundError("schemaList not found");
  }

  const createSchema = useCreateSchemaMutation();

  const handleChangePropertyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEditProperty({
      type: "update",
      updateData: {
        ...currentEditProperty,
        name: e.target.value,
      },
    });
  };

  const handleClickAdd = () => {
    if (!currentEditProperty.name) {
      return toast.error("The name field must not be empty.");
    }

    addProperty();
    setCurrentEditProperty({ type: "reset" });
    setIsFieldEditMode(false);
    setIsClickTypeIcon(false);
  };

  const handleClickEditIcon = ({ propertyName }: { propertyName: string }) => {
    setCurrentEditProperty({ type: "set", propertyName });
    setIsFieldEditMode(true);
  };

  const handleClickEdit = () => {
    if (!currentEditProperty.name) {
      return toast.error("The name field must not be empty.");
    }

    editProperty();
    setIsFieldEditMode(false);
    setCurrentEditProperty({ type: "reset" });
  };

  const handleClickSave = async () => {
    await createSchema.mutateAsync({ projectName });

    setIsSchemaChanged();
  };

  const handleClickDelete = ({ propertyName }: { propertyName: string }) => {
    openConfirm({
      message: "Do you want to delete the field?",
      onConfirm: () => {
        deleteProperty({ propertyName });
      },
    });
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
            <TitleField>Schema name</TitleField>
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
            <TitleField>Description (optional)</TitleField>
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
                    currentEditProperty.warningMessage
                      ? () => {}
                      : handleClickAdd
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

          <div className={css.wrapper}>
            {/**
             * field edit input
             */}
            {isFieldEditMode || isClickTypeIcon ? (
              <PropertyEditor />
            ) : (
              <section>
                <TitleField>Field List</TitleField>
                <div className={css.fieldList}>
                  <PropertyList
                    propertyList={schema.properties}
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
