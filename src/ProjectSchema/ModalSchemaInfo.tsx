import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import { TypeIcon } from "../@shared";
import { PropertyList } from "./PropertyList";
import { TitleField } from "./TitleField";
import { PropertyEditor } from "./PropertyEditor";
import { useUpdateSchemaMutation } from "../@hooks/useSchemaMutation";
import {
  useModal,
  useCurrentEditProperty,
  useSchemaState,
  useSetSchemaState,
  useContentsListQuery,
} from "../@hooks";
import { COLORS } from "../@config/colors";
import * as css from "./ModalSchemaInfo.css";

import type { JsonSchema } from "@jaam-schema/src";

type ModalSchemaInfoProps = {
  currentSchema: JsonSchema;
  projectName: string;
  token: string;
};

export function ModalSchemaInfo({
  currentSchema,
  projectName,
  token,
}: ModalSchemaInfoProps) {
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

  const { data } = useContentsListQuery({
    schemaName: currentSchema.title,
    token,
    pageLength: 1,
  });
  const hasContents = !!data?.totalCounts;

  useEffect(() => {
    setSchema(currentSchema);
    setHandlerTriggeredModalClose(reset);
  }, []);

  const updateSchema = useUpdateSchemaMutation();

  const handleChangePropertyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEditProperty({
      type: "update",
      updateData: { ...currentEditProperty, name: e.target.value },
    });
  };

  const handleClickAdd = () => {
    if (!currentEditProperty.name) {
      toast.error("The name field must not be empty.");
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
      toast.error("The name field must not be empty.");
    }

    editProperty();
    setIsFieldEditMode(false);
    setCurrentEditProperty({ type: "reset" });
  };

  const handleClickUpdate = () => {
    updateSchema.mutate({ projectName, schemaName: schema.title });
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
      {!hasContents && (
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
      {/**
       * schema edit mode
       */}
      {isFieldEditMode || isClickTypeIcon ? (
        <>
          {hasContents && (
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
                <button onClick={handleClickEdit} className={css.addButton}>
                  Edit
                </button>
              </div>
              <p className={css.warningMessage}>
                {currentEditProperty.warningMessage}
              </p>
            </section>
          )}
          <div className={css.wrapper}>
            <PropertyEditor />
          </div>
          <footer className={css.footer}>
            <button onClick={handleClickUpdate} className={css.saveButton}>
              Update
            </button>
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
          </footer>
        </>
      ) : (
        <>
          {/**
           * schema view mode
           */}
          <div className={css.wrapper}>
            <section>
              <TitleField>Field List</TitleField>
              <div className={css.fieldList}>
                <PropertyList
                  isEditable={!hasContents}
                  propertyList={schema.properties}
                  editHandler={handleClickEditIcon}
                  deleteHandler={({ propertyName }: { propertyName: string }) =>
                    deleteProperty({ propertyName })
                  }
                />
              </div>
            </section>
          </div>
          <footer className={css.footer}>
            <button onClick={handleClickUpdate} className={css.saveButton}>
              Update
            </button>
          </footer>
        </>
      )}
    </section>
  );
}

export function ModalSchemaInfoSkeleton() {
  return (
    <section className={css.containerSkeleton}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color={COLORS.GREY}
        ariaLabel="three-dots-loading"
      />
    </section>
  );
}
