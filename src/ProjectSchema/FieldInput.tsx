import { TypeIcon } from "../@shared";
import * as css from "./FieldInput.css";

type Options = {
  type: string;
  isEditMode: boolean;
  inputValue: string;
  changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickTypeHandler: () => void;
  editHandler: () => void;
  addHandler?: () => void;
};

export function FieldInput({
  type,
  isEditMode,
  inputValue,
  changeInputHandler,
  clickTypeHandler,
  editHandler,
  addHandler,
}: Options) {
  return (
    <section className={css.fieldNameSection}>
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
        <button onClick={addHandler} className={css.addButton}>
          Add
        </button>
      )}
    </section>
  );
}
