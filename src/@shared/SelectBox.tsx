import { useEffect, useState, useRef } from "react";
import * as css from "./SelectBox.css";

type SelectBoxProps<Option extends string> = {
  options: Option[];
  onSelectionChange: (option: Option, index: number) => void;
  defaultSelect?: Option;
  label?: string;
};

export function SelectBox<Option extends string>({
  options,
  onSelectionChange,
  defaultSelect,
  label,
}: SelectBoxProps<Option>) {
  const [inputValue, setInputValue] = useState<Option | null>(
    defaultSelect ?? null,
  );
  const [isFold, setIsFold] = useState<boolean>(true);

  const handleChange = (selection: Option, index: number) => {
    onSelectionChange(selection, index);
    setInputValue(selection);
  };

  const selectBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outerClickListener = (event: MouseEvent) => {
      if (
        isFold ||
        !selectBoxRef.current ||
        selectBoxRef.current?.contains(event.target as Element)
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
      {label && <span className={css.label}>{label}</span>}
      <span className={css.currentOption}>{inputValue}</span>
      <span className={css.selectBoxIcon}>
        {isFold ? (
          <img src="/images/fold-icon.svg" alt="expand more icon" />
        ) : (
          <img src="/images/unfold-icon.svg" alt="expand less icon" />
        )}
      </span>
      {!isFold && (
        <>
          <div className={css.selectBoxDivider}></div>
          <ul className={css.optionList}>
            {options?.map((option: Option, index: number) => (
              <li
                className={`${inputValue === option ? css.highlight : ""} ${
                  css.option
                }`}
                key={option}
                value={option}
                onClick={() => handleChange(option, index)}
              >
                {option}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
