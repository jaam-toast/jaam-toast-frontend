import { TypeIcon } from "../@shared";
import * as css from "./FieldInput.css";

type Options = {
  type: string;
  isEditMode: boolean;
  inputValue: string;
  wargingMessage?: string;
  changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickTypeHandler: () => void;
  editHandler: () => void;
  addHandler?: () => void;
};

export function FieldInput({
  type,
  isEditMode,
  inputValue,
  wargingMessage,
  changeInputHandler,
  clickTypeHandler,
  editHandler,
  addHandler,
}: Options) {
  return (
    <section className={css.fieldNameSection}>
      <p className={css.warningMessage}>{wargingMessage || "ㅤ"}</p>
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
            onClick={wargingMessage ? () => {} : addHandler}
            className={css.addButton}
          >
            Add
          </button>
        )}
      </div>
    </section>
  );
}
