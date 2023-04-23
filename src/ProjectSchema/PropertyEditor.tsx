import { FieldTitle } from "./FieldTitle";
import { TypeIcon } from "../@shared";
import * as css from "./PropertyEditor.css";

import { SCHEMA_FIELD_TYPE, SchemaFieldType } from "../@types/schema";

type PropertyOptions = {
  min?: number;
  max?: number;
  required?: boolean;
};

type CurrentProperty = {
  name: string;
  type: SchemaFieldType;
  options: PropertyOptions;
};

type Options = {
  currentProperty: CurrentProperty;
  setCurrentProperty: React.Dispatch<React.SetStateAction<CurrentProperty>>;
};

export function PropertyEditor({
  currentProperty,
  setCurrentProperty,
}: Options) {
  const handleEditProperty = ({
    editType,
    updateValue,
  }: {
    editType: string;
    updateValue:
      | React.ChangeEvent<HTMLInputElement>
      | string
      | boolean
      | number;
  }) => {
    switch (editType) {
      case "name": {
        const event = updateValue as React.ChangeEvent<HTMLInputElement>;
        setCurrentProperty(prev => ({
          ...prev,
          name: event.target.value,
        }));

        return;
      }
      case "type": {
        setCurrentProperty(prev => ({
          ...prev,
          type: updateValue as string,
        }));

        return;
      }
      case "required": {
        setCurrentProperty(prev => ({
          ...prev,
          options: {
            ...prev.options,
            required: updateValue as boolean,
          },
        }));

        return;
      }
      case "min": {
        setCurrentProperty(prev => ({
          ...prev,
          options: {
            ...prev.options,
            min: updateValue as number,
          },
        }));

        return;
      }
      case "max": {
        setCurrentProperty(prev => ({
          ...prev,
          options: {
            ...prev.options,
            max: updateValue as number,
          },
        }));

        return;
      }
      default: {
        return;
      }
    }
  };

  return (
    <>
      <section>
        <FieldTitle>Select a type for your content field</FieldTitle>
        <div className={css.typeList}>
          {SCHEMA_FIELD_TYPE.map(type => (
            <div
              key={type}
              className={`${css.typeWrapper} ${
                currentProperty.type === type ? css.type : ""
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

        <FieldTitle>Select a option for your content field type</FieldTitle>
        <ul className={css.optionFieldList}>
          <li>
            <input
              id="required-field"
              type="checkbox"
              value="required"
              checked={currentProperty.options.required || false}
              onChange={() =>
                handleEditProperty({
                  editType: "required",
                  updateValue: currentProperty.options.required ? false : true,
                })
              }
            />
            <label htmlFor="required-field" className={css.optionFieldLabel}>
              Required field
            </label>
          </li>
          {(currentProperty.type === "text" ||
            currentProperty.type === "textarea" ||
            currentProperty.type === "string" ||
            currentProperty.type === "number") && (
            <>
              <li>
                <label className={css.optionFieldLabel}>minimum</label>
                <input
                  type="number"
                  value={currentProperty.options.min || undefined}
                  onChange={e =>
                    handleEditProperty({
                      editType: "min",
                      updateValue: e.target.value,
                    })
                  }
                />
              </li>
              <li>
                <label className={css.optionFieldLabel}>maximum</label>
                <input
                  type="number"
                  value={currentProperty.options.max || undefined}
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
