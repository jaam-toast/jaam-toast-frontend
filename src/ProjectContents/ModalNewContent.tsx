import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import dayjs from "dayjs";
import jsonSchemaToJaamSchema from "../@packages/json-schema-to-jaam-schema";
import jsonSchemaValidator from "../@packages/json-schema-validator";

import { SelectBox, TextField, useModal } from "../@shared";
import { FieldTitle } from "../ProjectSchema/FieldTitle";
import { useContentsState, useSetContentsState } from "./useContentsStore";
import { useCreateContentMutation } from "./useContentsMutation";
import * as css from "../ProjectSchema/ModalNewSchema.css";

import type { SchemaList } from "../@types/api";
import type { SchemaPropertyType } from "../@packages/json-schema-to-jaam-schema/types";

type ModalNewContentProps = {
  token: string;
  schemaList?: SchemaList[];
};

type EditorType = "textfield" | "textarea" | "dateInput";

const editorForType: Record<SchemaPropertyType, EditorType> = {
  text: "textfield",
  textarea: "textarea",
  email: "textfield",
  link: "textfield",
  number: "textfield",
  date: "dateInput",
  boolean: "textfield",
};

export function ModalNewContent({ token, schemaList }: ModalNewContentProps) {
  const [currentSchemaIndex, setCurrentSchemaIndex] = useState<number>(0);
  const { content, contentsError } = useContentsState();
  const { setContents } = useSetContentsState();
  const { closeModal } = useModal();

  if (!schemaList) {
    return <Navigate to="/error" />;
  }

  const { schema } = useMemo(
    () => schemaList[currentSchemaIndex],
    [currentSchemaIndex],
  );
  const schemaProperty = useMemo(
    () => Object.entries(jsonSchemaToJaamSchema(schema).properties),
    [currentSchemaIndex],
  );

  useEffect(() => {
    schemaProperty.forEach(([name, data]) => {
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
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <div className={css.headerFirstLine}>
          <h3>Create new Content</h3>
        </div>
      </header>
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
        {schemaProperty.map(([property, data]) => (
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
            <div>{contentsError[property]}</div>
            {editorForType[data.type] === "textfield" && (
              <TextField
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
            {editorForType[data.type] === "dateInput" && (
              <TextField
                type="date"
                value={dayjs().format("YYYY-MM-DD")}
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
            {editorForType[data.type] === "textarea" && (
              <textarea
                className={css.textarea}
                value={content[property] as string}
                onChange={e =>
                  setContents<typeof data.type>({
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
  );
}
