import { TitleField } from "./TitleField";
import { TypeIcon } from "../@shared";
import { useCurrentEditProperty, useSetSchemaState } from "../@hooks";
import * as css from "./PropertyEditor.css";

import { JAAM_SCHEMA_PROPERTY_TYPES } from "@jaam-schema/src";
import type { JaamSchemaPropertyType } from "@jaam-schema/src";

const SizeEditableType: Record<
  string,
  "text" | "textarea" | "string" | "number"
> = {
  text: "text",
  textarea: "textarea",
  string: "string",
  number: "number",
};

type EditableTypes =
  | { name: "type"; editType: JaamSchemaPropertyType }
  | { name: "required"; editType: boolean }
  | { name: "min"; editType: string }
  | { name: "max"; editType: string };

export function PropertyEditor() {
  const { setCurrentEditProperty } = useSetSchemaState();
  const currentEditProperty = useCurrentEditProperty();

  const handleEditProperty = <T extends EditableTypes["name"]>({
    editType,
    updateValue,
  }: {
    editType: T;
    updateValue: Extract<EditableTypes, { name: T }>["editType"];
  }): void => {
    setCurrentEditProperty({
      type: "update",
      updateData: {
        ...currentEditProperty,
        ...(editType === "type" && { type: updateValue as string }),
        options: {
          ...currentEditProperty.options,
          [editType]: updateValue,
        },
      },
    });
  };

  return (
    <>
      <section>
        <TitleField>Select a type for your content field</TitleField>
        <div className={css.typeList}>
          {JAAM_SCHEMA_PROPERTY_TYPES.map(type => (
            <div
              key={type}
              className={`${css.typeWrapper} ${
                currentEditProperty.options.type === type ? css.type : ""
              }`}
              onClick={() => {
                handleEditProperty({ editType: "type", updateValue: type });
              }}
            >
              <TypeIcon type={type} />
              <span>{type}</span>
            </div>
          ))}
        </div>

        <TitleField>Select a option for your content field type</TitleField>
        <ul className={css.optionFieldList}>
          <li className={css.optionCheckField}>
            <input
              id="required-field"
              type="checkbox"
              value="required"
              checked={currentEditProperty.options.required || false}
              onChange={() =>
                handleEditProperty({
                  editType: "required",
                  updateValue: currentEditProperty.options.required
                    ? false
                    : true,
                })
              }
            />
            <label htmlFor="required-field">Required field</label>
          </li>
          {SizeEditableType[currentEditProperty.options.type] && (
            <>
              <li className={css.optionInputField}>
                <label>minimum</label>
                <input
                  className={css.optionInput}
                  type="number"
                  value={currentEditProperty.options.min || undefined}
                  onChange={e =>
                    handleEditProperty({
                      editType: "min",
                      updateValue: e.target.value,
                    })
                  }
                />
              </li>
              <li className={css.optionInputField}>
                <label>maximum</label>
                <input
                  className={css.optionInput}
                  type="number"
                  value={currentEditProperty.options.max || undefined}
                  onChange={e => {
                    handleEditProperty({
                      editType: "max",
                      updateValue: e.target.value,
                    });
                  }}
                />
              </li>
            </>
          )}
        </ul>
      </section>
    </>
  );
}
