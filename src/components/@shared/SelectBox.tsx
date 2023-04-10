import { useState } from "react";

type SelectBoxProps<T> = {
  label: string;
  options: T[];
  onSelectionChange: (option: T) => void;
  defaultSelect?: T;
};

function SelectBox<T>({
  label,
  options,
  onSelectionChange,
  defaultSelect,
  ...props
}: SelectBoxProps<T>) {
  const [inputValue, setInputValue] = useState<T | null>(defaultSelect ?? null);

  const handleChange = e => {
    const selection = e.target.value as T;
    onSelectionChange(selection);
    setInputValue(selection);
  };

  return (
    <div>
      <div>
        {options?.map((option: T) => (
          <div key={option} value={option}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectBox;
