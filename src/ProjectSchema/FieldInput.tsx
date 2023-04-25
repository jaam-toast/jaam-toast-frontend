import { TypeIcon } from "../@shared";
import * as css from "./FieldInput.css";

type Options = {
  type: string;
  isEditMode: boolean;
  inputValue: string;
  warningMessage?: string;
  changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickTypeHandler: () => void;
  editHandler: () => void;
  addHandler?: () => void;
};

export function FieldInput({
  type,
  isEditMode,
  inputValue,
  warningMessage,
  changeInputHandler,
  clickTypeHandler,
  editHandler,
  addHandler,
}: Options) {
  return (
    <section className={css.fieldNameSection}>
      <div className={css.fieldNameWrapper}>
        <input
          className={css.fieldNameInput}
          value={inputValue}
          onChange={changeInputHandler}
        />
        <div className={css.typeButton} onClick={clickTypeHandler}>
          <TypeIcon size="small" type={type} />
        </div>
        {isEditMode ? (
          <button onClick={editHandler} className={css.addButton}>
            Edit
          </button>
        ) : (
          <button
            onClick={warningMessage ? () => {} : addHandler}
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
