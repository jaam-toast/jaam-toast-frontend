import { useState } from "react";

import { TextField } from "../@shared";
import { useContentsState, useSetContentsState } from "../@hooks";
import * as css from "./ContentPropertyEditor.css";

import type {
  JaamSchemaPropertyType,
  JaamSchemaContentProperty,
} from "@jaam-schema/src";

type ContentPropertyEditorProps = {
  type: JaamSchemaPropertyType;
  property: string;
  value?: JaamSchemaContentProperty;
};

export function ContentPropertyEditor<T extends JaamSchemaPropertyType>({
  type,
  property,
  value,
}: ContentPropertyEditorProps) {
  const { content } = useContentsState();
  const { setContentProperty } = useSetContentsState();
  const [toggle, setToggle] = useState<boolean>(false);

  switch (type) {
    case "text":
    case "email":
    case "link": {
      return (
        <TextField
          value={value as string}
          onTextFieldChange={text => {
            setContentProperty<string>({
              name: property,
              content: text,
            });
          }}
          placeholder={property}
        />
      );
    }
    case "number": {
      return (
        <input
          type="number"
          className={css.dataInput}
          value={content[property] as number}
          onChange={e => {
            setContentProperty<number>({
              name: property,
              content: parseInt(e.target.value),
            });
          }}
          placeholder={property}
        />
      );
    }
    case "date": {
      return (
        <input
          type="date"
          className={css.dataInput}
          value={content[property] as string}
          onChange={e => {
            setContentProperty<string>({
              name: property,
              content: e.target.value,
            });
          }}
          placeholder={property}
        />
      );
    }
    case "textarea": {
      return (
        <textarea
          value={value as string}
          className={css.textarea}
          onChange={e =>
            setContentProperty<string>({
              name: property,
              content: e.target.value,
            })
          }
        />
      );
    }
    case "boolean": {
      return (
        <div className={css.toggleButtonBox}>
          <input
            id="toggle"
            role="switch"
            type="checkbox"
            hidden
            checked={(value as boolean) || toggle}
            onChange={() => {
              setToggle(!toggle);
              setContentProperty<boolean>({
                name: property,
                content: value ? !value : !toggle,
              });
            }}
          />
          <label htmlFor="toggle" className={css.toggleSwitch}>
            <div>
              <div
                className={`${
                  toggle ? css.toggleButtonRight : css.toggleButtonLeft
                }`}
              />
            </div>
          </label>
          <span>{String(toggle)}</span>
        </div>
      );
    }
    default: {
      return null;
    }
  }
}
