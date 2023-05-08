import { BsFillTrashFill } from "react-icons/bs";

import { useCheckboxState } from "../@hooks";
import * as css from "./CheckDeleteBox.css";

export function CheckDeleteBox({
  onDelete,
}: {
  onDelete: (checkboxValues: string[]) => void;
}) {
  const { values: checkboxValues } = useCheckboxState();

  return (
    <div className={css.selectOptionField}>
      <div>{`${checkboxValues.size} selected`}</div>
      <BsFillTrashFill
        onClick={() => {
          onDelete([...checkboxValues]);
        }}
        className={css.optionIcon}
      />
    </div>
  );
}
