import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import * as css from "./TextField.css";
import { useDebounce } from "./useDebounce";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  delay?: number;
  value?: string;
  onTextFieldChange?: (text: string) => void;
};

export function TextField({
  delay = 1000,
  value = "",
  onTextFieldChange = () => {},
  ...props
}: TextFieldProps) {
  const [text, setText] = useState<string>(value);

  const onTextFieldDebounceChange = useDebounce((text: string) => {
    onTextFieldChange(text);
  }, delay);

  const handleMuiTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setText(text);
    onTextFieldDebounceChange(text);
  };

  return (
    <input
      value={text}
      className={css.textField}
      onChange={handleMuiTextFieldChange}
      autoComplete="off"
      {...props}
    />
  );
}
