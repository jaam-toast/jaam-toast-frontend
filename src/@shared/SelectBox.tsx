import { useEffect, useState, useRef } from "react";
import * as css from "./SelectBox.css";

type SelectBoxProps<T> = {
  label: string;
  options: T[];
  onSelectionChange: (option: T) => void;
  defaultSelect?: T;
};

export function SelectBox<T>({
  label,
  options,
  onSelectionChange,
  defaultSelect,
  ...props
}: SelectBoxProps<T>) {
  const [inputValue, setInputValue] = useState<T | null>(defaultSelect ?? null);
  const [isFold, setIsFold] = useState<boolean>(true);

  const handleChange = selection => {
    onSelectionChange(selection);
    setInputValue(selection);
  };

  const selectBoxRef = useRef(null);

  useEffect(() => {
    const outerClickListener = e => {
      if (
        isFold ||
        !selectBoxRef.current ||
        selectBoxRef.current?.contains(e.target)
      ) {
        return;
      }

      setIsFold(true);
    };

    window.addEventListener("click", outerClickListener);

    return () => {
      window.removeEventListener("click", outerClickListener);
    };
  }, [isFold]);

  return (
    <div
      className={css.container}
      onClick={() => setIsFold(!isFold)}
      ref={selectBoxRef}
    >
      <span className={css.currentOption}>{inputValue}</span>
      {!isFold && (
        <ul className={css.optionList}>
          {options?.map((option: T) => (
            <li
              className={css.option}
              key={option}
              value={option}
              onClick={() => handleChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      <span className={css.selectBoxIcon}>
        {isFold ? (
          <img src="/images/fold-icon.svg" alt="expand more icon" />
        ) : (
          <img src="/images/unfold-icon.svg" alt="expand less icon" />
        )}
      </span>
    </div>
  );
}
