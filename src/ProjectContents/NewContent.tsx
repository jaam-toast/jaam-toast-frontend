import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import isEmpty from "lodash/isEmpty";
import {
  jsonSchemaToJaamSchema,
  jsonSchemaValidator,
} from "@jaam-schema/src/index";

import { SelectBox, TextField, useModal } from "../@shared";
import { FieldTitle } from "../ProjectSchema/FieldTitle";
import { useContentsState, useSetContentsState } from "./useContentsStore";
import { useCreateContentMutation } from "./useContentsMutation";
import * as css from "./NewContent.css";

import type { SchemaData } from "../@types/api";
import type { JaamSchemaPropertyType } from "@jaam-schema/src/index";
import { useProjectQuery } from "../ProjectDashboard/useProjectQuery";

type ModalNewContentProps = {
  token: string;
  schemaList?: SchemaData[];
};

type EditorType = "textfield" | "textarea" | "dateInput";

const EDITOR_BY_TYPE: Record<JaamSchemaPropertyType, EditorType> = {
  text: "textfield",
  textarea: "textarea",
  email: "textfield",
  link: "textfield",
  number: "textfield",
  date: "dateInput",
  boolean: "textfield",
};

export function NewContent() {
  const params = useParams();
  const { projectName } = params;

  const [currentSchemaIndex, setCurrentSchemaIndex] = useState<number>(0);
  const { content, contentsErrorMessage } = useContentsState();
  const { setContents, reset } = useSetContentsState();
  const { closeModal } = useModal();

  if (!projectName) {
    return <Navigate to="/error" />;
  }

  const { data: project, refetch } = useProjectQuery(projectName);

  if (!project) {
    return <Navigate to="/error" />;
  }

  const { schemaList, storageKey: token } = project;

  const { schema } = useMemo(
    () => schemaList[currentSchemaIndex],
    [currentSchemaIndex],
  );
  const jaamSchemaPropertyList = useMemo(
    () => Object.entries(jsonSchemaToJaamSchema(schema).properties),
    [currentSchemaIndex],
  );

  useEffect(() => {
    jaamSchemaPropertyList.forEach(([name, data]) => {
      if (data.type === "date") {
        setContents({ name, content: dayjs().format("YYYY-MM-DD"), schema });
      }
    });
  }, [currentSchemaIndex]);

  const createContent = useCreateContentMutation({
    onSuccess: () => {
      alert("Success content creation");
      closeModal();
    },
    onError: () => {
      alert("Failed to create schema. Please try again.");
    },
  });

  const handleClickSave = () => {
    const { result, message } = jsonSchemaValidator({
      schema,
      content,
    });

    if (!result) {
      return alert(message);
    }

    createContent.mutate({ token, schemaName: schema.title });
    reset();
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <button className={css.button}>+ Prev</button>
        <button className={css.button}>+ Save</button>
      </header>
      <div className={css.wrapper}>
        <div className={css.titleContainer}>
          <div className={css.titleWrapper}>
            <h3>Create new Content</h3>
          </div>
        </div>
        <section className={css.schemaNameSection}>
          <div>
            <FieldTitle>Schema Type</FieldTitle>
            <SelectBox
              options={schemaList?.map(data => data.schemaName) || ["Preset"]}
              defaultSelect={schemaList ? schemaList[0].schemaName : "Preset"}
              onSelectionChange={(_, index) => setCurrentSchemaIndex(index)}
            />
            <p className={css.fieldSubText}>
              Choose your schema type for content field.
            </p>
          </div>
          {jaamSchemaPropertyList.map(([property, data]) => (
            <div>
              <div className={css.fieldHeader}>
                <FieldTitle>{property}</FieldTitle>
                <div className={css.fieldTypeWrapper}>
                  <div className={css.fieldType}>{data.type}</div>
                  {schema.required && schema.required.includes(property) && (
                    <div className={css.fieldType}>required</div>
                  )}
                </div>
              </div>
              <div>{contentsErrorMessage[property]}</div>
              {EDITOR_BY_TYPE[data.type] === "textfield" && (
                <TextField
                  onTextFieldChange={text => {
                    data.type === "number"
                      ? setContents<number>({
                          name: property,
                          content: parseInt(text),
                          schema,
                        })
                      : setContents<string>({
                          name: property,
                          content: text,
                          schema,
                        });
                  }}
                  placeholder={property}
                />
              )}
              {EDITOR_BY_TYPE[data.type] === "dateInput" && (
                <TextField
                  type="date"
                  value={content[property] as string}
                  onTextFieldChange={text => {
                    data.type === "number"
                      ? setContents<number>({
                          name: property,
                          content: parseInt(text),
                          schema,
                        })
                      : setContents<string>({
                          name: property,
                          content: text,
                          schema,
                        });
                  }}
                  placeholder={property}
                />
              )}
              {EDITOR_BY_TYPE[data.type] === "textarea" && (
                <textarea
                  className={css.textarea}
                  onChange={e =>
                    setContents<string>({
                      name: property,
                      content: e.target.value,
                      schema,
                    })
                  }
                />
              )}
            </div>
          ))}
        </section>
        <footer className={css.footer}>
          <button onClick={handleClickSave} className={css.saveButton}>
            Save
          </button>
        </footer>
      </div>
    </div>
  );
}
