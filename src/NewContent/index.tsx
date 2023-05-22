import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jsonSchemaToJaamSchema, jsonSchemaValidator } from "@jaam-schema/src";
import { toast } from "react-toastify";

import { SelectBox } from "../@shared";
import { TitleField } from "../ProjectSchema/TitleField";
import { ContentPropertyEditor } from "../ProjectContents/ContentPropertyEditor";
import {
  useProjectQuery,
  useContentsState,
  useSetContentsState,
  useCreateContentMutation,
} from "../@hooks";
import * as css from "./index.css";

import { SCHEMA_DEFAULT_VALUE_FOR_TYPE } from "../@types/cms";
import { NotFoundError } from "../@utils/createError";

export function NewContent() {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const [currentSchemaIndex, setCurrentSchemaIndex] = useState<number>(0);
  const { content, contentsErrorMessage } = useContentsState();
  const { setContentProperty, reset } = useSetContentsState();
  const createContent = useCreateContentMutation();

  if (!projectName) {
    throw new NotFoundError("projectName not found");
  }

  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new NotFoundError("project data not found");
  }

  const { storageKey: token } = project;
  const schemaList = project.schemaList.filter(
    schema => schema.schemaName !== "assets",
  );

  const { schema } = useMemo(
    () => schemaList[currentSchemaIndex],
    [currentSchemaIndex],
  );
  const jaamSchemaPropertyList = useMemo(() => {
    return Object.entries(jsonSchemaToJaamSchema(schema).properties);
  }, [currentSchemaIndex, schema]);

  useEffect(() => {
    jaamSchemaPropertyList.forEach(([name, data]) => {
      setContentProperty({
        name,
        content: SCHEMA_DEFAULT_VALUE_FOR_TYPE[data.type],
      });
    });
  }, [currentSchemaIndex, schema]);

  const handlePrevClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async () => {
    const { result, message } = jsonSchemaValidator({
      schema,
      content,
    });

    if (!result) {
      return toast.error(message);
    }

    await createContent.mutateAsync({ token, schemaName: schema.title });

    navigate(-1);
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <button
          onClick={handlePrevClick}
          className={`${css.button} ${css.prevButton}`}
        >
          Prev
        </button>
        <button
          onClick={handleSaveClick}
          className={`${css.button} ${css.saveButton}`}
        >
          + Save
        </button>
      </header>
      <div className={css.wrapper}>
        <div className={css.titleContainer}>
          <div className={css.titleWrapper}>
            <h3>Create new Content</h3>
          </div>
        </div>
        <section className={css.schemaNameSection}>
          <div>
            <TitleField>Schema Type</TitleField>
            <SelectBox
              options={schemaList?.map(data => data.schemaName) || ["Preset"]}
              defaultSelect={schemaList ? schemaList[0].schemaName : "Preset"}
              onSelectionChange={(_, index) => {
                reset();
                setCurrentSchemaIndex(index);
              }}
            />
            <p className={css.fieldSubText}>
              Choose your schema type for content field.
            </p>
          </div>
          {jaamSchemaPropertyList.map(([property, data]) => (
            <div key={property}>
              <div className={css.fieldHeader}>
                <TitleField>{property}</TitleField>
                <div className={css.fieldTypeWrapper}>
                  <div className={css.fieldType}>{data.type}</div>
                  {schema.required && schema.required.includes(property) && (
                    <div className={css.fieldType}>required</div>
                  )}
                </div>
              </div>
              <div>{contentsErrorMessage[property]}</div>
              <ContentPropertyEditor type={data.type} property={property} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
