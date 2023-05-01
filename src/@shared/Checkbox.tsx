import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useCheckboxState, useSetCheckboxState } from "./useCheckboxStore";

type CheckBoxProps = {
  value: string;
  checkboxCount?: number;
  valuesList?: string[];
  valuesCount?: number;
};

export function Checkbox({ value, valuesList, valuesCount }: CheckBoxProps) {
  const location = useLocation();
  const { values: checkboxValues, isAllChecked } = useCheckboxState();
  const { toggleAllChecked, setCheckboxValue, setName } = useSetCheckboxState();

  useEffect(() => {
    setName(location.pathname);
  }, []);

  if (value === "checkbox-parent") {
    return (
      <input
        type="checkbox"
        value="checkbox-parent"
        checked={isAllChecked}
        onChange={() => {
          if (valuesList) {
            toggleAllChecked(valuesList);
          }
        }}
      />
    );
  }

  return (
    <input
      type="checkbox"
      value={value}
      checked={isAllChecked || checkboxValues.has(value)}
      onChange={e =>
        setCheckboxValue({
          value: e.target.value,
          checkboxCount: valuesCount || 0,
        })
      }
    />
  );
}
