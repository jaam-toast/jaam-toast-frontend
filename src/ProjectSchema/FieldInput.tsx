import { TypeIcon } from "../@shared";
import * as css from "./FieldInput.css";

import type { JaamSchemaPropertyType } from "@jaam-schema/src";

type Options = {
  type: JaamSchemaPropertyType;
  isEditMode: boolean;
  inputValue: string;
  warningMessage?: string;
  onFieldChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeClicked: () => void;
  onEditClicked: () => void;
  onAddClicked?: () => void;
};

export function FieldInput({
  type,
  isEditMode,
  inputValue,
  warningMessage,
  onFieldChanged,
  onTypeClicked,
  onEditClicked,
  onAddClicked,
}: Options) {
  return (
    <section className={css.fieldNameSection}>
      <div className={css.fieldNameWrapper}>
        <input
          className={css.fieldNameInput}
          value={inputValue}
          onChange={onFieldChanged}
        />
        <div className={css.typeButton} onClick={onTypeClicked}>
          <TypeIcon size="small" type={type} />
        </div>
        {isEditMode ? (
          <button onClick={onEditClicked} className={css.addButton}>
            Edit
          </button>
        ) : (
          <button
            onClick={warningMessage ? () => {} : onAddClicked}
            className={css.addButton}
          >
            Add
          </button>
        )}
      </div>
      <p className={css.warningMessage}>{warningMessage || ""}</p>
    </section>
  );
}
