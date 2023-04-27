import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { useDebounce } from "./useDebounce";
import * as css from "./TextField.css";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  delay?: number;
  value?: string;
  onTextFieldChange?: (text: string) => void;
};

export function TextField({
  delay = 1000,
  value = "",
  type = "text",
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
      type={type}
      value={text}
      className={css.textField}
      onChange={handleMuiTextFieldChange}
      autoComplete="off"
      {...props}
    />
  );
}
